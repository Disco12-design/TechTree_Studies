'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, LogOut, Menu, Moon, Search, X } from 'lucide-react';
import { logout } from '@/lib/authStorage';
import { useSidebar } from '../providers/SidebarProvider';
import { navLinks, images } from '../types/assets';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // mobile drawer
  const { collapsed, setCollapsed } = useSidebar(); // desktop icon-only mode
  const [lightMode, setLightMode] = useState(false); // switch state (not wired to a theme yet)
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape to close, focus trap, return focus on close
  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !asideRef.current) return;

      const focusable = asideRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  // Close drawer if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  // Expand the sidebar, then focus the search box once it has rendered
  const expandAndSearch = () => {
    setCollapsed(false);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  // `collapsed` only affects md+, so the mobile drawer is always full width
  const labelCls = collapsed ? 'md:sr-only' : '';
  const centerCls = collapsed ? 'md:justify-center md:px-0' : '';

  return (
    <>
      {/* Mobile top bar (reserves its own space, never covers content) */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-center border-b border-brand-300 bg-brand-200 md:hidden">
        {/* Hamburger pinned to the left */}
        <button
          ref={menuButtonRef}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="app-sidebar"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg p-2 text-brand-600 transition hover:bg-brand-300 focus-visible:outline focus-visible:outline-brand-500"
        >
          <Menu size={28} />
        </button>

        {/* Centered logo */}
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

      {/* Desktop wrapper: lets the collapse toggle sit on the sidebar's edge without being clipped */}
      <div className="md:relative md:h-dvh md:shrink-0">
        {/* Sidebar / drawer */}
        <aside
          id="app-sidebar"
          ref={asideRef}
          className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col overflow-y-auto bg-brand-200 p-6 text-brand-600 transition-[transform,visibility,width,padding] duration-300 motion-reduce:transition-none md:static md:translate-x-0 md:visible ${
            collapsed ? 'md:w-20 md:p-3' : 'md:w-72'
          } ${open ? 'translate-x-0' : '-translate-x-full max-md:invisible'}`}
        >
          {/* Mobile close button */}
          <button
            ref={closeButtonRef}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-3 top-3 rounded p-2 hover:bg-brand-300 focus-visible:outline focus-visible:outline-brand-500 md:hidden"
          >
            <X size={24} />
          </button>

          {/* Desktop logo (small version when collapsed) */}
          <div className="mb-10 flex items-center justify-center">
            <Link href="/dashboard" aria-label="Go to dashboard">
              <Image
                src={images.logo2}
                alt="TechTree Logo"
                width={192}
                height={192}
                priority
                className={`h-48 w-48 object-contain mix-blend-multiply transition-opacity hover:opacity-80 ${
                  collapsed ? 'md:hidden' : ''
                }`}
              />
              {collapsed && (
                <Image
                  src={images.smallLogo}
                  alt="TechTree Logo"
                  width={48}
                  height={48}
                  priority
                  className="hidden h-12 w-12 object-contain mix-blend-multiply transition-opacity hover:opacity-80 md:block"
                />
              )}
            </Link>
          </div>

          

          {/* Navigation */}
          <nav aria-label="Main navigation" className="space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={collapsed ? link.label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded px-4 py-2 text-xl font-semibold transition focus-visible:outline focus-visible:outline-brand-700 ${centerCls} ${
                    active
                      ? 'bg-brand-500 text-white'
                      : 'text-brand-950 hover:bg-brand-300 hover:text-brand-800'
                  }`}
                >
                  <Icon size={24} aria-hidden="true" className="shrink-0" />
                  <span className={labelCls}>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider + footer actions */}
          <div className="mt-auto space-y-2 border-t border-brand-300 pt-4">
            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              title={collapsed ? 'Logout' : undefined}
              className={`flex w-full items-center gap-3 rounded px-4 py-2 text-left text-lg font-semibold text-brand-950 transition hover:bg-brand-300 hover:text-brand-800 focus-visible:outline focus-visible:outline-brand-700 ${centerCls}`}
            >
              <LogOut size={22} aria-hidden="true" className="shrink-0" />
              <span className={labelCls}>Logout</span>
            </button>
          </div>
        </aside>

        {/* Desktop collapse toggle, sitting on the sidebar's right edge */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          aria-controls="app-sidebar"
          className="absolute right-0 top-10 z-50 hidden h-7 w-7 translate-x-1/2 items-center justify-center rounded-full bg-brand-500 text-white shadow-md transition hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 md:flex"
        >
          <ChevronRight
            size={16}
            aria-hidden="true"
            className={`transition-transform motion-reduce:transition-none ${
              collapsed ? '' : 'rotate-180'
            }`}
          />
        </button>
      </div>
    </>
  );
}