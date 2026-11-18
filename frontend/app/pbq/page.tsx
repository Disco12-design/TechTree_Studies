'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ListChecks,
  Play,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { useSidebar } from '../providers/SidebarProvider';

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

// ---------- Data ----------

const allPbqs = [...pbqs, pbq04, pbq03, pbq06, pbq08, pbq10, pbq11, pbq02, pbq07, pbq09];

type AnyPbq = (typeof allPbqs)[number];
type ScoreHandler = (id: string, score: number, maxPoints: number) => void;
type Score = { score: number; maxPoints: number };
type SimProps = { pbq: any; onScore: ScoreHandler };

// Maps a PBQ's `kind` to its simulation. PBQs without a `kind` use PbqSim.
const SIMS: Record<string, ComponentType<SimProps>> = {
  steps: PbqStepSim,
  listings: PbqDragSim,
  hardening: PbqHardenSim,
  artifacts: PbqKillChainSim,
  actionPlan: PbqActionPlanSim,
  riskPlan: PbqRiskSim,
  logAnalysis: PbqLogSim,
  remediation: PbqRemediationSim,
  investigation: PbqInvestigationSim,
};

// ---------- Helpers ----------

const cleanTitle = (title: string) => title.replace(/^\d+\.\)\s*/, '');
const toPercent = ({ score, maxPoints }: Score) =>
  maxPoints > 0 ? Math.round((score / maxPoints) * 100) : 0;

const scoreTone = (percent: number) => {
  if (percent >= 80) return { bar: 'bg-green-500', text: 'text-green-800', soft: 'bg-green-50 ring-green-200' };
  if (percent >= 50) return { bar: 'bg-amber-500', text: 'text-amber-800', soft: 'bg-amber-50 ring-amber-200' };
  return { bar: 'bg-red-500', text: 'text-red-800', soft: 'bg-red-50 ring-red-200' };
};

const focusRing = 'focus-visible:outline focus-visible:outline-brand-500';

// useState that survives refreshes. Reads after mount so server and client
// render the same HTML first (avoids Next.js hydration mismatches).
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) setValue(JSON.parse(saved));
    } catch {
      // Corrupt data or storage blocked: fall back to the initial value
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return; // don't overwrite saved data with the initial value
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: keep working in memory
    }
  }, [key, value, loaded]);

  return [value, setValue] as const;
}

// ---------- Small UI pieces ----------

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
      <Clock size={13} aria-hidden="true" />
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
  const size = large ? 'h-12 w-12 text-xl' : 'h-10 w-10 text-lg';
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-200 font-bold text-brand-700 ${size}`}
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
  const icon = <Icon size={18} aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!target}
      aria-label={target ? `${label} PBQ: ${cleanTitle(target.title)}` : `${label} PBQ (none)`}
      title={target && cleanTitle(target.title)}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-brand-600 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-200 ${focusRing} disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-white`}
    >
      {isPrev && icon}
      <span className="hidden sm:inline">{label}</span>
      {!isPrev && icon}
    </button>
  );
}

// ---------- Detail view ----------

function PbqDetail({
  pbq,
  index,
  score,
  onScore,
  onBack,
  onNavigate,
}: {
  pbq: AnyPbq;
  index: number;
  score?: Score;
  onScore: ScoreHandler;
  onBack: () => void;
  onNavigate: (target?: AnyPbq) => void;
}) {
  const prev = allPbqs[index - 1];
  const next = allPbqs[index + 1];
  const percent = score ? toPercent(score) : 0;
  const tone = scoreTone(percent);
  const Sim = ('kind' in pbq ? SIMS[pbq.kind] : PbqSim) as ComponentType<SimProps>;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <button
        onClick={onBack}
        className={`mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-200 hover:text-brand-800 ${focusRing}`}
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to PBQ list
      </button>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <NumberBadge n={index + 1} large />
        <div className="min-w-0 flex-1 basis-60">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{cleanTitle(pbq.title)}</h1>
          <div className="mt-2">
            <Chip>{pbq.estimatedMinutes} min</Chip>
          </div>
        </div>

        {score && (
          <div className={`rounded-xl px-4 py-2 text-sm font-semibold ring-1 ${tone.soft} ${tone.text}`}>
            Last score: {score.score} / {score.maxPoints} ({percent}%)
          </div>
        )}

        <nav
          aria-label="PBQ navigation"
          className="flex w-full items-center justify-between gap-2 border-t border-gray-200 pt-4 sm:ml-auto sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0"
        >
          <NavButton direction="prev" target={prev} onClick={() => onNavigate(prev)} />
          <span className="min-w-14 text-center text-sm font-medium text-gray-600" aria-live="polite">
            {index + 1} / {allPbqs.length}
          </span>
          <NavButton direction="next" target={next} onClick={() => onNavigate(next)} />
        </nav>
      </div>

      {/* key forces a fresh simulation (and fresh answers) when switching PBQs */}
      <Sim key={pbq.id} pbq={pbq} onScore={onScore} />
    </div>
  );
}

