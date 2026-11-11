'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useSidebar } from '../providers/SidebarProvider';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gauge,
  ListChecks,
  Play,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { pbqs } from '../data/pbq';
import { pbq04 } from '../data/pbq_2';
import { pbq03 } from '../data/pbq_03';
import { pbq06 } from '../data/pbq_04';
import { pbq08 } from '../data/pbq_05';
import { pbq10 } from '../data/pbq_06';
import { pbq11 } from '../data/pbq_07';
import { pbq02 } from '../data/pbq_08';
import { pbq07 } from '../data/pbq_09';
import { pbq09 } from '../data/pbq_10';
import PbqSim from '../components/PbqSim';
import PbqStepSim from '../components/PbqSim2';
import PbqDragSim from '../components/Pbqsim3';
import PbqHardenSim from '../components/Pbqsim4';
import PbqKillChainSim from '../components/Pbqsim5';
import PbqActionPlanSim from '../components/Pbqsim6';
import PbqRiskSim from '../components/Pbqsim7';
import PbqLogSim from '../components/Pbqsim8';
import PbqRemediationSim from '../components/Pbqsim9';
import PbqInvestigationSim from '../components/Pbqsim10';

type ScoreHandler = (id: string, score: number, maxPoints: number) => void;

const allPbqs = [
  ...pbqs,
  pbq04,
  pbq03,
  pbq06,
  pbq08,
  pbq10,
  pbq11,
  pbq02,
  pbq07,
  pbq09,
];

type AnyPbq = (typeof allPbqs)[number];

function renderSim(pbq: AnyPbq, onScore: ScoreHandler) {
  if (!('kind' in pbq)) return <PbqSim pbq={pbq} onScore={onScore} />;

  switch (pbq.kind) {
    case 'steps':
      return <PbqStepSim pbq={pbq} onScore={onScore} />;
    case 'listings':
      return <PbqDragSim pbq={pbq} onScore={onScore} />;
    case 'hardening':
      return <PbqHardenSim pbq={pbq} onScore={onScore} />;
    case 'artifacts':
      return <PbqKillChainSim pbq={pbq} onScore={onScore} />;
    case 'actionPlan':
      return <PbqActionPlanSim pbq={pbq} onScore={onScore} />;
    case 'riskPlan':
      return <PbqRiskSim pbq={pbq} onScore={onScore} />;
    case 'logAnalysis':
      return <PbqLogSim pbq={pbq} onScore={onScore} />;
    case 'remediation':
      return <PbqRemediationSim pbq={pbq} onScore={onScore} />;
    case 'investigation':
      return <PbqInvestigationSim pbq={pbq} onScore={onScore} />;
  }
}


const cleanTitle = (title: string) => title.replace(/^\d+\.\)\s*/, '');
const pct = (score: number, max: number) => (max > 0 ? Math.round((score / max) * 100) : 0);


const scoreTone = (p: number) =>
  p >= 80
    ? { bar: 'bg-green-500', text: 'text-green-800', soft: 'bg-green-50 ring-green-200' }
    : p >= 50
      ? { bar: 'bg-amber-500', text: 'text-amber-800', soft: 'bg-amber-50 ring-amber-200' }
      : { bar: 'bg-red-500', text: 'text-red-800', soft: 'bg-red-50 ring-red-200' };

function Chip({ icon: Icon, children }: { icon?: typeof Clock; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
      {Icon && <Icon size={13} aria-hidden="true" />}
      {children}
    </span>
  );
}

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${barClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function NumberBadge({ n, large = false }: { n: number; large?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-200 font-bold text-brand-700 ${
        large ? 'h-12 w-12 text-xl' : 'h-10 w-10 text-lg'
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-200 text-brand-700">
        <Icon size={22} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold leading-tight text-gray-900">{value}</p>
        {hint && <p className="truncate text-xs text-gray-500">{hint}</p>}
      </div>
    </div>
  );
}

// Previous / Next button used in the detail heading
function NavButton({
  direction,
  target,
  onClick,
}: {
  direction: 'prev' | 'next';
  target?: AnyPbq;
  onClick: () => void;
}) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const label = isPrev ? 'Previous' : 'Next';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!target}
      aria-label={target ? `${label} PBQ: ${cleanTitle(target.title)}` : `${label} PBQ (none)`}
      title={target ? cleanTitle(target.title) : undefined}
      className="inline-flex items-center gap-1.5 rounded-xl border border-brand-600 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-200 focus-visible:outline focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-white"
    >
      {isPrev && <Icon size={18} aria-hidden="true" />}
      <span className="hidden sm:inline">{label}</span>
      {!isPrev && <Icon size={18} aria-hidden="true" />}
    </button>
  );
}

