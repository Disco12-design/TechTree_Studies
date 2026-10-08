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

export const examAttempts = [
  {
    id: 1,
    examName: 'CompTIA Security+',
    examNumber: '501-701',
    date: 'May 19, 2025',
    time: '12:45 PM',
    score: 782,
    maxScore: 900,
    result: 'PASS',
    duration: '1 hr 15 min',
    status: 'pass',
  },
  {
    id: 2,
    examName: 'AWS Solutions Architect Associate',
    examNumber: 'SAA-C03',
    date: 'May 21, 2025',
    time: '10:30 AM',
    score: 773,
    maxScore: 1000,
    result: 'PASS',
    duration: '2 hrs 42 min',
    status: 'pass',
  },
  {
    id: 3,
    examName: 'CompTIA Security+',
    examNumber: '601-701',
    date: 'May 19, 2025',
    time: '9:30 AM',
    score: 791,
    maxScore: 900,
    result: 'FAIL',
    duration: '1 hr 45 min',
    status: 'fail',
  },
  {
    id: 4,
    examName: 'AWS Certified Cloud Practitioner',
    examNumber: 'CLF-C02',
    date: 'May 12, 2025',
    time: '3:15 PM',
    score: 823,
    maxScore: 1000,
    result: 'PASS',
    duration: '1 hr 32 min',
    status: 'pass',
  },
];
