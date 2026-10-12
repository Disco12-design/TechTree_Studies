'use client';

import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface StudyNotesFilterProps {
  selectedDomain: string | null;
  selectedModule: string | null;
  onDomainChange: (domain: string | null) => void;
  onModuleChange: (module: string | null) => void;
}

const domains = [
  {
    name: 'Domain 1.0',
    label: 'Security Operations (34%)',
    modules: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  },
  {
    name: 'Domain 2.0',
    label: 'Vulnerability Management (26%)',
    modules: ['2.1', '2.2', '2.3', '2.4', '2.5'],
  },
  {
    name: 'Domain 3.0',
    label: 'Incident Response and Management (24%)',
    modules: ['3.1', '3.2', '3.3', '3.4', '3.5'],
  },
  {
    name: 'Domain 4.0',
    label: 'Reporting and Communication (16%)',
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
    <div className="bg-white rounded-lg border border-brand-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-brand-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onDomainChange(null);
              onModuleChange(null);
              setExpandedDomain(null);
            }}
            className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-900"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Domain & Module Filter */}
        <div>
          <label className="block text-sm font-semibold text-brand-900 mb-3">
            Domain & Module
          </label>
          <div className="space-y-3">
            {domains.map((domain) => (
              <div key={domain.name}>
                {/* Domain Header */}
                <button
                  onClick={() => {
                    if (expandedDomain === domain.name) {
                      setExpandedDomain(null);
                      onDomainChange(null);
                      onModuleChange(null);
                    } else {
                      setExpandedDomain(domain.name);
                      onDomainChange(domain.name);
                      onModuleChange(null);
                    }
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border transition text-left font-semibold ${
                    selectedDomain === domain.name
                      ? 'bg-brand-100 border-brand-500 text-brand-900'
                      : 'border-brand-200 text-brand-700 hover:bg-brand-50'
                  }`}
                >
                  <ChevronDown
                    size={18}
                    className={`transition ${
                      expandedDomain === domain.name ? 'rotate-180' : ''
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{domain.name}</div>
                    <div className="text-xs text-brand-600">{domain.label}</div>
                  </div>
                </button>

                {/* Modules */}
                {expandedDomain === domain.name && (
                  <div className="ml-4 mt-2 space-y-2 pb-3 border-l-2 border-brand-200 pl-3">
                    {domain.modules.map((module) => {
                      // Get the module title from studyNotes
                      const moduleTitle = getModuleTitle(domain.name, module);
                      return (
                        <label key={module} className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedModule === module}
                            onChange={() =>
                              onModuleChange(selectedModule === module ? null : module)
                            }
                            className="w-4 h-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500 mt-1"
                          />
                          <div className="text-sm">
                            <div className="font-semibold text-brand-800">{module}</div>
                            <div className="text-xs text-brand-600">{moduleTitle}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
    '2.5': 'Vulnerability Reporting',
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
