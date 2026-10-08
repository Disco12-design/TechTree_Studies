'use client';

import { useMemo, useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { practiceExams } from '../types/assets';

const LEVELS = ['All', 'Foundational', 'Associate', 'Professional'];
const ACCESS = ['All', 'Free', 'Pro'];

type SegmentedProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function Segmented({ label, options, value, onChange }: SegmentedProps) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-3">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex rounded-md border border-gray-300 p-0.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded px-3 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600 ${
              value === option
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PracticeExam() {
  const [level, setLevel] = useState('All');
  const [access, setAccess] = useState('All');

  const filtered = practiceExams.filter(
    (e) =>
      (level === 'All' || e.level === level) &&
      (access === 'All' || e.access === access)
  );

  const isFiltered = level !== 'All' || access !== 'All';

  const reset = () => {
    setLevel('All');
    setAccess('All');
  };

  return (
    <div className="w-full px-5 py-8">
      {/* Header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Practice exams
          </h1>
          <p className="mt-2 max-w-xl text-base text-gray-600">
            Timed, full-length simulations written to match the real exam
            format, so test day isn&apos;t the first time you see it.
          </p>
        </div>

        <dl className="flex gap-10">
          <div>
            <dd className="text-2xl font-semibold tabular-nums text-gray-900">
              {practiceExams.length}
            </dd>
            <dt className="text-sm text-gray-500">exams available</dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold tabular-nums text-gray-900">
              84%
            </dd>
            <dt className="text-sm text-gray-500">average pass rate</dt>
          </div>
        </dl>
      </header>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-gray-200 py-3">
        <Segmented label="Level" options={LEVELS} value={level} onChange={setLevel} />
        <Segmented label="Access" options={ACCESS} value={access} onChange={setAccess} />

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          <span aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'exam' : 'exams'}
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="text-gray-900 underline underline-offset-4 hover:text-brand-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Exam list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-medium text-gray-900">No exams match these filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 text-sm text-brand-700 underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((exam) => (
            <li
              key={exam.id}
              className="grid gap-5 py-8 md:grid-cols-[10rem_1fr_11rem] md:gap-10"
            >
              {/* Identity */}
              <div>
                <p className="text-2xl font-semibold tracking-tight text-gray-900">
                  {exam.code}
                </p>
                <p className="text-sm text-gray-500">{exam.level}</p>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">
                  {exam.description}
                </p>

                <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                  {[
                    { label: 'questions', value: exam.items },
                    { label: 'minutes', value: exam.timeCap },
                    { label: 'to pass', value: exam.targetPass },
                    { label: 'max score', value: exam.maxScore },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="text-xs text-gray-500">{stat.label}</dt>
                      <dd className="text-lg font-semibold tabular-nums text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {exam.domains.length > 0 && (
                  <p className="mt-5 max-w-2xl text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Covers </span>
                    {exam.domains.join(', ')}
                  </p>
                )}

                {exam.features.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                    {exam.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        {feature === 'verified' && (
                          <Check className="h-4 w-4 text-green-700" aria-hidden />
                        )}
                        {feature === 'verified' ? 'Verified questions' : feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-start">
                <p
                  className={`flex items-center gap-1.5 text-sm font-medium ${
                    exam.access === 'Free' ? 'text-green-700' : 'text-gray-700'
                  }`}
                >
                  {exam.access === 'Pro' && <Lock className="h-3.5 w-3.5" aria-hidden />}
                  {exam.access === 'Free' ? 'Free' : 'Pro plan'}
                </p>
                <button
                  type="button"
                  className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Start exam
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}