import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function cn(...classes: string[]): string {
  return twMerge(clsx(classes))
}