import { Home, BookOpen, BarChart3, FileText, CreditCard, User, TrendingUp, ArrowUp, CheckCircle, Trophy } from 'lucide-react';
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

export const images = { 
  logo: '/logo.png',
};

export const profile = {
  name: 'Sarah Jenkins',
  candidateId: '#1',
  icon: User,
};

export const metrics = {
  examsTaken: {
    value: 14,
    label: 'Exams Taken',
    icon: TrendingUp,
    change: '+3',
    changeLabel: 'completed this week',
  },
  averageScore: {
    value: 782,
    maxValue: 900,
    label: 'Average Score',
    icon: BarChart3,
    change: '+42 pts',
    changeLabel: 'vs initial diagnostic baseline',
  },
  bestScore: {
    value: 840,
    maxValue: 900,
    label: 'Best Score',
    icon: Trophy,
  },
  passRate: {
    value: '85.7%',
    label: 'Pass Rate',
    icon: CheckCircle,
    detail: '12 of 14 passed',
    cutScore: '750 cut score',
  },
  certification: {
    name: 'CompTIA Security+',
    accuracy: '93.3%',
    accuracyLabel: 'accuracy',
  },
};
