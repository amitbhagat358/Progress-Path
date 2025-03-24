import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToStandard = (dateStr: string | null): string => {
  if (dateStr === null) {
    return "";
  }
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDateToYYYYMMDD = (date: Date | undefined) => {
  if (!date) return "";
  const d = date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isValidDateFormat = (dateStr: string | null): boolean => {
  if (!dateStr) {
    return false;
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    return false;
  }
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const getPrevAndNextDate = (date: string) => {
  if (!isValidDateFormat(date)) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }

  const dateInISO = new Date(date);

  const prevDate = new Date(dateInISO);
  const nextDate = new Date(dateInISO);

  prevDate.setDate(dateInISO.getDate() - 1);
  nextDate.setDate(dateInISO.getDate() + 1);

  return {
    previousDate: prevDate.toISOString().split("T")[0].trim(), // Format: YYYY-MM-DD
    nextDate: nextDate.toISOString().split("T")[0].trim(), // Format: YYYY-MM-DD
  };
};

export const wait = (second: number) =>
  new Promise((res) => setTimeout(res, second * 1000));
