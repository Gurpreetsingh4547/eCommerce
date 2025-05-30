import { type ClassValue, clsx } from 'clsx'; import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Theme = "dark" | "light" | "system";

export function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
