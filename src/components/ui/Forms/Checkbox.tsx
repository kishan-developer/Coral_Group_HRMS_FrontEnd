import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]/50 dark:border-zinc-600 dark:bg-zinc-800"
        {...props}
      />
      {label && <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>}
    </label>
  );
}
