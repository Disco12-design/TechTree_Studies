
export function parseIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(iso: string): number {
  const target = parseIso(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return daysBetween(today, target);
}

export function formatLongDate(iso: string): string {
  return parseIso(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function countdownLabel(days: number): string {
  if (days === 0) return "Exam day is today";
  if (days === 1) return "1 day to go";
  if (days > 1) return `${days} days to go`;
  return "This date has passed";
}

