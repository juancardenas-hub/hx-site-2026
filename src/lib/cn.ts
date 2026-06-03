import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names with clsx + tailwind-merge.
 * Use everywhere instead of template strings to avoid conflict bugs.
 *
 * @example
 *   <div className={cn('px-4', isActive && 'bg-hx-lime', className)} />
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
