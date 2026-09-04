'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { User, Briefcase, Code, ShieldCheck, Zap, Palette, Laptop, Activity } from 'lucide-react';

export const DEFAULT_AVATAR_ICONS = [
  { id: 'executive', icon: Briefcase, label: 'Executive', color: 'bg-emerald-500/15 text-emerald-600' },
  { id: 'manager', icon: User, label: 'Manager', color: 'bg-blue-500/15 text-blue-600' },
  { id: 'tech_lead', icon: Code, label: 'Tech Lead', color: 'bg-purple-500/15 text-purple-600' },
  { id: 'developer', icon: Laptop, label: 'Developer', color: 'bg-indigo-500/15 text-indigo-600' },
  { id: 'analyst', icon: Zap, label: 'Analyst', color: 'bg-amber-500/15 text-amber-600' },
  { id: 'designer', icon: Palette, label: 'Designer', color: 'bg-rose-500/15 text-rose-600' },
  { id: 'admin', icon: ShieldCheck, label: 'Admin', color: 'bg-[#94cb3d]/20 text-[#94cb3d]' },
];

export interface AvatarPickerProps {
  selectedAvatar?: string;
  onSelectAvatar: (iconId: string) => void;
  className?: string;
}

export function AvatarPicker({
  selectedAvatar = 'executive',
  onSelectAvatar,
  className,
}: AvatarPickerProps) {
  return (
    <div className={cn('space-y-3 font-sans', className)}>
      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
        Select Profile Badge Icon
      </label>
      <div className="flex flex-wrap gap-2.5">
        {DEFAULT_AVATAR_ICONS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedAvatar === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectAvatar(item.id)}
              title={item.label}
              className={cn(
                'h-10 px-3 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border select-none',
                item.color,
                isSelected
                  ? 'border-[#94cb3d] ring-2 ring-[#94cb3d]/40 scale-105 shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-[#94cb3d]/50'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AvatarPicker;
