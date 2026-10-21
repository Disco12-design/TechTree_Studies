"use client";

import { useEffect, useState } from "react";
import { loadExamAttempts, type ExamAttempt } from "@/lib/storage";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCw,
  ChevronDown,
  ClipboardList,
  Target,
  TrendingUp,
  Trophy,
  Calendar,
  GraduationCap,
  Dumbbell,
  Lightbulb,
  PartyPopper,
  Loader2,
} from "lucide-react";

// Must match the event name dispatched by the exam page after saving.
const ATTEMPTS_UPDATED_EVENT = "exam-attempts-updated";

type Tone = { bar: string; badge: string; ring: string };

const getTone = (score: number): Tone => {
  if (score >= 80)
    return {
      bar: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      ring: "text-emerald-600",
    };
  if (score >= 60)
    return {
      bar: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
      ring: "text-amber-600",
    };
  return {
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-rose-600/20",
    ring: "text-rose-600",
  };
};

// Used to sort newest first. Attempt ids end in a Date.now() timestamp;
// falls back to the date string if the id has no numeric suffix.
const stamp = (a: ExamAttempt) => {
  const n = Number(a.id.split("-").pop());
  return Number.isFinite(n) ? n : Date.parse(a.date) || 0;
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function Attempts() {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadAttempts = () => {
    setIsLoading(true);
    try {
      setAttempts([...loadExamAttempts()].sort((a, b) => stamp(b) - stamp(a)));
    } catch (e) {
      console.error("Failed to load attempts:", e);
      setAttempts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAttempts();

    const reload = () => loadAttempts();
    const onVisible = () => {
      if (document.visibilityState === "visible") loadAttempts();
    };

    window.addEventListener(ATTEMPTS_UPDATED_EVENT, reload); // same tab
    window.addEventListener("storage", reload); // other tabs
    document.addEventListener("visibilitychange", onVisible); // tab refocus

    return () => {
      window.removeEventListener(ATTEMPTS_UPDATED_EVENT, reload);
      window.removeEventListener("storage", reload);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const total = attempts.length;
  const average = total
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / total)
    : 0;
  const best = total ? Math.max(...attempts.map((a) => a.score)) : 0;

  return (
    <div className="mx-auto max-w-4xl p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Attempts
          </h1>
          <p className="mt-1 text-gray-600">
            Review your exam and practice results
          </p>
        </div>
        <button
          onClick={loadAttempts}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:opacity-60"
          title="Refresh attempts"
        >
          <RotateCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary stats */}
      {total > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard icon={ClipboardList} label="Total attempts" value={total} />
          <StatCard icon={TrendingUp} label="Average score" value={`${average}%`} />
          <StatCard icon={Trophy} label="Best score" value={`${best}%`} />
        </div>
      )}

      {/* Content */}
      {isLoading && total === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">Loading attempts…</p>
        </div>
      ) : total === 0 ? (
        <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <ClipboardList className="h-6 w-6" />
          </div>
          <p className="font-medium text-gray-900">No attempts yet</p>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Complete a practice exam or a real exam and your results will show
            up here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <Lightbulb className="h-4 w-4" />
            Select an attempt to see the questions you got wrong.
          </p>

          {attempts.map((attempt) => {
            const tone = getTone(attempt.score);
            const hasIncorrect =
              attempt.incorrectQuestions && attempt.incorrectQuestions.length > 0;
            const isOpen = expandedId === attempt.id;
            const isPractice = attempt.mode === "practice";

            return (
              <div
                key={attempt.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Score bar */}
                <div className="h-1 w-full bg-gray-100">
                  <div
                    className={`h-full ${tone.bar}`}
                    style={{ width: `${Math.min(attempt.score, 100)}%` }}
                  />
                </div>

                {/* Card header */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : attempt.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold text-gray-900">
                        {attempt.title}
                      </h3>
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {attempt.code}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
                          isPractice
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        {isPractice ? (
                          <Dumbbell className="h-3 w-3" />
                        ) : (
                          <GraduationCap className="h-3 w-3" />
                        )}
                        {isPractice ? "Practice" : "Real exam"}
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {attempt.date}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-700">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        {attempt.correct} correct
                      </span>
                      <span className="flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-rose-600" />
                        {attempt.incorrect} incorrect
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                        {attempt.unanswered} unanswered
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div
                      className={`rounded-lg px-3.5 py-2 text-lg font-semibold ring-1 ring-inset ${tone.badge}`}
                    >
                      {attempt.score}%
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded: incorrect questions */}
                {isOpen && hasIncorrect && (
                  <div className="border-t border-gray-200 bg-gray-50 p-5">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                      <Target className="h-4 w-4 text-rose-600" />
                      Questions you got wrong
                    </h4>
                    <div className="space-y-3">
                      {attempt.incorrectQuestions!.map((q, idx) => (
                        <div
                          key={q.id}
                          className="rounded-lg border border-gray-200 border-l-4 border-l-rose-500 bg-white p-4"
                        >
                          <p className="mb-3 text-sm font-medium text-gray-900">
                            <span className="mr-1 text-rose-600">
                              Q{idx + 1}.
                            </span>
                            {q.question}
                          </p>

                          <div className="space-y-2 text-sm">
                            <p className="flex items-start gap-2 text-gray-700">
                              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                              <span>
                                <span className="font-medium text-rose-700">
                                  Your answer:
                                </span>{" "}
                                {q.userAnswer.length === 0 ? (
                                  <span className="italic text-gray-500">
                                    Unanswered
                                  </span>
                                ) : (
                                  q.userAnswer.join(", ")
                                )}
                              </span>
                            </p>
                            <p className="flex items-start gap-2 text-gray-700">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                              <span>
                                <span className="font-medium text-emerald-700">
                                  Correct answer:
                                </span>{" "}
                                {q.correctAnswer.join(", ")}
                              </span>
                            </p>
                            {q.explanation && (
                              <div className="mt-2 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                <p className="text-gray-700">
                                  <span className="font-medium text-blue-700">
                                    Explanation:
                                  </span>{" "}
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expanded: perfect score */}
                {isOpen && !hasIncorrect && (
                  <div className="flex items-center gap-2 border-t border-gray-200 bg-emerald-50 p-5 text-sm text-emerald-800">
                    <PartyPopper className="h-5 w-5" />
                    Perfect score. You got every question correct.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}