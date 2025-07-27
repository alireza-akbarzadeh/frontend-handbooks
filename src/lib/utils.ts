import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extract headings from HTML docs for table of docss
 */
export function extractHeadings(html: string) {
  const headingRegex = /<h([2-6])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    // Remove HTML tags from heading text
    const text = match[3].replace(/<[^>]*>/g, '');

    headings.push({ level, id, text });
  }

  return headings;
}