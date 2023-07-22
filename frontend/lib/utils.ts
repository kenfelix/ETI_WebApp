import { type ClassValue, clsx } from "clsx"
import { usePathname } from "next/navigation"

import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPathName = (): string[] => {
  const pathnames = usePathname().split('/')
  if (pathnames.length > 0 && pathnames[0] === '') {
    pathnames[0] = 'home';
  }
  return pathnames
}


export function toTitleCase(str: string): string {
  return str.replace(/\b\w+/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