export default function PBQPage() {
  const { collapsed } = useSidebar();
  const [selectedPBQ, setSelectedPBQ] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, { score: number; maxPoints: number }>>({});
  const topRef = useRef<HTMLDivElement>(null);

  const currentPBQ = selectedPBQ ? allPbqs.find((p) => p.id === selectedPBQ) : null;
  const currentIndex = currentPBQ ? allPbqs.findIndex((p) => p.id === currentPBQ.id) : -1;
  const prevPBQ = currentIndex > 0 ? allPbqs[currentIndex - 1] : undefined;
  const nextPBQ =
    currentIndex >= 0 && currentIndex < allPbqs.length - 1 ? allPbqs[currentIndex + 1] : undefined;

  const handleScore = (id: string, score: number, maxPoints: number) => {
    setScores((prev) => ({ ...prev, [id]: { score, maxPoints } }));
  };

  // Jump to another PBQ and bring the heading back into view
  const goTo = (target?: AnyPbq) => {
    if (!target) return;
    setSelectedPBQ(target.id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    topRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const openPbq = (id: string) => {
    setSelectedPBQ(id);
   
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (collapsed || !isDesktop) return;
    toast.info('Close the sidebar for the full experience', {
      id: 'pbq-sidebar-tip',
      description: 'Use the collapse arrow on the sidebar edge to give the simulation more room.',
      duration: 6000,
    });
  };

 
  if (currentPBQ) {
    const s = scores[currentPBQ.id];
    const p = s ? pct(s.score, s.maxPoints) : 0;
    const tone = scoreTone(p);

    return (
      <div ref={topRef} className="flex scroll-mt-4 flex-col bg-gray-50 p-4 md:p-8">
        <div className="mx-auto w-full max-w-7xl">
          <button
            onClick={() => setSelectedPBQ(null)}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-200 hover:text-brand-800 focus-visible:outline focus-visible:outline-brand-500"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to PBQ list
          </button>

          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <NumberBadge n={currentIndex + 1} large />
            <div className="min-w-0 flex-1 basis-60">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {cleanTitle(currentPBQ.title)}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip icon={Clock}>{currentPBQ.estimatedMinutes} min</Chip>
              </div>
            </div>
            {s && (
              <div className={`rounded-xl px-4 py-2 text-sm font-semibold ring-1 ${tone.soft} ${tone.text}`}>
                Last score: {s.score} / {s.maxPoints} ({p}%)
              </div>
            )}

            {/* Previous / Next */}
            <nav
              aria-label="PBQ navigation"
              className="flex w-full items-center justify-between gap-2 border-t border-gray-200 pt-4 sm:ml-auto sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0"
            >
              <NavButton direction="prev" target={prevPBQ} onClick={() => goTo(prevPBQ)} />
              <span className="min-w-14 text-center text-sm font-medium text-gray-600" aria-live="polite">
                {currentIndex + 1} / {allPbqs.length}
              </span>
              <NavButton direction="next" target={nextPBQ} onClick={() => goTo(nextPBQ)} />
            </nav>
          </div>

          {/* key forces a fresh simulation (and fresh answers) when switching PBQs */}
          <div key={currentPBQ.id}>{renderSim(currentPBQ, handleScore)}</div>
        </div>
      </div>
    );
  }


  const attempted = Object.values(scores);
  const completed = attempted.length;
  const average = completed
    ? Math.round(attempted.reduce((sum, v) => sum + pct(v.score, v.maxPoints), 0) / completed)
    : null;
  const totalMinutes = allPbqs.reduce((sum, v) => sum + v.estimatedMinutes, 0);
  const overall = Math.round((completed / allPbqs.length) * 100);

  return (
    <div className="flex flex-col bg-gray-50 p-4 md:p-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <span className="mb-3 inline-block rounded-full bg-brand-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Hands-on practice
          </span>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Performance-Based Questions</h1>
          <p className="mt-2 max-w-2xl text-base text-gray-600 md:text-lg">
            Practice with interactive simulations to build your cybersecurity skills.
          </p>
        </header>

        {/* Summary */}
        <section aria-label="Your progress" className="mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              icon={ListChecks}
              label="Simulations"
              value={String(allPbqs.length)}
              hint={`About ${totalMinutes} minutes in total`}
            />
            <StatCard
              icon={CheckCircle2}
              label="Attempted"
              value={`${completed} / ${allPbqs.length}`}
              hint={completed === 0 ? 'Pick one to get started' : undefined}
            />
            <StatCard
              icon={Trophy}
              label="Average score"
              value={average === null ? '–' : `${average}%`}
              hint={average === null ? 'No scores yet' : undefined}
            />
          </div>
          <div className="mt-4">
            <ProgressBar value={overall} barClass="bg-brand-500" />
          </div>
        </section>

        {/* Cards */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allPbqs.map((pbq, index) => {
            const s = scores[pbq.id];
            const p = s ? pct(s.score, s.maxPoints) : 0;
            const tone = scoreTone(p);

            return (
              <li
                key={pbq.id}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-start gap-3">
                  <NumberBadge n={index + 1} />
                  <h3 className="line-clamp-2 min-h-13 text-lg font-semibold leading-snug text-gray-900">
                    {cleanTitle(pbq.title)}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip icon={Clock}>{pbq.estimatedMinutes} min</Chip>
                  {/* {pbq.difficulty && <Chip icon={Gauge}>{pbq.difficulty}</Chip>} */}
                </div>

                <div className="mt-5 flex-1">
                  {s ? (
                    <div className={`rounded-xl p-3 ring-1 ${tone.soft}`}>
                      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                        <span className={tone.text}>
                          {s.score} / {s.maxPoints} points
                        </span>
                        <span className={tone.text}>{p}%</span>
                      </div>
                      <ProgressBar value={p} barClass={tone.bar} />
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-gray-300 px-3 py-3 text-center text-sm text-gray-500">
                      Not attempted yet
                    </p>
                  )}
                </div>

                <button
                  onClick={() => openPbq(pbq.id)}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition focus-visible:outline focus-visible:outline-brand-500 ${
                    s
                      ? 'border border-brand-600 bg-white text-brand-700 hover:bg-brand-200'
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                  }`}
                >
                  {s ? <RotateCcw size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                  {s ? 'Retake' : 'Start'} PBQ
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}