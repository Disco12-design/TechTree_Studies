"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { profile, metrics, examAttempts } from "../types/assets";
import { Calendar, Award, Plus, Eye, Flame, type LucideIcon } from "lucide-react";
import { daysUntil, countdownLabel, formatLongDate } from "@/lib/dates";
import { loadSavedProfile, loadAndUpdateStreak, type SavedProfile } from "@/lib/storage";


7
const primaryBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  footer,
}: {
  label: string;
  value: ReactNode;
  unit?: ReactNode;
  icon: LucideIcon;
  footer?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-brand-200 bg-white p-4 transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-brand-600 sm:text-sm">{label}</p>
          <p className="mt-1 flex items-baseline gap-1 text-2xl font-bold text-brand-900 sm:text-3xl">
            {value}
            {unit && (
              <span className="text-xs font-medium text-brand-600 sm:text-sm">/ {unit}</span>
            )}
          </p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 sm:h-10 sm:w-10">
          <Icon size={18} />
        </div>
      </div>
      {footer && <div className="mt-3 text-xs text-brand-600">{footer}</div>}
    </div>
  );
}

function ResultBadge({ status, children }: { status: string; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        status === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}

function ActionCard({
  title,
  description,
  cta,
  onClick,
}: {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-brand-200 bg-white p-5 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div>
        <h3 className="text-base font-semibold text-brand-600 sm:text-lg">{title}</h3>
        <p className="mt-1 text-sm text-brand-950">{description}</p>
      </div>
      <button onClick={onClick} className={`${primaryBtn} w-full sm:w-auto sm:shrink-0`}>
        {cta}
        <Plus size={14} />
      </button>
    </div>
  );
}


export default function Dashboard() {
  const router = useRouter();
  const ProfileIcon = profile.icon;

  const [examIso, setExamIso] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedProfile>({ name: null, avatar: null });
  const [ready, setReady] = useState(false);
  const [streak, setStreak] = useState(0);

  const displayName = saved.name ?? profile.name;
  const nameVisibility = ready ? "" : "invisible";

  useEffect(() => {
    setSaved(loadSavedProfile());
    setReady(true);
    setExamIso(localStorage.getItem("examDate"));
    setStreak(loadAndUpdateStreak());
  }, []);

  const examDateLabel = examIso ? formatLongDate(examIso) : null;
  const days = examIso ? daysUntil(examIso) : null;

  return (
    <div className="min-h-screen w-full bg-brand-50/50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-brand-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          <p className="text-sm font-semibold text-brand-900">Dashboard</p>

          <button
            onClick={() => router.push("/profile")}
            aria-label="Open profile settings"
            className="flex min-w-0 items-center gap-3 rounded-lg p-1 transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <div className="min-w-0 text-right">
              <p className={`truncate text-sm font-semibold text-brand-900 sm:text-base ${nameVisibility}`}>
                {displayName}
              </p>
              <p className="truncate text-xs text-brand-600">
                Candidate {profile.candidateId}
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-600 text-white">
              {saved.avatar ? (
                <img
                  src={saved.avatar}
                  alt=""
                  width={40}
                  height={40}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProfileIcon size={20} />
              )}
            </div>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        {/* Welcome */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-2xl font-bold text-brand-900 sm:text-4xl">
              Welcome back, <span className={nameVisibility}>{displayName}</span>
            </h1>
            
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1 text-xs font-semibold text-white">
              <Award size={14} />
              PRO MEMBER
            </span>
            <div className={`flex items-center gap-1.5 py-1 px-3 rounded-full ${streak >= 3 ? "bg-orange-500 text-white" : "bg-brand-800 text-white"}`}>
              <Flame size={14} />
              <p className="text-sm font-semibold">
                Streak: {streak} {streak === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm text-brand-600 sm:text-base">
            CompTIA Security+ &amp; AWS SAA-C03 Candidate
          </p>
        </section>

        {/* Target exam */}
        <section className="mb-6 flex flex-col gap-4 rounded-xl border border-brand-200 bg-white p-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="mb-1 flex items-center gap-2 text-brand-600">
              <Calendar size={18} />
              <span className="text-sm font-semibold">Target exam date</span>
            </div>
            <p className="text-xl font-bold text-brand-900 sm:text-2xl">
              {examDateLabel ?? "No date set"}
            </p>
            {days !== null && (
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  days < 0 ? "bg-amber-100 text-amber-800" : "bg-brand-100 text-brand-700"
                }`}
              >
                {countdownLabel(days)}
              </span>
            )}
          </div>
          {days !== null && days >= 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-brand-50 px-6 py-3">
              <p className="text-4xl font-extrabold tabular-nums text-brand-900 sm:text-5xl">
                {days}
              </p>
              <p className="text-xs font-semibold text-brand-600">
                {days === 1 ? "day left" : "days left"}
              </p>
            </div>
          ) : days !== null && days < 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-amber-50 px-6 py-3">
              <p className="text-4xl font-extrabold tabular-nums text-amber-800 sm:text-5xl">
                {Math.abs(days)}
              </p>
              <p className="text-xs font-semibold text-amber-700">
                {Math.abs(days) === 1 ? "day overdue" : "days overdue"}
              </p>
            </div>
          ) : null}
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <ActionCard
            title="Set date for exam"
            description="Setting the date for your upcoming exam will help you better prepare for it."
            cta="Set date"
            onClick={() => router.push("/dashboard/calendar")}
          />
          <ActionCard
            title="Begin your preparation"
            description="Start a new practice test now."
            cta="Start test"
            onClick={() => router.push("/practice-exam")}
          />
        </section>

        {/* Metrics */}
        <section className="mt-10 sm:mt-12">
          <h2 className="mb-4 text-xl font-bold text-brand-900 sm:mb-6 sm:text-2xl">
            Your performance
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            <MetricCard
              label={metrics.examsTaken.label}
              value={metrics.examsTaken.value}
              icon={metrics.examsTaken.icon}
              footer={
                <>
                  <span className="font-semibold">{metrics.examsTaken.change}</span>{" "}
                  {metrics.examsTaken.changeLabel}
                </>
              }
            />
            <MetricCard
              label={metrics.averageScore.label}
              value={metrics.averageScore.value}
              unit={metrics.averageScore.maxValue}
              icon={metrics.averageScore.icon}
              footer={
                <>
                  <span className="font-semibold">{metrics.averageScore.change}</span>{" "}
                  {metrics.averageScore.changeLabel}
                </>
              }
            />
            <MetricCard
              label={metrics.bestScore.label}
              value={metrics.bestScore.value}
              unit={metrics.bestScore.maxValue}
              icon={metrics.bestScore.icon}
            />
            <MetricCard
              label={metrics.passRate.label}
              value={metrics.passRate.value}
              icon={metrics.passRate.icon}
              footer={
                <>
                  <span className="font-semibold">{metrics.passRate.detail}</span>
                  <span className="mt-0.5 block text-brand-500">
                    ({metrics.passRate.cutScore})
                  </span>
                </>
              }
            />
          </div>
        </section>

        {/* Attempts */}
        <section className="mt-10 sm:mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              Recent practice exam attempts
            </h2>
            <button className="rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800">
              View all attempts
            </button>
          </div>

          {/* Mobile: card list */}
          <ul className="space-y-3 md:hidden">
            {examAttempts.map((attempt) => (
              <li
                key={attempt.id}
                className="rounded-xl border border-brand-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-900">
                      {attempt.examName}
                    </p>
                    <p className="text-xs text-brand-600">{attempt.examNumber}</p>
                  </div>
                  <ResultBadge status={attempt.status}>{attempt.result}</ResultBadge>
                </div>

                <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-brand-600">Date</dt>
                    <dd className="font-semibold text-brand-900">{attempt.date}</dd>
                    <dd className="text-brand-600">{attempt.time}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-600">Score</dt>
                    <dd className="font-semibold text-brand-900">
                      {attempt.score}{" "}
                      <span className="font-normal text-brand-600">/ {attempt.maxScore}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-brand-600">Duration</dt>
                    <dd className="font-semibold text-brand-900">{attempt.duration}</dd>
                  </div>
                </dl>

                <button className={`${primaryBtn} mt-4 w-full`}>
                  View results
                  <Eye size={16} />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto rounded-xl border border-brand-200 bg-white md:block">
            <table className="w-full min-w-180">
              <thead className="border-b border-brand-200 bg-brand-50">
                <tr>
                  {["Exam date", "Exam completed", "Score", "Result", "Duration", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-semibold text-brand-600 lg:px-6"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {examAttempts.map((attempt) => (
                  <tr key={attempt.id} className="transition hover:bg-brand-50">
                    <td className="px-5 py-4 lg:px-6">
                      <div className="text-sm font-semibold text-brand-900">{attempt.date}</div>
                      <div className="text-xs text-brand-600">{attempt.time}</div>
                    </td>
                    <td className="px-5 py-4 lg:px-6">
                      <div className="text-sm font-semibold text-brand-900">
                        {attempt.examName}
                      </div>
                      <div className="text-xs text-brand-600">{attempt.examNumber}</div>
                    </td>
                    <td className="px-5 py-4 lg:px-6">
                      <div className="text-sm font-bold text-brand-900">{attempt.score}</div>
                      <div className="text-xs text-brand-600">/ {attempt.maxScore}</div>
                    </td>
                    <td className="px-5 py-4 lg:px-6">
                      <ResultBadge status={attempt.status}>{attempt.result}</ResultBadge>
                    </td>
                    <td className="px-5 py-4 text-sm text-brand-900 lg:px-6">
                      {attempt.duration}
                    </td>
                    <td className="px-5 py-4 lg:px-6">
                      <button className={primaryBtn}>
                        View results
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}