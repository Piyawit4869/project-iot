import { clsx, type ClassValue } from "clsx";
import { validate, version } from "uuid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUUIDv4(str: string): boolean {
  return validate(str) && version(str) === 4;
}
