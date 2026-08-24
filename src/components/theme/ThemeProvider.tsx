'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'lime' | 'sapphire' | 'emerald' | 'amethyst' | 'slate';

export interface ThemeOption {
  id: ThemeName;
  name: string;
  color: string;
  hoverColor: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'lime',
    name: 'Coral Lime',
    color: '#94cb3d',
    hoverColor: '#82b632',
    description: 'Fresh & energetic corporate brand green',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    color: '#2563eb',
    hoverColor: '#1d4ed8',
    description: 'Executive trustworthy deep blue',
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    color: '#10b981',
    hoverColor: '#059669',
    description: 'Clean modern tech mint green',
  },
  {
    id: 'amethyst',
    name: 'Deep Amethyst',
    color: '#8b5cf6',
    hoverColor: '#7c3aed',
    description: 'Sophisticated imperial royal purple',
  },
  {
    id: 'slate',
    name: 'Pure Slate (Light)',
    color: '#475569',
    hoverColor: '#334155',
    description: 'Minimalist white & slate gray combination',
  },
];

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  activeThemeOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('lime');

  useEffect(() => {
    const savedTheme = localStorage.getItem('hrms_theme') as ThemeName;
    if (savedTheme && THEME_OPTIONS.some((t) => t.id === savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'lime');
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('hrms_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const activeThemeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
