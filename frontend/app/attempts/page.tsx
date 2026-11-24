
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {BackendError, getBackendAttempts,deleteBackendAttempt} from "@/lib/backend";
import { type ExamAttempt, type ReviewQuestion } from "@/lib/storage";
import { formatLongDate } from "@/lib/dates";

import {
  Check,
  X,
  CircleHelp,
  ChevronDown,
  ClipboardList,
  TrendingUp,
  Trophy,
  CalendarDays,
  GraduationCap,
  Dumbbell,
  Lightbulb,
  PartyPopper,
  Loader2,
  Trash2,
  Target,
  ArrowUpRight,
  Clock3,
  FileQuestion,
  AlertCircle,
} from "lucide-react";

type Tone = {
  color: string;
  background: string;
  border: string;
  progress: string;
  label: string;
};

const getTone = (score: number): Tone => {
  if (score >= 80) {
    return {
      color: "text-emerald-700",
      background: "bg-emerald-50",
      border: "border-emerald-100",
      progress: "bg-emerald-500",
      label: "Excellent",
    };
  }

  if (score >= 60) {
    return {
      color: "text-amber-700",
      background: "bg-amber-50",
      border: "border-amber-100",
      progress: "bg-amber-500",
      label: "Good progress",
    };
  }

  return {
    color: "text-rose-700",
    background: "bg-rose-50",
    border: "border-rose-100",
    progress: "bg-rose-500",
    label: "Needs improvement",
  };
};

const stamp = (a: ExamAttempt) => {
  const n = Number(a.id.split("-").pop());
  return Number.isFinite(n) ? n : Date.parse(a.date) || 0;
};

type ReviewFilter = "all" | "correct" | "wrong";

const FILTERS: { value: ReviewFilter; label: string }[] = [
  { value: "all", label: "All questions" },
  { value: "correct", label: "Correct" },
  { value: "wrong", label: "Incorrect" },
];

const getReviewItems = (attempt: ExamAttempt): ReviewQuestion[] =>
  attempt.reviewQuestions ??
  (attempt.incorrectQuestions ?? []).map((q) => ({
    ...q,
    isCorrect: false,
  }));


function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-gray-300" />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </p>
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}

// ------------------------------------------
// SCORE DISPLAY
// ------------------------------------------

