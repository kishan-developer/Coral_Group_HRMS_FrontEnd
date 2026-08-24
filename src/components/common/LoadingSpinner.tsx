import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ label = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3 min-h-[40vh] font-sans">
      <div
        className={`animate-spin rounded-full border-[#94cb3d] border-t-transparent ${sizes[size]}`}
      />
      {label && <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>}
    </div>
  );
}

export default LoadingSpinner;
