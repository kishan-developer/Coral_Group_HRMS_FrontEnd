import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'brand' | 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
}

export function Badge({ className, variant = 'brand', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:ring-offset-2';

  const variants = {
    brand: 'bg-[#94cb3d]/15 text-[#94cb3d] border border-[#94cb3d]/30 dark:bg-[#94cb3d]/20 dark:text-[#a6dd49]',
    default: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900',
    secondary: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
    outline: 'border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    destructive: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}
