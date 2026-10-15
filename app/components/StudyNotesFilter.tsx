'use client';

import Link from 'next/link';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface StudyNotesFilterProps {
  selectedDomain: string | null;
  selectedModule: string | null;
  onDomainChange: (domain: string | null) => void;
  onModuleChange: (module: string | null) => void;
}

// Change this if your module pages live somewhere else
const MODULE_BASE_PATH = '/study-notes';

// '1.1' -> '/study-notes/domain-1-1' (matches your id: 'domain-1-1')
const getModuleHref = (module: string) =>
  `${MODULE_BASE_PATH}/domain-${module.replace('.', '-')}`;

const domains = [
  {
    name: 'Domain 1.0',
    title: 'Security Operations',
    percent: '34%',
    modules: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  },
  {
    name: 'Domain 2.0',
    title: 'Vulnerability Management',
    percent: '26%',
    modules: ['2.1', '2.2', '2.3', '2.4'],
  },
  {
    name: 'Domain 3.0',
    title: 'Incident Response and Management',
    percent: '24%',
    modules: ['3.1', '3.2', '3.3'],
  },
  {
    name: 'Domain 4.0',
    title: 'Reporting and Communication',
    percent: '16%',
    modules: ['4.1', '4.2', '4.3', '4.4'],
  },
];

export default function StudyNotesFilter({
  selectedDomain,
  selectedModule,
  onDomainChange,
  onModuleChange,
}: StudyNotesFilterProps) {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(selectedDomain);

  const hasActiveFilters = selectedDomain || selectedModule;
  const currentModules = domains.find((d) => d.name === expandedDomain)?.modules || [];

  return (
    <div className="bg-white rounded-2xl border border-brand-200 shadow-sm p-5 sm:p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-lg text-brand-900">Study Notes</h3>
          <p className="text-sm text-brand-600 mt-0.5">
            Choose a domain, then select a module to open it.
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onDomainChange(null);
              onModuleChange(null);
              setExpandedDomain(null);
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-full px-3 py-1.5 transition"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Domain cards: expand only, no navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {domains.map((domain) => {
          const isSelected = selectedDomain === domain.name;
          const isExpanded = expandedDomain === domain.name;

          return (
            <button
              key={domain.name}
              aria-pressed={isSelected}
              aria-expanded={isExpanded}
              onClick={() => {
                if (isExpanded) {
                  setExpandedDomain(null);
                  onDomainChange(null);
                  onModuleChange(null);
                } else {
                  setExpandedDomain(domain.name);
                  onDomainChange(domain.name);
                  onModuleChange(null);
                }
              }}
              className={`group relative flex flex-col justify-between text-left rounded-xl border p-4 min-h-27.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                  : 'bg-white border-brand-200 text-brand-900 hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${
                    isSelected ? 'text-white/80' : 'text-brand-600'
                  }`}
                >
                  {domain.name}
                </span>
                <span
                  className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'
                  }`}
                >
                  {domain.percent}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold leading-snug">{domain.title}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isSelected ? 'text-white/70' : 'text-brand-600'
                    }`}
                  >
                    {domain.modules.length} modules
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  } ${isSelected ? 'text-white' : 'text-brand-500'}`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Modules: each one is a link that opens its page */}
      {expandedDomain && (
        <div className="mt-5 rounded-xl bg-brand-50 border border-brand-200 p-4 sm:p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-brand-600 mb-3">
            {expandedDomain} modules
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {currentModules.map((module) => (
              <Link
                key={module}
                href={getModuleHref(module)}
                onClick={() => onModuleChange(module)}
                className="group flex items-center gap-3 rounded-lg border border-brand-200 bg-white text-brand-800 px-3 py-2.5 transition-all duration-150 hover:border-brand-500 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-md text-sm font-bold bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {module}
                </span>
                <span className="flex-1 text-sm font-medium leading-snug">
                  {getModuleTitle(expandedDomain, module)}
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-brand-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getModuleTitle(domain: string, module: string): string {
  const moduleMap: Record<string, string> = {
    '1.1': 'System and Network Architecture',
    '1.2': 'Indicators of Malicious Activity',
    '1.3': 'Security Tools and Scripting',
    '1.4': 'Threat Intel & Hunting',
    '1.5': 'Efficiency and Process Improvement',
    '1.6': 'AI in Security Operations',
    '2.1': 'Vulnerability Discovery',
    '2.2': 'Vulnerability Analysis',
    '2.3': 'Vulnerability Prioritization',
    '2.4': 'Vulnerability Mitigation',
    '3.1': 'Attack Methodologies',
    '3.2': 'IR Process',
    '3.3': 'Digital Forensics',
    '3.4': 'Incident Investigation',
    '3.5': 'Post-Incident Activities',
    '4.1': 'Reporting Techniques',
    '4.2': 'Dashboards & Metrics',
    '4.3': 'Stakeholder Communication',
    '4.4': 'Documentation & Compliance',
  };
  return moduleMap[module] || '';
}