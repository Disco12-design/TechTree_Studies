'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks, images } from '../types/assets';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const asideRef = useRef<HTMLElement>(null);

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
        'a[href], button:not([disabled])'
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
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg p-2 text-brand-600 transition hover:bg-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
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

      {/* Sidebar / drawer */}
      <aside
        id="app-sidebar"
        ref={asideRef}
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col overflow-y-auto bg-brand-200 p-6 text-brand-600 transition-[transform,visibility] duration-300 motion-reduce:transition-none md:static md:translate-x-0 md:visible md:shrink-0 ${
          open ? 'translate-x-0' : '-translate-x-full max-md:invisible'
        }`}
      >
        {/* Mobile close button */}
        <button
          ref={closeButtonRef}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-3 top-3 rounded p-2 hover:bg-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 md:hidden"
        >
          <X size={24} />
        </button>

        {/* Desktop logo */}
        <div className="mb-10 flex items-center justify-center">
          <Link href="/dashboard" aria-label="Go to dashboard">
            <Image
              src={images.logo2}
              alt="TechTree Logo"
              width={192}
              height={192}
              priority
              className="h-48 w-48 object-contain mix-blend-multiply transition-opacity hover:opacity-80"
            />
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
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded px-4 py-2 text-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 ${
                  active
                    ? 'bg-brand-500 text-white'
                    : 'text-brand-950 hover:bg-brand-300 hover:text-brand-800'
                }`}
              >
                <Icon size={24} aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}