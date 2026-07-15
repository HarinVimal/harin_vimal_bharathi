import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts with twMerge.
 * This is the canonical cn() utility for the project.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string for display (e.g. "March 2025" → "Mar 2025")
 */
export function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const parts = dateStr.split(" ");
  if (parts.length === 2) {
    const month = new Date(`${parts[0]} 1, ${parts[1]}`);
    return isNaN(month.getTime())
      ? dateStr
      : month.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  return dateStr;
}

/**
 * Calculate duration between two date strings (inclusive of current month).
 */
export function calculateDuration(start: string, end: string): string {
  const parseDate = (str: string): Date => {
    if (str === "Present") return new Date();
    const parts = str.split(" ");
    return new Date(`${parts[0]} 1, ${parts[1]}`);
  };

  const startDate = parseDate(start);
  const endDate = parseDate(end);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remainingMonths > 0) parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);

  return parts.join(" ") || "< 1 mo";
}

/**
 * Slugify a string for URL usage.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
