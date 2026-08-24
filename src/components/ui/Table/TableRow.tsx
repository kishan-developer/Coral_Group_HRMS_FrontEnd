import { cn } from '@/lib/utils';

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function TableRow({ children, className, onClick, hover = true }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        hover && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </tr>
  );
}
