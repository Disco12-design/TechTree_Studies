'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, images } from '../types/assets';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen p-6 bg-brand-200 text-brand-600">
   
       <div className="mb-10 items-center flex justify-center">
         <img src={images.logo} alt="TechTree Logo" className="w-32 h-32 mix-blend-multiply object-contain" />
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