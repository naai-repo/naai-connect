import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyConverter(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(val);
}
export function formateDateToString(date: string | Date) {
  let d = new Date();
  if (typeof date === "string") d = new Date(date);
  if (typeof date === "object") d = date;
  return d.toISOString();
}

export function removeTimeZoneOffsetToDate(date: string | Date) {
  let d = new Date();
  if (typeof date === "string") d = new Date(date);
  if (typeof date === "object") d = date;
  return new Date(d);
}

export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export function formatDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };
  let dateFormate = new Date(date);
  return dateFormate.toLocaleDateString("en-US", options);
}

export const formatTimeTo12Hour = (time: string) => {
  const [hours, minutes] = time?.split(":").map(Number);
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")}`;
};

export function hashString(input: string, secret: number): string {
  return input
    .split("")
    .map((char, i) => {
      const charCode = char.charCodeAt(0) + secret + i;
      return String.fromCharCode(charCode);
    })
    .join("");
}

export function dehash(input: string, secret: number): string {
  return input
    .split("")
    .map((char, i) => {
      const charCode = char.charCodeAt(0) - secret - i;
      return String.fromCharCode(charCode);
    })
    .join("");
}

export const Dummy = {
  artist:"000000000000000000000000",
}