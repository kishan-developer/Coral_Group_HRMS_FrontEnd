import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  className?: string;
}

export default function Alert({ type = 'info', title, message, dismissible = false, className }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  };

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertCircle,
  };

  const Icon = icons[type];

  return (
    <div className={cn('flex items-start gap-3 rounded-lg border p-4', styles[type], className)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <p className={cn('text-sm', title && 'mt-1')}>{message}</p>
      </div>
      {dismissible && (
        <button type="button" onClick={() => setDismissed(true)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
