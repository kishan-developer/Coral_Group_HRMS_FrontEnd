import { cn } from '@/lib/utils';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export default function TableCell({ children, className, colSpan }: TableCellProps) {
  return (
    <td colSpan={colSpan} className={cn('px-4 py-3 text-zinc-700 dark:text-zinc-300', className)}>
      {children}
    </td>
  );
}
