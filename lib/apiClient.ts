"use client";

/**
 * API Client for backend communication
 * Handles all HTTP requests to backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Make API request with user context
 */
async function apiCall(
  endpoint: string,
  userId: string | null,
  options: RequestInit = {}
) {
  if (!userId) {
    throw new Error("User ID required for API calls");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * User API endpoints
 */
export const userAPI = {
  /**
   * Get user profile
   */
  getProfile: (userId: string) => 
    apiCall("/api/user/profile", userId),

  /**
   * Get user's exam attempts
   */
  getExamAttempts: (userId: string) =>
    apiCall("/api/user/exam-attempts", userId),

  /**
   * Submit new exam attempt
   */
  createExamAttempt: (userId: string, data: {
    examName: string;
    examNumber: string;
    score: number;
    maxScore?: number;
    duration?: number;
    questions?: any[];
  }) =>
    apiCall("/api/user/exam-attempts", userId, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /**
   * Get user performance metrics
   */
  getMetrics: (userId: string) =>
    apiCall("/api/user/metrics", userId),
};

/**
 * Questions API endpoints
 */
export const questionsAPI = {
  /**
   * Get practice questions for exam type
   */
  getQuestions: (userId: string, examType: string, limit = 10) =>
    apiCall(`/api/questions?examType=${examType}&limit=${limit}`, userId),
};

/**
 * Health check endpoints
 */
export const healthAPI = {
  checkBackend: () => 
    fetch(`${API_URL}/health`).then(r => r.json()),

  checkFirebase: () =>
    fetch(`${API_URL}/api/firebase-status`).then(r => r.json()),
};
