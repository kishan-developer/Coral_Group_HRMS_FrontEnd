import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actionText?: string;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
}

export function PageHeader({
  title,
  description,
  badge,
  actionText,
  actionIcon,
  onActionClick,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm font-sans">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h1>
          {badge && <Badge variant="brand">{badge}</Badge>}
        </div>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
        )}
      </div>

      {actionText && (
        <Button
          onClick={onActionClick}
          variant="primary"
          size="md"
          className="shrink-0 shadow-md shadow-[#94cb3d]/20"
        >
          {actionIcon}
          <span>{actionText}</span>
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
