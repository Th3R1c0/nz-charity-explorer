import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000000) {
    return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 1 }).format(value / 1000000000) + 'B';
  }
  if (Math.abs(value) >= 1000000) {
    return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 1 }).format(value / 1000000) + 'M';
  }
  return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-NZ').format(value);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
