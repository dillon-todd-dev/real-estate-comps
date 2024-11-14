import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string) => {
  const firstLetter = str.charAt(0);
  const remainingLetters = str.slice(1);
  return firstLetter.toUpperCase() + remainingLetters;
};
