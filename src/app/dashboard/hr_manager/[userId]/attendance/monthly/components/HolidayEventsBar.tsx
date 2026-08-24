'use client';

import Card from '@/components/ui/Card/Card';
import { Calendar, Flag, Building2 } from 'lucide-react';

interface HolidayEvent {
  id: string;
  name: string;
  date: string;
  type: 'National' | 'Company' | 'Restricted';
}

export default function HolidayEventsBar() {
  const holidayEvents: HolidayEvent[] = [
    { id: '1', name: 'New Year Day', date: 'Jan 1', type: 'National' },
    { id: '2', name: 'Republic Day', date: 'Jan 26', type: 'National' },
    { id: '3', name: 'Company Foundation Day', date: 'Jan 15', type: 'Company' },
    { id: '4', name: 'Restricted Holiday', date: 'Jan 20', type: 'Restricted' },
  ];

  const getTypeIcon = (type: HolidayEvent['type']) => {
    switch (type) {
      case 'National':
        return <Flag className="h-4 w-4" />;
      case 'Company':
        return <Building2 className="h-4 w-4" />;
      case 'Restricted':
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: HolidayEvent['type']) => {
    switch (type) {
      case 'National':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'Company':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'Restricted':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Holidays & Events
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {holidayEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d] transition-colors"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getTypeColor(event.type)}`}>
              {getTypeIcon(event.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {event.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {event.date}
              </p>
              <span className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(event.type)}`}>
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
