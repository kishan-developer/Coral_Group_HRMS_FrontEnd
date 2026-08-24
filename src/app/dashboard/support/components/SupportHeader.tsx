'use client';

import { Bell, Settings, Search, Plus } from 'lucide-react';
import Button from '@/components/ui/Button/Button';

interface SupportHeaderProps {
  onCreateTicket?: () => void;
}

export default function SupportHeader({ onCreateTicket }: SupportHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Support Dashboard
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Manage tickets, requests, and technical issues
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tickets, requests..."
            className="pl-10 pr-4 py-2 w-64 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-50"
          />
        </div>
        
        {onCreateTicket && (
          <Button onClick={onCreateTicket} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        )}

        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
