'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const DEFAULT_AVATAR_EMOJIS = [
  { id: 'business_man', emoji: '👨‍💼', label: 'Executive' },
  { id: 'business_woman', emoji: '👩‍💼', label: 'Manager' },
  { id: 'tech_lead', emoji: '🧑‍💻', label: 'Tech Lead' },
  { id: 'dev_man', emoji: '👨‍💻', label: 'Developer' },
  { id: 'dev_woman', emoji: '👩‍💻', label: 'Engineer' },
  { id: 'scientist_man', emoji: '👨‍🔬', label: 'Data Lead' },
  { id: 'scientist_woman', emoji: '👩‍🔬', label: 'Analyst' },
  { id: 'designer_man', emoji: '👨‍🎨', label: 'UI Designer' },
  { id: 'designer_woman', emoji: '👩‍🎨', label: 'UX Lead' },
  { id: 'default_user', emoji: '👤', label: 'Member' },
];

export interface AvatarPickerProps {
  selectedAvatar?: string;
  onSelectAvatar: (emoji: string) => void;
  className?: string;
}

export function AvatarPicker({
  selectedAvatar = '👨‍💼',
  onSelectAvatar,
  className,
}: AvatarPickerProps) {
  return (
    <div className={cn('space-y-3 font-sans', className)}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Choose Profile Avatar Emoji
      </label>
      <div className="flex flex-wrap gap-2.5">
        {DEFAULT_AVATAR_EMOJIS.map((item) => {
          const isSelected = selectedAvatar === item.emoji;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectAvatar(item.emoji)}
              title={item.label}
              className={cn(
                'h-11 w-11 rounded-full flex items-center justify-center text-xl transition-all border select-none',
                isSelected
                  ? 'border-[#94cb3d] bg-[#94cb3d]/20 ring-2 ring-[#94cb3d]/40 scale-105 shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#94cb3d]/50 hover:bg-[#94cb3d]/10'
              )}
            >
              <span>{item.emoji}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AvatarPicker;
