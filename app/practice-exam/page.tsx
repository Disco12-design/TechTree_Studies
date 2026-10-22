"use client";

import {
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  BookOpen,
  Check,
  ChevronLeft,
  Clock,
  Flag,
  Lock,
  Timer,
  X,
} from "lucide-react";
import { practiceExams, type PracticeExam } from "../types/assets";
import {
  saveExamAttempt,
  type IncorrectQuestion,
  type ReviewQuestion,
} from "@/lib/storage";
import { todayIso } from "@/lib/dates";

type Mode = "practice" | "real";
type Question = NonNullable<PracticeExam["questions"]>[number];

const LEVELS = ["All", "Foundational", "Associate", "Professional"] as const;
const ACCESS = ["All", "Free", "Pro"] as const;
const LOW_TIME_SECONDS = 300;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
const toOptions = <T extends string>(values: readonly T[]) =>
  values.map((value) => ({ value, label: value }));

function isCorrect(question: Question, selected: readonly string[]) {
  return (
    selected.length === question.answer.length &&
    question.answer.every((answer) => selected.includes(answer))
  );
}

// Format time as MM:SS for display purposes
function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Get the explanation for a question, if available
function getExplanation(question: Question): string | undefined {
  const value = (question as { explanation?: unknown }).explanation;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

type ButtonVariant = "primary" | "secondary" | "link";

// Button base styles and variants
const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50";

// Button variant styles
const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700",
  secondary:
    "border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50",
  link: "font-medium text-brand-700 underline underline-offset-4 hover:text-brand-600",
};

// Button component that supports primary, secondary, and link variants
function Button({
  variant = "primary",
  type = "button",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}
      {...props}
    />
  );
}

