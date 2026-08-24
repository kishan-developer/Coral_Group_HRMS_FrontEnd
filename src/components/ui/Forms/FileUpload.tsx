import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  className?: string;
}

export default function FileUpload({ label, accept, multiple, onChange, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-6 py-8 hover:border-[#94cb3d] transition-colors"
      >
        <Upload className="h-8 w-8 text-zinc-400" />
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Click to upload or drag and drop</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">PDF, PNG, JPG up to 10MB</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => onChange?.(e.target.files)}
      />
    </div>
  );
}
