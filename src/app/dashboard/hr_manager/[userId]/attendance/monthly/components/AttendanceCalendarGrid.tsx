'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card/Card';

type AttendanceStatus = 'present' | 'absent' | 'leave' | 'late' | 'early-out' | 'weekly-off' | 'holiday';

interface DayData {
  date: number;
  status: AttendanceStatus;
  inTime?: string;
  outTime?: string;
  hours?: string;
}

interface AttendanceCalendarGridProps {
  selectedMonth: Date;
  onDayClick: (day: number) => void;
}

const statusColors: Record<AttendanceStatus, string> = {
  present: 'bg-green-500',
  absent: 'bg-red-500',
  leave: 'bg-blue-500',
  late: 'bg-amber-500',
  'early-out': 'bg-orange-500',
  'weekly-off': 'bg-zinc-400',
  holiday: 'bg-zinc-600',
};

const statusLabels: Record<AttendanceStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  leave: 'Leave',
  late: 'Late',
  'early-out': 'Early Out',
  'weekly-off': 'Weekly Off',
  holiday: 'Holiday',
};

export default function AttendanceCalendarGrid({ selectedMonth, onDayClick }: AttendanceCalendarGridProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Generate mock data for the month
  const generateMonthData = (): DayData[] => {
    const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
    const data: DayData[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i);
      const dayOfWeek = date.getDay();
      
      let status: AttendanceStatus = 'present';
      
      // Weekly off (Sunday)
      if (dayOfWeek === 0) {
        status = 'weekly-off';
      } 
      // Randomly assign other statuses for demo
      else if (i % 15 === 0) {
        status = 'holiday';
      } else if (i % 20 === 0) {
        status = 'absent';
      } else if (i % 12 === 0) {
        status = 'leave';
      } else if (i % 8 === 0) {
        status = 'late';
      } else if (i % 25 === 0) {
        status = 'early-out';
      }

      data.push({
        date: i,
        status,
        inTime: status === 'present' || status === 'late' ? '09:15' : status === 'early-out' ? '09:00' : undefined,
        outTime: status === 'present' || status === 'early-out' ? '18:00' : status === 'late' ? '17:30' : undefined,
        hours: status === 'present' ? '8h 45m' : status === 'late' ? '8h 15m' : status === 'early-out' ? '7h 30m' : undefined,
      });
    }

    return data;
  };

  const monthData = generateMonthData();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Attendance Calendar - {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Leave</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Early Out</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-zinc-400" />
            <span className="text-zinc-600 dark:text-zinc-400">Weekly Off</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-zinc-600" />
            <span className="text-zinc-600 dark:text-zinc-400">Holiday</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400 py-1.5">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {monthData.map((day) => {
          const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day.date);
          const startDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();
          
          // Add empty cells for days before the 1st
          if (day.date === 1 && startDay > 0) {
            return (
              <>
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                <div
                  key={day.date}
                  className={`aspect-square rounded-md ${statusColors[day.status]} cursor-pointer hover:scale-105 hover:shadow-md transition-all relative flex flex-col items-center justify-center border border-white/10`}
                  onClick={() => onDayClick(day.date)}
                  onMouseEnter={() => setHoveredDay(day.date)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <span className="text-white text-xs font-semibold">{day.date}</span>
                  
                  {/* Tooltip */}
                  {hoveredDay === day.date && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] rounded-md shadow-lg whitespace-nowrap z-10">
                      <div className="font-medium">{statusLabels[day.status]}</div>
                      {day.inTime && day.outTime && (
                        <div className="mt-0.5 text-zinc-300 dark:text-zinc-700">
                          {day.inTime} - {day.outTime}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            );
          }

          return (
            <div
              key={day.date}
              className={`aspect-square rounded-md ${statusColors[day.status]} cursor-pointer hover:scale-105 hover:shadow-md transition-all relative flex flex-col items-center justify-center border border-white/10`}
              onClick={() => onDayClick(day.date)}
              onMouseEnter={() => setHoveredDay(day.date)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className="text-white text-xs font-semibold">{day.date}</span>
              
              {/* Tooltip */}
              {hoveredDay === day.date && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] rounded-md shadow-lg whitespace-nowrap z-10">
                  <div className="font-medium">{statusLabels[day.status]}</div>
                  {day.inTime && day.outTime && (
                    <div className="mt-0.5 text-zinc-300 dark:text-zinc-700">
                      {day.inTime} - {day.outTime}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
