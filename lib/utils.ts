import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique ID
 * @returns A unique string ID
 */
export function generateId(): string {
  // Generate a more unique ID with timestamp and multiple random parts
  const timestamp = Date.now().toString(36);
  const randomPart1 = Math.random().toString(36).substring(2, 10); // 8 chars
  const randomPart2 = Math.random().toString(36).substring(2, 10); // 8 chars
  const randomPart3 = Math.random().toString(36).substring(2, 10); // 8 chars
  return `${timestamp}-${randomPart1}${randomPart2}${randomPart3}`;
}
