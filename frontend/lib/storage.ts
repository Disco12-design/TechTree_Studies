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
