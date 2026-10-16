"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, images } from "../types/assets";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed top-3 left-3 z-30 p-2 rounded bg-brand-200 text-brand-600"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 min-h-screen p-6 bg-brand-200 text-brand-600 transform transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="md:hidden absolute top-3 right-3 p-2"
        >
          <X size={24} />
        </button>

        <div className="mb-10 flex items-center justify-center">
          <img
            src={images.logo2}
            alt="TechTree Logo"
            className="w-48 h-48 mix-blend-multiply object-contain"
          />
        </div>

        <nav className="space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded transition font-semibold text-xl ${
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-brand-600 hover:bg-brand-300 hover:text-brand-800"
                }`}
              >
                <Icon size={24} className="text-brand-950" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}