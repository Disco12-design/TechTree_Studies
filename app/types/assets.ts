import { Home, BookOpen, BarChart3, FileText, CreditCard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/practice-exam', label: 'Practice Exam', icon: BookOpen },
  { href: '/study-notes', label: 'Study Notes', icon: BarChart3 },
  { href: '/attempts', label: 'Attempts', icon: FileText },
  { href: '/pricing-billing', label: 'Pricing & Billing', icon: CreditCard },
];
