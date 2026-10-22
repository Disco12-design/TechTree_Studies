import { todayIso, parseIso, daysBetween, isIsoDate } from "./dates";

export const PROFILE_STORAGE_KEY = "profile-settings:v1";
export const STREAK_STORAGE_KEY = "study-streak:v1";
export const EXAM_ATTEMPTS_STORAGE_KEY = "exam-attempts:v1";
export const ATTEMPTS_UPDATED_EVENT = "exam-attempts-updated";

export type StreakData = { lastVisit: string; count: number };
export type SavedProfile = { name: string | null; avatar: string | null };

export type IncorrectQuestion = {
  id: number;
  number?: number;
  question: string;
  userAnswer: string[];
  correctAnswer: string[];
  explanation?: string;
};

// Every question in an attempt, so the Attempts page can filter by outcome.
export type ReviewQuestion = IncorrectQuestion & { isCorrect: boolean };

export type ExamAttempt = {
  id: string;
  code: string;
  title: string;
  mode: "practice" | "real";
  score: number;
  total: number;
  date: string;
  correct: number;
  incorrect: number;
  unanswered: number;
  incorrectQuestions?: IncorrectQuestion[];
  reviewQuestions?: ReviewQuestion[];
};

const EMPTY_PROFILE: SavedProfile = { name: null, avatar: null };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeIncorrectQuestion(value: unknown): IncorrectQuestion | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "number" ||
    !Number.isInteger(value.id) ||
    typeof value.question !== "string" ||
    !isStringArray(value.userAnswer) ||
    !isStringArray(value.correctAnswer)
  ) {
    return null;
  }

  return {
    id: value.id,
    ...(typeof value.number === "number" &&
    Number.isInteger(value.number) &&
    value.number > 0
      ? { number: value.number }
      : {}),
    question: value.question,
    userAnswer: value.userAnswer,
    correctAnswer: value.correctAnswer,
    ...(typeof value.explanation === "string"
      ? { explanation: value.explanation }
      : {}),
  };
}

function normalizeExamAttempt(value: unknown): ExamAttempt | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.code !== "string" ||
    typeof value.title !== "string" ||
    (value.mode !== "practice" && value.mode !== "real") ||
    typeof value.score !== "number" ||
    !Number.isFinite(value.score) ||
    typeof value.total !== "number" ||
    !Number.isFinite(value.total) ||
    typeof value.date !== "string" ||
    !isIsoDate(value.date) ||
    typeof value.correct !== "number" ||
    !Number.isInteger(value.correct) ||
    typeof value.incorrect !== "number" ||
    !Number.isInteger(value.incorrect) ||
    typeof value.unanswered !== "number" ||
    !Number.isInteger(value.unanswered)
  ) {
    return null;
  }

  const incorrectQuestions = Array.isArray(value.incorrectQuestions)
    ? value.incorrectQuestions
        .map(normalizeIncorrectQuestion)
        .filter((question): question is IncorrectQuestion => question !== null)
    : undefined;

  const reviewQuestions = Array.isArray(value.reviewQuestions)
    ? value.reviewQuestions.flatMap((item): ReviewQuestion[] => {
        const base = normalizeIncorrectQuestion(item);
        return base && isRecord(item) && typeof item.isCorrect === "boolean"
          ? [{ ...base, isCorrect: item.isCorrect }]
          : [];
      })
    : undefined;

  return {
    id: value.id,
    code: value.code,
    title: value.title,
    mode: value.mode,
    score: value.score,
    total: value.total,
    date: value.date,
    correct: value.correct,
    incorrect: value.incorrect,
    unanswered: value.unanswered,
    ...(incorrectQuestions ? { incorrectQuestions } : {}),
    ...(reviewQuestions ? { reviewQuestions } : {}),
  };
}

export function loadSavedProfile(): SavedProfile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const data = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? "null");
    const name = data?.form?.name;
    const avatar = data?.avatarDataUrl;
    return {
      name: typeof name === "string" && name.trim() ? name.trim() : null,
      avatar: typeof avatar === "string" ? avatar : null,
    };
  } catch {
    return EMPTY_PROFILE;
  }
}

function readStreak(): StreakData | null {
  if (typeof window === "undefined") return null;
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(STREAK_STORAGE_KEY) ?? "null",
    );
    if (
      !isRecord(saved) ||
      typeof saved.lastVisit !== "string" ||
      !isIsoDate(saved.lastVisit) ||
      typeof saved.count !== "number" ||
      !Number.isInteger(saved.count) ||
      saved.count < 1
    ) {
      return null;
    }
    return { lastVisit: saved.lastVisit, count: saved.count };
  } catch {
    return null;
  }
}

export function loadAndUpdateStreak(): number {
  const today = todayIso();
  const saved = readStreak();

  if (saved?.lastVisit === today) return saved.count;

  const isConsecutive =
    saved && daysBetween(parseIso(saved.lastVisit), parseIso(today)) === 1;
  const count = isConsecutive ? saved.count + 1 : 1; // grow if consecutive, else reset

  try {
    localStorage.setItem(
      STREAK_STORAGE_KEY,
      JSON.stringify({ lastVisit: today, count }),
    );
  } catch (e) {
    console.error("Failed to save streak:", e);
  }
  return count;
}

export function loadExamAttempts(): ExamAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(EXAM_ATTEMPTS_STORAGE_KEY) ?? "[]",
    );
    if (!Array.isArray(parsed)) {
      console.error("Saved attempts are not a valid list.");
      return [];
    }

    const attempts = parsed
      .map(normalizeExamAttempt)
      .filter((attempt): attempt is ExamAttempt => attempt !== null);
    if (attempts.length !== parsed.length) {
      console.error("Some saved attempts were invalid and could not be loaded.");
    }
    return attempts;
  } catch (e) {
    console.error("Failed to load attempts:", e);
    return [];
  }
}

/** Returns true if the attempt was stored, false if it failed. */
export function saveExamAttempt(attempt: ExamAttempt): boolean {
  if (typeof window === "undefined") return false;
  try {
    const attempts = loadExamAttempts();
    attempts.push(attempt);
    localStorage.setItem(EXAM_ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    window.dispatchEvent(new Event(ATTEMPTS_UPDATED_EVENT));
    return true;
  } catch (e) {
    console.error("Failed to save exam attempt:", e);
    return false;
  }
}