function ScoreDisplay({ score }: { score: number }) {
  const tone = getTone(score);

  return (
    <div className="flex shrink-0 flex-col items-end gap-1.5">
      <span
        className={`text-3xl font-bold tracking-tight ${tone.color}`}
      >
        {score}%
      </span>

      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${tone.background} ${tone.color}`}
      >
        {tone.label}
      </span>
    </div>
  );
}

// ------------------------------------------
// QUESTION REVIEW
// ------------------------------------------

function QuestionReview({
  question,
  index,
}: {
  question: ReviewQuestion;
  index: number;
}) {
  const correct = question.isCorrect;

  return (
    <div
      className={`rounded-xl border bg-white p-4 sm:p-5 ${
        correct
          ? "border-emerald-100"
          : "border-rose-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
            correct
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {question.number ?? index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-gray-400">
              QUESTION {question.number ?? index + 1}
            </span>

            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                correct ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {correct ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              {correct ? "Correct" : "Incorrect"}
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">
            {question.question}
          </p>

          <div className="mt-4 space-y-3">
            {!correct && (
              <div className="rounded-lg bg-rose-50/70 p-3">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-rose-600">
                  Your answer
                </p>

                <p className="text-sm text-rose-800">
                  {question.userAnswer.length > 0
                    ? question.userAnswer.join(", ")
                    : "Not answered"}
                </p>
              </div>
            )}

            <div className="rounded-lg bg-emerald-50/70 p-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Correct answer
              </p>

              <p className="text-sm text-emerald-900">
                {question.correctAnswer.join(", ")}
              </p>
            </div>

            {question.explanation && (
              <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-semibold text-blue-800">
                    Explanation
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-700">
                    {question.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// MAIN COMPONENT
// ------------------------------------------

export default function Attempts() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);



  const removeFromList = (attemptId: string) => {
    setAttempts((prev) => prev.filter((a) => a.id !== attemptId));
    setExpandedId((current) =>
      current === attemptId ? null : current
    );
  };

  const openDeleteModal = (attemptId: string) => {
    setDeleteError(null);
    setPendingDeleteId(attemptId);
  };

  const closeDeleteModal = () => {
    if (deletingId) return;

    setPendingDeleteId(null);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    const attemptId = pendingDeleteId;

    setDeletingId(attemptId);
    setDeleteError(null);

    try {
      await deleteBackendAttempt(getToken, attemptId);

      removeFromList(attemptId);
      setPendingDeleteId(null);
    } catch (error) {
      if (error instanceof BackendError && error.status === 404) {
        removeFromList(attemptId);
        setPendingDeleteId(null);
      } else {
        console.error("Failed to delete attempt:", error);
        setDeleteError(
          "Unable to delete this attempt. Please try again."
        );
      }
    } finally {
      setDeletingId(null);
    }
  };

// Load attempts from the backend when the component mounts or visibility changes.
  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    const loadAttempts = async () => {
      try {
        if (!isSignedIn) {
          setAttempts([]);
          return;
        }

        const data = await getBackendAttempts(getToken);

        if (!cancelled) {
          setAttempts(
            [...data].sort((a, b) => stamp(b) - stamp(a))
          );
        }
      } catch (error) {
        console.error("Failed to load attempts:", error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        loadAttempts();
      }
    };

    loadAttempts();

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [getToken, isLoaded, isSignedIn]);


  const total = attempts.length;

  const average = total
    ? Math.round(
        attempts.reduce((sum, a) => sum + a.score, 0) / total
      )
    : 0;

  const best = total
    ? Math.max(...attempts.map((a) => a.score))
    : 0;


  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-9">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            <GraduationCap className="h-4 w-4 text-brand-600" />
            Learning dashboard
          </div>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                My Attempts
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Track your progress and learn from every exam.
              </p>
            </div>

            {total > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock3 className="h-4 w-4" />
                {total} recorded {total === 1 ? "attempt" : "attempts"}
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY STATISTICS */}

        {total > 0 && (
          <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3 ">

            <StatCard
              icon={ClipboardList}
              label="Total attempts"
              value={total}
              description="Exams completed"
            />

            <StatCard
              icon={TrendingUp}
              label="Average score"
              value={`${average}%`}
              description="Across all attempts"
            />

            <StatCard
              icon={Trophy}
              label="Highest score"
              value={`${best}%`}
              description="Your personal best"
            />
          </div>
        )}

        {/* SECTION HEADER */}

        {!isLoading && total > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Exam history
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Select an exam to review your performance.
              </p>
            </div>
          </div>
        )}

        {/* LOADING */}

        {isLoading && total === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-24">
            <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
            <p className="mt-4 text-sm text-gray-500">
              Loading your exam history...
            </p>
          </div>
        )}

        {/* EMPTY STATE */}

        {!isLoading && total === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
              <FileQuestion className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              No attempts yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Your exam results will appear here once you complete
              your first practice or real exam.
            </p>
          </div>
        )}

        {/* ATTEMPT LIST */}

        {total > 0 && (
          <div className="space-y-4">
            {attempts.map((attempt) => {
              const tone = getTone(attempt.score);
              const reviewItems = getReviewItems(attempt);
              const hasReviewItems = reviewItems.length > 0;
              const hasFullReview =
                attempt.reviewQuestions !== undefined;

              const visibleItems = reviewItems.filter((q) =>
                filter === "correct"
                  ? q.isCorrect
                  : filter === "wrong"
                    ? !q.isCorrect
                    : true
              );

              const hasMissedQuestions =
                attempt.incorrect + attempt.unanswered > 0;

              const isOpen = expandedId === attempt.id;
              const isPractice = attempt.mode === "practice";
              const isDeleting = deletingId === attempt.id;

              return (
                <div
                  key={attempt.id}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                    isOpen
                      ? "border-gray-300 shadow-sm"
                      : "border-gray-200/80 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* ATTEMPT CARD */}

                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">

                      {/* SCORE INDICATOR */}

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${tone.background}`}
                      >
                        <Target className={`h-6 w-6 ${tone.color}`} />
                      </div>

                      {/* MAIN INFORMATION */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                            {attempt.title}
                          </h3>

                          <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-gray-600">
                            {attempt.code}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatLongDate(attempt.date)}
                          </span>

                          <span
                            className={`flex items-center gap-1.5 font-medium ${
                              isPractice
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {isPractice ? (
                              <Dumbbell className="h-3.5 w-3.5" />
                            ) : (
                              <GraduationCap className="h-3.5 w-3.5" />
                            )}

                            {isPractice ? "Practice exam" : "Real exam"}
                          </span>
                        </div>

                        {/* ANSWER COUNTS */}

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                            <Check className="h-3.5 w-3.5" />
                            {attempt.correct} Correct
                          </span>

                          <span className="flex items-center gap-1.5 text-xs font-medium text-rose-600">
                            <X className="h-3.5 w-3.5" />
                            {attempt.incorrect} Incorrect
                          </span>

                          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                            <CircleHelp className="h-3.5 w-3.5" />
                            {attempt.unanswered} Unanswered
                          </span>
                        </div>
                      </div>

                      {/* SCORE */}

                      <ScoreDisplay score={attempt.score} />
                    </div>

                    {/* PROGRESS BAR */}

                    <div className="mt-5">
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${tone.progress}`}
                          style={{
                            width: `${Math.min(Math.max(attempt.score, 0), 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* CARD FOOTER */}

                    <div className="mt-5 flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedId(isOpen ? null : attempt.id);
                          setFilter("all");
                        }}
                        aria-expanded={isOpen}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-gray-950"
                      >
                        {isOpen ? "Close review" : "Review answers"}

                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(attempt.id)}
                        disabled={isDeleting}
                        aria-label={`Delete attempt: ${attempt.title}`}
                        title="Delete attempt"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED REVIEW */}

                  {isOpen && (
                    <div className="border-t border-gray-200 bg-brand-200  p-4 sm:p-6">

                      {hasReviewItems ? (
                        <>
                          {/* REVIEW HEADER */}

                          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="text-base font-bold text-gray-900">
                                Answer review
                              </h4>

                              <p className="mt-1 text-xs text-gray-500">
                                Review your answers and understand your mistakes.
                              </p>
                            </div>

                            <div
                              role="group"
                              aria-label="Filter questions"
                              className="flex w-full rounded-lg border border-gray-200 bg-white p-1 sm:w-auto"
                            >
                              {FILTERS.map((f) => (
                                <button
                                  key={f.value}
                                  type="button"
                                  aria-pressed={filter === f.value}
                                  onClick={() => setFilter(f.value)}
                                  className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition sm:flex-none ${
                                    filter === f.value
                                      ? "bg-gray-900 text-white shadow-sm"
                                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                  }`}
                                >
                                  {f.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {!hasFullReview && filter !== "wrong" && (
                            <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-800">
                              <AlertCircle className="h-4 w-4 shrink-0" />
                              This older attempt only saved incorrectly answered questions.
                            </div>
                          )}

                          {/* QUESTIONS */}

                          {visibleItems.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                              <FileQuestion className="mx-auto h-7 w-7 text-gray-300" />
                              <p className="mt-3 text-sm font-medium text-gray-700">
                                No questions found
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                Try selecting another filter.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {visibleItems.map((q, idx) => (
                                <QuestionReview
                                  key={q.id}
                                  question={q}
                                  index={idx}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      ) : hasMissedQuestions ? (
                        <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900">
                              Review unavailable
                            </p>
                            <p className="mt-1 text-xs leading-5 text-amber-800">
                              Question details were not saved for this attempt.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                          <PartyPopper className="h-6 w-6 text-emerald-600" />
                          <div>
                            <p className="text-sm font-bold text-emerald-900">
                              Perfect score!
                            </p>
                            <p className="mt-1 text-xs text-emerald-700">
                              You answered every question correctly.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

   
{/*delete confirmation modal*/}
      {pendingDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-[3px]"
          onClick={closeDeleteModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2
              id="delete-title"
              className="mt-5 text-xl font-bold text-gray-900"
            >
              Delete this attempt?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              This exam attempt and its saved review information will
              be permanently deleted. This action cannot be undone.
            </p>

            {deleteError && (
              <div
                role="alert"
                className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
              >
                {deleteError}
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                {deletingId && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                Delete attempt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
