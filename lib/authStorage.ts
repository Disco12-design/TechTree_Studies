// Simple auth storage - stores user data in browser localStorage

const USER_STORAGE_KEY = "techtree_user";

export interface User {
  id: string;
  email: string;
  name: string;
}

// Save user to localStorage after login/signup
export function saveUser(user: User): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

// Get current logged-in user
export function getUser(): User | null {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return getUser() !== null;
}

// Logout - remove user from localStorage
export function logout(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
}

// Simple password validation
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

// Simple email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