// ---------- List view ----------

function PbqCard({
  pbq,
  index,
  score,
  onOpen,
}: {
  pbq: AnyPbq;
  index: number;
  score?: Score;
  onOpen: () => void;
}) {
  const percent = score ? toPercent(score) : 0;
  const tone = scoreTone(percent);

  return (
    <li className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-start gap-3">
        <NumberBadge n={index + 1} />
        <h3 className="line-clamp-2 min-h-13 text-lg font-semibold leading-snug text-gray-900">
          {cleanTitle(pbq.title)}
        </h3>
      </div>

      <div className="mt-4">
        <Chip>{pbq.estimatedMinutes} min</Chip>
      </div>

      <div className="mt-5 flex-1">
        {score ? (
          <div className={`rounded-xl p-3 ring-1 ${tone.soft}`}>
            <div className={`mb-2 flex items-center justify-between text-sm font-semibold ${tone.text}`}>
              <span>
                {score.score} / {score.maxPoints} points
              </span>
              <span>{percent}%</span>
            </div>
            <ProgressBar value={percent} barClass={tone.bar} />
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-300 px-3 py-3 text-center text-sm text-gray-500">
            Not attempted yet
          </p>
        )}
      </div>

      <button
        onClick={onOpen}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition ${focusRing} ${
          score
            ? 'border border-brand-600 bg-white text-brand-700 hover:bg-brand-200'
            : 'bg-brand-600 text-white hover:bg-brand-700'
        }`}
      >
        {score ? <RotateCcw size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        {score ? 'Retake' : 'Start'} PBQ
      </button>
    </li>
  );
}

function PbqList({
  scores,
  onOpen,
}: {
  scores: Record<string, Score>;
  onOpen: (id: string) => void;
}) {
  const results = Object.values(scores);
  const completed = results.length;
  const total = allPbqs.length;
  const average = completed
    ? Math.round(results.reduce((sum, s) => sum + toPercent(s), 0) / completed)
    : null;
  const totalMinutes = allPbqs.reduce((sum, p) => sum + p.estimatedMinutes, 0);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <header className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-brand-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Hands-on practice
        </span>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Performance-Based Questions</h1>
        <p className="mt-2 max-w-2xl text-base text-gray-600 md:text-lg">
          Practice with interactive simulations to build your cybersecurity skills.
        </p>
      </header>

// Progress overview section
      <section aria-label="Your progress" className="mb-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={ListChecks}
            label="Simulations"
            value={String(total)}
            hint={`About ${totalMinutes} minutes in total`}
          />
          <StatCard
            icon={CheckCircle2}
            label="Attempted"
            value={`${completed} / ${total}`}
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
          <ProgressBar value={Math.round((completed / total) * 100)} barClass="bg-brand-500" />
        </div>
      </section>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allPbqs.map((pbq, i) => (
          <PbqCard key={pbq.id} pbq={pbq} index={i} score={scores[pbq.id]} onOpen={() => onOpen(pbq.id)} />
        ))}
      </ul>
    </div>
  );
}

// ---------- Page ----------

export default function PBQPage() {
  const { collapsed } = useSidebar();
  const [selectedId, setSelectedId] = useLocalStorage<string | null>('pbq:selected', null);
  const [scores, setScores] = useLocalStorage<Record<string, Score>>('pbq:scores', {});
  const topRef = useRef<HTMLDivElement>(null);

  const currentIndex = allPbqs.findIndex((p) => p.id === selectedId);
  const current = allPbqs[currentIndex];

  const handleScore: ScoreHandler = (id, score, maxPoints) =>
    setScores((prev) => ({ ...prev, [id]: { score, maxPoints } }));

  const goTo = (target?: AnyPbq) => {
    if (!target) return;
    setSelectedId(target.id);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    topRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const openPbq = (id: string) => {
    setSelectedId(id);
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (collapsed || !isDesktop) return;
    toast.info('Close the sidebar for the full experience', {
      id: 'pbq-sidebar-tip',
      description: 'Use the collapse arrow on the sidebar edge to give the simulation more room.',
      duration: 6000,
    });
  };

  return (
    <div ref={topRef} className="flex scroll-mt-4 flex-col bg-gray-50 p-4 md:p-8">
      {current ? (
        <PbqDetail
          pbq={current}
          index={currentIndex}
          score={scores[current.id]}
          onScore={handleScore}
          onBack={() => setSelectedId(null)}
          onNavigate={goTo}
        />
      ) : (
        <PbqList scores={scores} onOpen={openPbq} />
      )}
    </div>
  );
}