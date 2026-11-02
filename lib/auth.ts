const SESSION_STORAGE_KEY = "techtree-auth-session:v1";

export type AuthSession = {
  name: string;
  email: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);
  if (
    !isRecord(parsed) ||
    typeof parsed.name !== "string" ||
    typeof parsed.email !== "string"
  ) {
    throw new Error("Your demo session could not be read. Please sign in again.");
  }
  return { name: parsed.name, email: parsed.email };
}

export function signOutDemoAccount(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
