import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function Input({ label, error, helper, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50 transition-colors',
          error
            ? 'border-red-300 focus:border-red-500 dark:border-red-700'
            : 'border-zinc-300 focus:border-[#94cb3d] dark:border-zinc-700 dark:focus:border-[#94cb3d]',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {helper && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helper}</p>}
    </div>
  );
}
