'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, LogOut, Menu, X, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useClerk } from '@clerk/nextjs';
import { useSidebar } from '../providers/SidebarProvider';
import { navLinks, images } from '../types/assets';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled])';
const focusRing = 'focus-visible:outline focus-visible:outline-brand-700';
const itemStyle = `flex w-full items-center gap-3 rounded px-4 py-2 font-semibold transition ${focusRing}`;

/* ---------- Mobile drawer behaviour ---------- */

function useMobileDrawer(
  pathname: string,
  menuBtn: RefObject<HTMLButtonElement | null>,
  closeBtn: RefObject<HTMLButtonElement | null>,
  aside: RefObject<HTMLElement | null>
) {
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // While open: Escape closes, Tab is trapped, focus returns on close
  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false);
      if (e.key !== 'Tab' || !aside.current) return;

      const items = aside.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      menuBtn.current?.focus();
    };
  }, [open, menuBtn, closeBtn, aside]);

  return { open, setOpen };
}

/* ---------- Small pieces ---------- */

function Logo({ collapsed }: { collapsed: boolean }) {
  const hover = 'object-contain mix-blend-multiply transition-opacity hover:opacity-80';
  return (
    <Link href="/dashboard" aria-label="Go to dashboard">
      <Image
        src={images.logo2}
        alt="TechTree Logo"
        width={192}
        height={192}
        priority
        className={`h-48 w-48 ${hover} ${collapsed ? 'md:hidden' : ''}`}
      />
      {collapsed && (
        <Image
          src={images.smallLogo}
          alt="TechTree Logo"
          width={48}
          height={48}
          priority
          className={`hidden h-12 w-12 md:block ${hover}`}
        />
      )}
    </Link>
  );
}

// Navigation item component for the sidebar
type NavItemProps = {
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  className: string;
};

function NavItemContent({ icon: Icon, label, collapsed }: Omit<NavItemProps, 'className'>) {
  return (
    <>
      <Icon size={24} aria-hidden="true" className="shrink-0" />
      <span className={collapsed ? 'md:sr-only' : ''}>{label}</span>
    </>
  );
}

/* ---------- Sidebar ---------- */

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebar();

  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const aside = useRef<HTMLElement>(null);
  const { open, setOpen } = useMobileDrawer(pathname, menuBtn, closeBtn, aside);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const centered = collapsed ? 'md:justify-center md:px-0' : '';

  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully', { description: 'See you next time!' });
    router.push('/auth/signin');
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-center border-b border-brand-300 bg-brand-200 md:hidden">
        <button
          ref={menuBtn}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="app-sidebar"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg p-2 text-brand-600 transition hover:bg-brand-300 focus-visible:outline focus-visible:outline-brand-500"
        >
          <Menu size={28} />
        </button>
        <Link href="/dashboard" aria-label="Go to dashboard">
          <Image
            src={images.smallLogo}
            alt="TechTree Logo"
            width={64}
            height={64}
            priority
            className="h-16 w-16 object-contain mix-blend-multiply"
          />
        </Link>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity motion-reduce:transition-none md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Desktop wrapper (lets the collapse toggle overhang the edge) */}
      <div className="md:relative md:h-dvh md:shrink-0">
        <aside
          id="app-sidebar"
          ref={aside}
          className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col overflow-y-auto bg-brand-200 p-6 text-brand-600 transition-[transform,visibility,width,padding] duration-300 motion-reduce:transition-none md:static md:translate-x-0 md:visible ${
            collapsed ? 'md:w-20 md:p-3' : 'md:w-72'
          } ${open ? 'translate-x-0' : '-translate-x-full max-md:invisible'}`}
        >
          <button
            ref={closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-3 top-3 rounded p-2 hover:bg-brand-300 focus-visible:outline focus-visible:outline-brand-500 md:hidden"
          >
            <X size={24} />
          </button>

          <div className="mb-10 flex items-center justify-center">
            <Logo collapsed={collapsed} />
          </div>

          {/* Navigation links */}
          <nav aria-label="Main navigation" className="space-y-3">
            {navLinks.map(({ href, label, icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={`${itemStyle} text-xl ${centered} ${
                    active
                      ? 'bg-brand-500 text-white'
                      : 'text-brand-950 hover:bg-brand-300 hover:text-brand-800'
                  }`}
                >
                  <NavItemContent icon={icon} label={label} collapsed={collapsed} />
                </Link>
              );
            })}
          </nav>

          {/* Logout button section */}
          <div className="mt-auto space-y-2 border-t border-brand-300 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              title={collapsed ? 'Logout' : undefined}
              className={`${itemStyle} text-left text-lg text-brand-950 hover:bg-brand-300 hover:text-brand-800 ${centered}`}
            >
              <NavItemContent icon={LogOut} label="Logout" collapsed={collapsed} />
            </button>
          </div>
        </aside>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          aria-controls="app-sidebar"
          className="absolute right-0 top-10 z-50 hidden h-7 w-7 translate-x-1/2 items-center justify-center rounded-full bg-brand-500 text-white shadow-md transition hover:bg-brand-600 focus-visible:outline focus-visible:outline-brand-700 md:flex"
        >
          <ChevronRight
            size={16}
            aria-hidden="true"
            className={`transition-transform motion-reduce:transition-none ${collapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>
    </>
  );
}