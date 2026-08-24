'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEME_OPTIONS, type ThemeName } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setTheme, activeThemeOption } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm text-xs font-medium"
        title="Switch Enterprise Theme"
      >
        <div className="flex items-center gap-1.5">
          <div
            className="h-3.5 w-3.5 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: activeThemeOption.color }}
          />
          <Palette className="h-3.5 w-3.5 text-zinc-500" />
        </div>
        <span className="hidden sm:inline-block text-zinc-700 dark:text-zinc-300">
          {activeThemeOption.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 animate-in fade-in duration-150 space-y-1">
          <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Select HRMS Theme
            </p>
            <p className="text-[10px] font-medium text-zinc-500">
              Choose from 4 curated enterprise color combinations
            </p>
          </div>

          <div className="space-y-1 pt-1">
            {THEME_OPTIONS.map((option) => {
              const isSelected = theme === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setTheme(option.id as ThemeName);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded-full border border-white/40 shadow-md shrink-0 flex items-center justify-center text-white"
                      style={{ backgroundColor: option.color }}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {option.name}
                      </p>
                      <p className="text-[10px] font-medium text-zinc-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
