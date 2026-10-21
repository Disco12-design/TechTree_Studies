import { todayIso, parseIso, daysBetween } from "./dates";

export const PROFILE_STORAGE_KEY = "profile-settings:v1";
export const STREAK_STORAGE_KEY = "study-streak:v1";
export const EXAM_ATTEMPTS_STORAGE_KEY = "exam-attempts:v1";

export type StreakData = { lastVisit: string; count: number };
export type SavedProfile = { name: string | null; avatar: string | null };

export type IncorrectQuestion = {
  id: number;
  question: string;
  userAnswer: string[];
  correctAnswer: string[];
  explanation?: string;
};

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
};

const EMPTY_PROFILE: SavedProfile = { name: null, avatar: null };

export function loadSavedProfile(): SavedProfile {
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
  try {
    return JSON.parse(localStorage.getItem(STREAK_STORAGE_KEY) ?? "null");
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

  localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify({ lastVisit: today, count }));
  return count;
}

export function saveExamAttempt(attempt: ExamAttempt): void {
  try {
    const attempts = loadExamAttempts();
    attempts.push(attempt);
    localStorage.setItem(EXAM_ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    console.log("✅ Exam attempt saved:", attempt);
    console.log("📊 Total attempts:", attempts.length);
  } catch (e) {
    console.error("❌ Failed to save exam attempt:", e);
  }
}

export function loadExamAttempts(): ExamAttempt[] {
  try {
    const data = localStorage.getItem(EXAM_ATTEMPTS_STORAGE_KEY);
    const attempts = JSON.parse(data ?? "[]");
    console.log("📥 Loaded attempts from localStorage:", attempts);
    return attempts;
  } catch (e) {
    console.error("❌ Failed to load attempts:", e);
    return [];
  }
}