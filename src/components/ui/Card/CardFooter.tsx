import { cn } from '@/lib/utils';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-zinc-200 dark:border-zinc-800', className)}>
      {children}
    </div>
  );
}