// Segmented control component for selecting one option from a set of options
type SegmentedProps<T extends string> = {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

// Segmented control component implementation
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-3">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex rounded-md border border-gray-300 p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded px-3 py-1 text-sm focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-brand-600",
              value === option.value
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Dialog component for displaying modal content
function Dialog({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => !el.hasAttribute("disabled"));

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/50 p-4 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id={titleId} className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
        {description && (
          <p
            id={descriptionId}
            className="mt-2 text-sm leading-relaxed text-gray-600"
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

// Confirm dialog component for confirming user actions
function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Keep going",
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog title={title} description={description} onClose={onCancel}>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}

// Mode dialog component for selecting the exam mode (practice or real)
function ModeDialog({
  exam,
  onSelect,
  onClose,
}: {
  exam: PracticeExam;
  onSelect: (mode: Mode) => void;
  onClose: () => void;
}) {
  const choices = [
    {
      mode: "practice" as const,
      icon: BookOpen,
      title: "Practice mode",
      description:
        "No time limit. Check each answer as you go and see straight away what you got wrong.",
    },
    {
      mode: "real" as const,
      icon: Timer,
      title: "Real exam",
      description: `${exam.timeCap} minutes on the clock. No feedback until you submit, then you get your score and a full review.`,
    },
  ];

  return (
    <Dialog title={`How do you want to take ${exam.code}?`} onClose={onClose}>
      <div className="mt-5 grid gap-3">
        {choices.map(({ mode, icon: Icon, title, description }) => (
          <button
            key={mode}
            type="button"
            onClick={() => onSelect(mode)}
            className="flex items-start gap-4 rounded-lg border border-gray-300 p-4 text-left transition-colors hover:border-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
              aria-hidden
            />
            <span>
              <span className="block font-semibold text-gray-900">{title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5">
        <Button variant="link" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

function OptionsReview({
  question,
  selected,
}: {
  question: Question;
  selected: readonly string[];
}) {
  return (
    <ul className="space-y-2">
      {Object.entries(question.options).map(([option, text]) => {
        const isAnswer = question.answer.includes(option);
        const isPicked = selected.includes(option);

        return (
          <li
            key={option}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3 text-sm",
              isAnswer && "border-green-600 bg-green-50",
              !isAnswer && isPicked && "border-red-600 bg-red-50",
              !isAnswer && !isPicked && "border-gray-200",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                isAnswer && "bg-green-700 text-white",
                !isAnswer && isPicked && "bg-red-700 text-white",
                !isAnswer &&
                  !isPicked &&
                  "border border-gray-300 text-gray-600",
              )}
            >
              {isAnswer ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
              ) : isPicked ? (
                <X className="h-3.5 w-3.5" aria-hidden />
              ) : (
                option
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="leading-relaxed text-gray-900">
                <span className="sr-only">{option}. </span>
                {text}
              </p>
              {isAnswer && (
                <p className="mt-1 text-xs font-semibold text-green-800">
                  Correct answer{isPicked ? " (you chose this)" : ""}
                </p>
              )}
              {!isAnswer && isPicked && (
                <p className="mt-1 text-xs font-semibold text-red-800">
                  Your answer
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type SessionState = {
  index: number;
  answers: Record<number, string[]>;
  checked: Record<number, boolean>;
  flagged: Record<number, boolean>;
  submitted: boolean;
  timedOut: boolean;
};

type SessionAction =
  | { type: "goto"; index: number }
  | { type: "select"; id: number; option: string; multiple: boolean }
  | { type: "check"; id: number }
  | { type: "toggleFlag"; id: number }
  | { type: "submit"; timedOut?: boolean };

const INITIAL_SESSION: SessionState = {
  index: 0,
  answers: {},
  checked: {},
  flagged: {},
  submitted: false,
  timedOut: false,
};

function sessionReducer(
  state: SessionState,
  action: SessionAction,
): SessionState {
  switch (action.type) {
    case "goto":
      return { ...state, index: action.index };

    case "select": {
      // Answers lock once checked in practice mode.
      if (state.checked[action.id]) return state;
      const current = state.answers[action.id] ?? [];
      const next = action.multiple
        ? current.includes(action.option)
          ? current.filter((option) => option !== action.option)
          : [...current, action.option]
        : [action.option];
      return { ...state, answers: { ...state.answers, [action.id]: next } };
    }

    case "check":
      return { ...state, checked: { ...state.checked, [action.id]: true } };

    case "toggleFlag":
      return {
        ...state,
        flagged: { ...state.flagged, [action.id]: !state.flagged[action.id] },
      };

    case "submit":
      return state.submitted
        ? state
        : { ...state, submitted: true, timedOut: action.timedOut ?? false };
  }
}

function useExamSession(exam: PracticeExam, mode: Mode) {
  const questions = useMemo(() => exam.questions ?? [], [exam.questions]);
  const [state, dispatch] = useReducer(sessionReducer, INITIAL_SESSION);
  const minutes = Number(exam.timeCap);
  const isTimed = mode === "real" && Number.isFinite(minutes) && minutes > 0;
  const [endsAt] = useState(() =>
    isTimed ? Date.now() + minutes * 60_000 : null,
  );
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    isTimed ? minutes * 60 : null,
  );

  useEffect(() => {
    if (endsAt === null || state.submitted) return;

    const tick = () => {
      const left = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) dispatch({ type: "submit", timedOut: true });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt, state.submitted]);

  useEffect(() => {
    if (state.submitted) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [state.submitted]);

  const question = questions[state.index];

  const answeredCount = useMemo(
    () =>
      questions.filter((q) => (state.answers[q.id]?.length ?? 0) > 0).length,
    [questions, state.answers],
  );
  const flaggedCount = useMemo(
    () => questions.filter((q) => state.flagged[q.id]).length,
    [questions, state.flagged],
  );
  const goTo = (index: number) =>
    dispatch({
      type: "goto",
      index: Math.min(Math.max(index, 0), questions.length - 1),
    });

  return {
    state,
    questions,
    question,
    secondsLeft,
    answeredCount,
    unansweredCount: questions.length - answeredCount,
    flaggedCount,
    goTo,
    next: () => goTo(state.index + 1),
    prev: () => goTo(state.index - 1),
    select: (option: string) =>
      dispatch({
        type: "select",
        id: question.id,
        option,
        multiple: question.type === "multiple_choice",
      }),
    check: () => dispatch({ type: "check", id: question.id }),
    toggleFlag: () => dispatch({ type: "toggleFlag", id: question.id }),
    submit: () => dispatch({ type: "submit" }),
  };
}

type QuestionViewProps = {
  question: Question;
  number: number;
  total: number;
  mode: Mode;
  selected: string[];
  checked: boolean;
  flagged: boolean;
  onSelect: (option: string) => void;
  onCheck: () => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

function QuestionView({
  question,
  number,
  total,
  mode,
  selected,
  checked,
  flagged,
  onSelect,
  onCheck,
  onToggleFlag,
  onPrev,
  onNext,
  onFinish,
}: QuestionViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move focus to the new question so screen-reader users hear it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [question.id]);

  const multiple = question.type === "multiple_choice";
  const isLast = number === total;
  const showCheck = mode === "practice" && !checked;
  const correct = isCorrect(question, selected);
  const explanation = getExplanation(question);
  const answerList = question.answer.join(", ");
  const plural = question.answer.length > 1;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-500">
          Question {number} of {total}
        </p>
        <button
          type="button"
          aria-pressed={flagged}
          onClick={onToggleFlag}
          className={cn(
            "flex items-center gap-1.5 rounded text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
            flagged ? "text-amber-700" : "text-gray-600 hover:text-gray-900",
          )}
        >
          <Flag
            className="h-4 w-4"
            fill={flagged ? "currentColor" : "none"}
            aria-hidden
          />
          {flagged ? "Flagged for review" : "Flag for review"}
        </button>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-lg font-semibold leading-relaxed text-gray-900 outline-none"
      >
        {question.question}
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        {multiple
          ? `Select ${question.answer.length} answers.`
          : "Select one answer."}
      </p>

      {checked ? (
        <div className="mt-6">
          <OptionsReview question={question} selected={selected} />
        </div>
      ) : (
        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">Answer options</legend>
          {Object.entries(question.options).map(([option, text]) => {
            const isSelected = selected.includes(option);

            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors focus-within:outline focus-within:outline-offset-2 focus-within:outline-brand-600",
                  isSelected
                    ? "border-brand-600 bg-brand-50"
                    : "border-gray-200 hover:border-gray-400",
                )}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={`question-${question.id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => onSelect(option)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center border text-xs font-semibold",
                    multiple ? "rounded" : "rounded-full",
                    isSelected
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-gray-300 text-gray-600",
                  )}
                >
                  {option}
                </span>
                <span className="leading-relaxed text-gray-800">
                  <span className="sr-only">{option}. </span>
                  {text}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      {/* Practice-mode instant feedback */}
      {checked && (
        <div
          role="status"
          className={cn(
            "mt-5 rounded-lg px-4 py-3 text-sm",
            correct ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900",
          )}
        >
          <p className="font-semibold">
            {correct
              ? "Correct!"
              : `${selected.length === 0 ? "You skipped this one." : "Not quite."} The correct answer${plural ? "s are" : " is"} ${answerList}.`}
          </p>
          {explanation && <p className="mt-1 leading-relaxed">{explanation}</p>}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={onPrev} disabled={number === 1}>
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {showCheck && (
            <Button onClick={onCheck} disabled={selected.length === 0}>
              Check answer
            </Button>
          )}
          {isLast ? (
            <Button
              variant={showCheck ? "secondary" : "primary"}
              onClick={onFinish}
            >
              {mode === "practice" ? "Finish" : "Submit exam"}
            </Button>
          ) : (
            <Button
              variant={showCheck ? "secondary" : "primary"}
              onClick={onNext}
            >
              {showCheck ? "Skip" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function QuestionNavigator({
  questions,
  answers,
  flagged,
  checked,
  currentIndex,
  mode,
  answeredCount,
  onGoTo,
}: {
  questions: Question[];
  answers: Record<number, string[]>;
  flagged: Record<number, boolean>;
  checked: Record<number, boolean>;
  currentIndex: number;
  mode: Mode;
  answeredCount: number;
  onGoTo: (index: number) => void;
}) {
  const legend = [
    { label: "Answered", swatch: "bg-gray-900" },
    { label: "Not answered", swatch: "border border-gray-300 bg-white" },
    { label: "Flagged", swatch: "bg-amber-500" },
  ];

  return (
    <aside
      aria-label="Question navigator"
      className="self-start rounded-xl border border-gray-200 bg-white p-4 lg:sticky lg:top-24"
    >
      <h2 className="text-sm font-semibold text-gray-900">Questions</h2>
      <p className="mt-0.5 text-xs text-gray-500">
        {answeredCount} of {questions.length} answered
      </p>

      <ol className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
        {questions.map((q, index) => {
          const selected = answers[q.id] ?? [];
          const isAnswered = selected.length > 0;
          const isChecked = mode === "practice" && !!checked[q.id];
          const isRight = isChecked && isCorrect(q, selected);
          const isFlagged = !!flagged[q.id];

          const status = isChecked
            ? isRight
              ? "correct"
              : "incorrect"
            : isAnswered
              ? "answered"
              : "not answered";

          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onGoTo(index)}
                aria-label={`Question ${index + 1}, ${status}${isFlagged ? ", flagged" : ""}`}
                aria-current={index === currentIndex ? "step" : undefined}
                className={cn(
                  "relative h-10 w-full rounded-md border text-sm font-medium tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                  isChecked &&
                    isRight &&
                    "border-green-700 bg-green-700 text-white",
                  isChecked &&
                    !isRight &&
                    "border-red-700 bg-red-700 text-white",
                  !isChecked &&
                    isAnswered &&
                    "border-gray-900 bg-gray-900 text-white",
                  !isChecked &&
                    !isAnswered &&
                    "border-gray-300 bg-white text-gray-600 hover:border-gray-500",
                  index === currentIndex &&
                    "ring-2 ring-brand-600 ring-offset-2",
                )}
              >
                {index + 1}
                {isFlagged && (
                  <span
                    aria-hidden
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className={cn("h-3 w-3 rounded-sm", item.swatch)}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ScoreRing({ percent }: { percent: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          className="stroke-brand-600"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-3xl font-semibold tabular-nums text-gray-900">
        {percent}%
      </span>
    </div>
  );
}

type ReviewFilter = "all" | "incorrect" | "flagged";

function ResultsView({
  exam,
  questions,
  answers,
  flagged,
  mode,
  timedOut,
  onRetake,
  onExit,
}: {
  exam: PracticeExam;
  questions: Question[];
  answers: Record<number, string[]>;
  flagged: Record<number, boolean>;
  mode: Mode;
  timedOut: boolean;
  onRetake: () => void;
  onExit: () => void;
}) {
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const rows = useMemo(
    () =>
      questions.map((question, index) => {
        const selected = answers[question.id] ?? [];
        return {
          question,
          number: index + 1,
          selected,
          correct: isCorrect(question, selected),
          isFlagged: !!flagged[question.id],
        };
      }),
    [questions, answers, flagged],
  );

  const correctCount = rows.filter((r) => r.correct).length;
  const unansweredCount = rows.filter((r) => r.selected.length === 0).length;
  const incorrectCount = rows.length - correctCount - unansweredCount;
  const flaggedCount = rows.filter((r) => r.isFlagged).length;
  // Guard against NaN% if an exam has zero questions.
  const percent = rows.length
    ? Math.round((correctCount / rows.length) * 100)
    : 0;

  // Save the attempt exactly once as soon as results are shown, so it is
  // recorded even if the user retakes, closes the tab, or navigates away.
  // saveExamAttempt also notifies any mounted Attempts view to refresh.
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    const incorrectQuestions: IncorrectQuestion[] = rows
      .filter((r) => !r.correct)
      .map((r) => ({
        id: r.question.id,
        number: r.number,
        question: r.question.question,
        userAnswer: r.selected,
        correctAnswer: r.question.answer,
        explanation: getExplanation(r.question),
      }));

    const reviewQuestions: ReviewQuestion[] = rows.map((r) => ({
      id: r.question.id,
      number: r.number,
      question: r.question.question,
      userAnswer: r.selected,
      correctAnswer: r.question.answer,
      explanation: getExplanation(r.question),
      isCorrect: r.correct,
    }));

    try {
      const saved = saveExamAttempt({
        id: `${exam.id}-${Date.now()}`,
        code: exam.code,
        title: exam.title,
        mode,
        score: percent,
        total: 100,
        date: todayIso(),
        correct: correctCount,
        incorrect: incorrectCount,
        unanswered: unansweredCount,
        incorrectQuestions,
        reviewQuestions,
      });
      if (!saved) console.error("Attempt was not saved (see error above).");
    } catch (e) {
      // Anything thrown before the save, e.g. from todayIso().
      console.error("Failed to prepare attempt:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = rows.filter((r) =>
    filter === "incorrect"
      ? !r.correct
      : filter === "flagged"
        ? r.isFlagged
        : true,
  );

  const filterOptions = [
    { value: "all" as const, label: `All (${rows.length})` },
    {
      value: "incorrect" as const,
      label: `Missed (${rows.length - correctCount})`,
    },
    ...(flaggedCount > 0
      ? [{ value: "flagged" as const, label: `Flagged (${flaggedCount})` }]
      : []),
  ];

  const summary = [
    { label: "Correct", value: correctCount, tone: "text-green-700" },
    { label: "Incorrect", value: incorrectCount, tone: "text-red-700" },
    { label: "Unanswered", value: unansweredCount, tone: "text-gray-700" },
  ];

  return (
    <div>
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {timedOut && (
          <p
            role="alert"
            className="mb-5 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-800"
          >
            Time&apos;s up. Your exam was submitted automatically.
          </p>
        )}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <ScoreRing percent={percent} />

          <div className="flex-1">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-xl font-semibold text-gray-900 outline-none"
            >
              {mode === "real" ? "Exam results" : "Practice results"}
            </h2>
            <p className="mt-1 text-gray-600">
              You answered {correctCount} of {rows.length} questions correctly.
            </p>

            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {summary.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-gray-500">{stat.label}</dt>
                  <dd
                    className={cn(
                      "text-lg font-semibold tabular-nums",
                      stat.tone,
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={onRetake}>Retake exam</Button>
          <Button variant="secondary" onClick={onExit}>
            Back to exams
          </Button>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="review-heading">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="review-heading"
            className="text-lg font-semibold text-gray-900"
          >
            Review your answers
          </h2>
          <Segmented
            label="Show"
            options={filterOptions}
            value={filter}
            onChange={setFilter}
          />
        </div>

        {visible.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
            {filter === "incorrect"
              ? "You got every question right."
              : "Nothing to show here."}
          </p>
        ) : (
          <ol className="mt-4 space-y-5">
            {visible.map(
              ({ question, number, selected, correct, isFlagged }) => {
                const explanation = getExplanation(question);
                const status = correct
                  ? "Correct"
                  : selected.length
                    ? "Incorrect"
                    : "Unanswered";

                return (
                  <li
                    key={question.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium leading-relaxed text-gray-900">
                        <span className="text-gray-500">{number}.</span>{" "}
                        {question.question}
                      </p>
                      <div className="flex shrink-0 items-center gap-3">
                        {isFlagged && (
                          <Flag
                            className="h-4 w-4 text-amber-600"
                            fill="currentColor"
                            aria-label="Flagged"
                          />
                        )}
                        <span
                          className={cn(
                            "flex items-center gap-1 text-sm font-semibold",
                            correct ? "text-green-700" : "text-red-700",
                          )}
                        >
                          {correct ? (
                            <Check className="h-4 w-4" aria-hidden />
                          ) : (
                            <X className="h-4 w-4" aria-hidden />
                          )}
                          {status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <OptionsReview question={question} selected={selected} />
                    </div>

                    {explanation && (
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">
                        <span className="font-medium text-gray-900">Why: </span>
                        {explanation}
                      </p>
                    )}
                  </li>
                );
              },
            )}
          </ol>
        )}
      </section>
    </div>
  );
}

function ExamSession({
  exam,
  mode,
  onExit,
  onRetake,
}: {
  exam: PracticeExam;
  mode: Mode;
  onExit: () => void;
  onRetake: () => void;
}) {
  const session = useExamSession(exam, mode);
  const [dialog, setDialog] = useState<"exit" | "submit" | null>(null);
  const {
    state,
    questions,
    question,
    secondsLeft,
    answeredCount,
    unansweredCount,
    flaggedCount,
  } = session;

  const handleExit = () => (state.submitted ? onExit() : setDialog("exit"));

  const handleFinish = () => {
    // Real exams always confirm; practice only confirms if something was skipped.
    if (mode === "real" || unansweredCount > 0) setDialog("submit");
    else session.submit();
  };

  const confirmSubmit = () => {
    setDialog(null);
    session.submit();
  };

  const submitSummary = [
    `You've answered ${answeredCount} of ${questions.length} questions.`,
    unansweredCount > 0 &&
      `${unansweredCount} unanswered will count as incorrect.`,
    flaggedCount > 0 && `${flaggedCount} still flagged for review.`,
    mode === "real" && "You can't change your answers after submitting.",
  ]
    .filter(Boolean)
    .join(" ");

  const progress = state.submitted ? questions.length : answeredCount;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 pb-12">
      {/* Sticky status bar: always shows where you are and how much time is left */}
      <div className="sticky top-0 z-10 -mx-5 border-b border-gray-200 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="link" onClick={handleExit}>
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Exit
            </Button>
            <span className="truncate text-sm font-semibold text-gray-900">
              {exam.code}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                mode === "practice"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-900 text-white",
              )}
            >
              {mode === "practice" ? "Practice" : "Real exam"}
            </span>
          </div>

          {!state.submitted && secondsLeft !== null && (
            <span
              role="timer"
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold tabular-nums",
                secondsLeft <= LOW_TIME_SECONDS
                  ? "text-red-700"
                  : "text-gray-900",
              )}
            >
              <Clock className="h-4 w-4" aria-hidden />
              {formatTime(secondsLeft)}
            </span>
          )}
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-label="Questions answered"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={progress}
        >
          <div
            className="h-full bg-brand-600 transition-all"
            style={{ width: `${(progress / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="py-6 text-2xl font-semibold text-gray-900">
        {exam.title}
      </h1>

      {state.submitted ? (
        <ResultsView
          exam={exam}
          questions={questions}
          answers={state.answers}
          flagged={state.flagged}
          mode={mode}
          timedOut={state.timedOut}
          onRetake={onRetake}
          onExit={onExit}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
          <QuestionView
            question={question}
            number={state.index + 1}
            total={questions.length}
            mode={mode}
            selected={state.answers[question.id] ?? []}
            checked={mode === "practice" && !!state.checked[question.id]}
            flagged={!!state.flagged[question.id]}
            onSelect={session.select}
            onCheck={session.check}
            onToggleFlag={session.toggleFlag}
            onPrev={session.prev}
            onNext={session.next}
            onFinish={handleFinish}
          />
          <QuestionNavigator
            questions={questions}
            answers={state.answers}
            flagged={state.flagged}
            checked={state.checked}
            currentIndex={state.index}
            mode={mode}
            answeredCount={answeredCount}
            onGoTo={session.goTo}
          />
        </div>
      )}

      {dialog === "exit" && (
        <ConfirmDialog
          title="Leave this exam?"
          description="Your answers and progress will be lost."
          confirmLabel="Leave exam"
          cancelLabel="Stay"
          onConfirm={onExit}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === "submit" && (
        <ConfirmDialog
          title={
            mode === "real" ? "Submit your exam?" : "Finish this practice run?"
          }
          description={submitSummary}
          confirmLabel={mode === "real" ? "Submit exam" : "Finish"}
          onConfirm={confirmSubmit}
          onCancel={() => setDialog(null)}
        />
      )}
    </main>
  );
}

function ExamCard({
  exam,
  onStart,
}: {
  exam: PracticeExam;
  onStart: (exam: PracticeExam) => void;
}) {
  const isAvailable = !!exam.questions?.length;
  const stats = [
    { label: "questions", value: exam.items },
    { label: "minutes", value: exam.timeCap },
    { label: "to pass", value: exam.targetPass },
    { label: "max score", value: exam.maxScore },
  ];

  return (
    <li className="grid gap-5 py-8 md:grid-cols-[10rem_1fr_11rem] md:gap-10">
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
          {stats.map((stat) => (
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
            {exam.domains.join(", ")}
          </p>
        )}
      </div>

      {/* Action */}
      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-start">
        <p
          className={cn(
            "flex items-center gap-1.5 text-sm font-medium",
            exam.access === "Free" ? "text-green-700" : "text-gray-700",
          )}
        >
          {exam.access === "Pro" && (
            <Lock className="h-3.5 w-3.5" aria-hidden />
          )}
          {exam.access === "Free" ? "Free" : "Pro plan"}
        </p>
        <Button onClick={() => onStart(exam)} disabled={!isAvailable}>
          {isAvailable ? "Start exam" : "Coming soon"}
        </Button>
      </div>
    </li>
  );
}


type ActiveSession = { exam: PracticeExam; mode: Mode; attempt: number };

export default function PracticeExamsPage() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [access, setAccess] = useState<(typeof ACCESS)[number]>("All");
  const [pendingExam, setPendingExam] = useState<PracticeExam | null>(null);
  const [session, setSession] = useState<ActiveSession | null>(null);

  const filtered = practiceExams.filter(
    (exam) =>
      (level === "All" || exam.level === level) &&
      (access === "All" || exam.access === access),
  );
  const isFiltered = level !== "All" || access !== "All";

  const resetFilters = () => {
    setLevel("All");
    setAccess("All");
  };

  if (session) {
    return (
      <ExamSession
        // Changing `attempt` remounts the session, which resets all exam state for a retake.
        key={session.attempt}
        exam={session.exam}
        mode={session.mode}
        onExit={() => setSession(null)}
        onRetake={() =>
          setSession({ ...session, attempt: session.attempt + 1 })
        }
      />
    );
  }

  const stats = [
    { label: "exams available", value: practiceExams.length },
    { label: "average pass rate", value: "84%" },
  ];

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
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-sm text-gray-500">{stat.label}</dt>
              <dd className="text-2xl font-semibold tabular-nums text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-gray-200 py-3">
        <Segmented
          label="Level"
          options={toOptions(LEVELS)}
          value={level}
          onChange={setLevel}
        />
        <Segmented
          label="Access"
          options={toOptions(ACCESS)}
          value={access}
          onChange={setAccess}
        />

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          <span aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "exam" : "exams"}
          </span>
          {isFiltered && (
            <Button variant="link" onClick={resetFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Exam list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-medium text-gray-900">
            No exams match these filters.
          </p>
          <Button variant="link" onClick={resetFilters} className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onStart={setPendingExam} />
          ))}
        </ul>
      )}

      {pendingExam && (
        <ModeDialog
          exam={pendingExam}
          onClose={() => setPendingExam(null)}
          onSelect={(mode) => {
            setSession({ exam: pendingExam, mode, attempt: 0 });
            setPendingExam(null);
          }}
        />
      )}
    </div>
  );
}