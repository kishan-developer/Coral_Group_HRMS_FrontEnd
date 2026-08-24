'use client';

import React from 'react';
import { Eye, Edit3, Ban, ShieldCheck, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onBlock?: () => void;
  onDelete?: () => void;
  isBlocked?: boolean;
  viewLabel?: string;
  editLabel?: string;
  blockLabel?: string;
  deleteLabel?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ActionButtons({
  onView,
  onEdit,
  onBlock,
  onDelete,
  isBlocked = false,
  viewLabel = 'View Details',
  editLabel = 'Edit Record',
  blockLabel,
  deleteLabel = 'Delete Record',
  className,
  size = 'md',
}: ActionButtonsProps) {
  const dynamicBlockLabel = blockLabel || (isBlocked ? 'Unblock User' : 'Block User');

  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center gap-1.5 font-sans', className)}>
      {/* 1. View Action */}
      {onView && (
        <div className="relative group/tooltip">
          <button
            type="button"
            onClick={onView}
            aria-label={viewLabel}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-900/50 transition-all shadow-2xs font-medium',
              sizeClasses[size]
            )}
          >
            <Eye className={iconSizes[size]} />
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex items-center justify-center px-2 py-1 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md shadow-md whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            {viewLabel}
          </span>
        </div>
      )}

      {/* 2. Edit Action */}
      {onEdit && (
        <div className="relative group/tooltip">
          <button
            type="button"
            onClick={onEdit}
            aria-label={editLabel}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-[#94cb3d]/15 hover:text-[#94cb3d] hover:border-[#94cb3d]/40 dark:hover:bg-[#94cb3d]/20 dark:hover:text-[#a6dd49] transition-all shadow-2xs font-medium',
              sizeClasses[size]
            )}
          >
            <Edit3 className={iconSizes[size]} />
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex items-center justify-center px-2 py-1 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md shadow-md whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            {editLabel}
          </span>
        </div>
      )}

      {/* 3. Block / Unblock Action */}
      {onBlock && (
        <div className="relative group/tooltip">
          <button
            type="button"
            onClick={onBlock}
            aria-label={dynamicBlockLabel}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 dark:hover:border-amber-900/50 transition-all shadow-2xs font-medium',
              sizeClasses[size]
            )}
          >
            {isBlocked ? (
              <ShieldCheck className={iconSizes[size]} />
            ) : (
              <Ban className={iconSizes[size]} />
            )}
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex items-center justify-center px-2 py-1 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md shadow-md whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            {dynamicBlockLabel}
          </span>
        </div>
      )}

      {/* 4. Delete Action */}
      {onDelete && (
        <div className="relative group/tooltip">
          <button
            type="button"
            onClick={onDelete}
            aria-label={deleteLabel}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/40 dark:hover:text-red-400 dark:hover:border-red-900/50 transition-all shadow-2xs font-medium',
              sizeClasses[size]
            )}
          >
            <Trash2 className={iconSizes[size]} />
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex items-center justify-center px-2 py-1 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md shadow-md whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            {deleteLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
