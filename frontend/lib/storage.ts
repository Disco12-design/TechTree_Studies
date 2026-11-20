import { todayIso, parseIso, daysBetween, isIsoDate } from "./dates";

export const STREAK_STORAGE_KEY = "study-streak:v1";

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
