"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, images } from "../types/assets";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-24 md:w-72 min-h-screen p-2 md:p-6 bg-brand-200 text-brand-600">
      <div className="mb-6 md:mb-10 items-center flex justify-center flex-col">
        <img
          src={images.smallLogo}
          alt="TechTree Logo"
          className="w-full aspect-square object-contain md:hidden mix-blend-multiply"
        />
        <img
          src={images.logo2}
          alt="TechTree Logo"
          className="hidden md:block w-48 h-48 mix-blend-multiply object-contain"
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
              className={`flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded transition font-semibold text-xl ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-brand-600 hover:bg-brand-300 hover:text-brand-800"
              }`}
            >
              <Icon size={24} className="text-brand-950" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
