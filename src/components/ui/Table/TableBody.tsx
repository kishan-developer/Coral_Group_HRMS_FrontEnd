import { cn } from '@/lib/utils';

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn('divide-y divide-zinc-200 dark:divide-zinc-800', className)}>{children}</tbody>;
}
