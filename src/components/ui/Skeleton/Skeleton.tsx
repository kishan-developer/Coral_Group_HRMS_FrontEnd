import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  circle?: boolean;
}

export default function Skeleton({ className, circle }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-200 dark:bg-zinc-800',
        circle && 'rounded-full',
        !circle && 'rounded-md',
        className
      )}
    />
  );
}
