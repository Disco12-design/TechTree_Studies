
export function parseIso(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return new Date(Number.NaN);

  const [, year, month, day] = match;
  const parsed = new Date(0);
  parsed.setFullYear(Number(year), Number(month) - 1, Number(day));
  parsed.setHours(0, 0, 0, 0);

  if (
    parsed.getFullYear() !== Number(year) ||
    parsed.getMonth() !== Number(month) - 1 ||
    parsed.getDate() !== Number(day)
  ) {
    return new Date(Number.NaN);
  }
  return parsed;
}

export function isIsoDate(iso: string): boolean {
  return !Number.isNaN(parseIso(iso).getTime());
}

export function daysBetween(from: Date, to: Date): number {
  const toDayNumber = (date: Date) => {
    const utcDate = new Date(0);
    utcDate.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return utcDate.getTime() / 86_400_000;
  };
  const fromDay = toDayNumber(from);
  const toDay = toDayNumber(to);
  return Math.round(toDay - fromDay);
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(iso: string): number {
  const target = parseIso(iso);
  if (Number.isNaN(target.getTime())) return Number.NaN;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return daysBetween(today, target);
}

export function formatLongDate(iso: string): string {
  const parsed = parseIso(iso);
  if (Number.isNaN(parsed.getTime())) return "Invalid date";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function countdownLabel(days: number): string {
  if (!Number.isFinite(days)) return "Invalid date";
  if (days === 0) return "Exam day is today";
  if (days === 1) return "1 day to go";
  if (days > 1) return `${days} days to go`;
  return "This date has passed";
}
