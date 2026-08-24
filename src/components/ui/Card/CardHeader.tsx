import { cn } from '@/lib/utils';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-zinc-200 dark:border-zinc-800', className)}>
      {children}
    </div>
  );
}
