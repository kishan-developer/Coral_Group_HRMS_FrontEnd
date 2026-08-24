import { cn } from '@/lib/utils';

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableHead({ children, className }: TableHeadProps) {
  return (
    <thead className={cn('bg-zinc-50 dark:bg-zinc-800 text-xs uppercase text-zinc-500 dark:text-zinc-400', className)}>
      {children}
    </thead>
  );
}
