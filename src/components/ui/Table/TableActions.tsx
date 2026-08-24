import { Edit, Eye, Trash2 } from 'lucide-react';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TableActions({ onView, onEdit, onDelete }: TableActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <button type="button" onClick={onView} className="p-1.5 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="View">
          <Eye className="h-4 w-4" />
        </button>
      )}
      {onEdit && (
        <button type="button" onClick={onEdit} className="p-1.5 rounded-md text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors" title="Edit">
          <Edit className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button type="button" onClick={onDelete} className="p-1.5 rounded-md text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
