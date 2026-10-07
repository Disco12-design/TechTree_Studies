'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../types/assets';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen p-6 bg-brand-50 text-brand-600">
      <h1 className="mb-10 text-2xl font-bold">TechTree </h1>
       <div className="mb-10">
         <img src="/logo.png" alt="TechTree Logo" className="w-16 h-16" />
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
                  ? 'bg-brand-500 text-white'
                  : 'text-brand-600 hover:bg-brand-300 hover:text-brand-800'
              }`}
            >
              <Icon size={24} className='text-brand-950' />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}