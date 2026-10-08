import { Home, BookOpen, BarChart3, FileText, CreditCard, User, TrendingUp, ArrowUp, CheckCircle, Trophy, Lock, Zap, Terminal } from 'lucide-react';
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
    examNumber: 'SY0-701',
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
    examName: 'CompTIA Security+',
    examNumber: 'SY0-601',
    date: 'May 19, 2025',
    time: '9:30 AM',
    score: 791,
    maxScore: 900,
    result: 'FAIL',
    duration: '1 hr 45 min',
    status: 'fail',
  },
];

export interface PracticeExam {
  id: string;
  vendor: 'CompTIA';
  code: string;
  level: 'Foundational' | 'Associate' | 'Professional';
  title: string;
  description: string;
  access: 'Free' | 'Pro';
  items: number;
  timeCap: number;
  targetPass: number;
  maxScore: number;
  domains: string[];
  icon: LucideIcon;
  features: string[];
}

export const practiceExams: PracticeExam[] = [
  {
  id: 'sy0-701-core',
  vendor: 'CompTIA',
  code: 'SY0-701',
  level: 'Associate',
  title: 'CompTIA Security+ SY0-701 Practice Exam',
  description: 'Validate network hardening, host monitoring, zero-trust cryptographic implementations, and standard incident remediation.',
  access: 'Pro',
  items: 70,
  timeCap: 90,
  targetPass: 750,
  maxScore: 900,
  domains: ['Threats & Attacks', 'Cryptography', 'Identity & Access', 'Risk Management'],
  icon: CheckCircle,
  features: ['verified', 'Simulated Pearson CBT'],
},
{
  id: 'sy0-701-threats',
  vendor: 'CompTIA',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Threat Detection Assessment',
  description: 'Focus on malware analysis, social engineering attacks, cloud threats, and security monitoring practices.',
  access: 'Pro',
  items: 80,
  timeCap: 100,
  targetPass: 750,
  maxScore: 900,
  domains: ['Threat Intelligence', 'Attack Vectors', 'Monitoring', 'Incident Response'],
  icon: CheckCircle,
  features: ['adaptive questions', 'performance analytics'],
},
{
  id: 'sy0-701-crypto',
  vendor: 'CompTIA',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Cryptography Challenge',
  description: 'Test encryption standards, PKI concepts, certificate management, and secure communications.',
  access: 'Pro',
  items: 65,
  timeCap: 85,
  targetPass: 750,
  maxScore: 900,
  domains: ['Cryptography', 'PKI', 'Certificates', 'Secure Protocols'],
  icon: CheckCircle,
  features: ['exam-ready', 'detailed explanations'],
},
{
  id: 'sy0-701-iam',
  vendor: 'CompTIA',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Identity & Access Control Exam',
  description: 'Measure knowledge of authentication methods, authorization models, MFA, and privilege management.',
  access: 'Pro',
  items: 75,
  timeCap: 95,
  targetPass: 750,
  maxScore: 900,
  domains: ['Identity Management', 'Access Control', 'Federation', 'Authentication'],
  icon: CheckCircle,
  features: ['PBQs included', 'exam simulation'],
},

];
