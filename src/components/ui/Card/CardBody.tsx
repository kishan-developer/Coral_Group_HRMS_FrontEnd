import { cn } from '@/lib/utils';

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}
