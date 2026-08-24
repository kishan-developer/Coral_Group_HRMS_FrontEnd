'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeaveCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getLeaveStatus = (day: number) => {
    // Mock data - in real app, this would come from API
    if (day === 1 || day === 8 || day === 15 || day === 22 || day === 29) return 'approved';
    if (day === 5 || day === 12) return 'pending';
    if (day === 26) return 'holiday';
    if (day === 0 || day === 6) return 'weekend';
    return null;
  };

  const getLeaveColor = (status: string | null) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'holiday':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'weekend':
        return 'bg-zinc-100 text-zinc-400 border-zinc-300';
      default:
        return 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d]';
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getLeaveStatus(day);
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
          className={`h-20 border p-2 cursor-pointer transition-all ${getLeaveColor(status)}`}
        >
          <div className="font-semibold text-sm">{day}</div>
          {status && status !== 'weekend' && (
            <div className="text-xs mt-1">
              {status === 'approved' && '🟢 Approved'}
              {status === 'pending' && '🟡 Pending'}
              {status === 'holiday' && '🔵 Holiday'}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Leave Calendar</h2>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-[200px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Rejected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Holiday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-zinc-100 border border-zinc-300"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Week Off</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div key={day} className="bg-zinc-50 dark:bg-zinc-800 p-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-b border-r border-zinc-200 dark:border-zinc-700">
            {day}
          </div>
        ))}
        {/* Calendar Days */}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
