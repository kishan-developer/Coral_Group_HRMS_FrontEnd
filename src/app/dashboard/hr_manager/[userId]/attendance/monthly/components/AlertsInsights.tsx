'use client';

import Card from '@/components/ui/Card/Card';
import { AlertTriangle, TrendingDown, Calendar, Clock } from 'lucide-react';

interface Insight {
  type: 'warning' | 'info' | 'alert';
  icon: React.ReactNode;
  title: string;
  description: string;
  count?: number;
}

export default function AlertsInsights() {
  const insights: Insight[] = [
    {
      type: 'warning',
      icon: <Clock className="h-5 w-5" />,
      title: 'Employees with >3 Late Marks',
      description: '5 employees have exceeded the late attendance threshold this month',
      count: 5,
    },
    {
      type: 'alert',
      icon: <TrendingDown className="h-5 w-5" />,
      title: 'Low Attendance Alert',
      description: '3 employees have attendance below 75% this month',
      count: 3,
    },
    {
      type: 'info',
      icon: <Calendar className="h-5 w-5" />,
      title: 'Most Absent Day',
      description: 'January 20th had the highest absenteeism (8 employees)',
    },
    {
      type: 'info',
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Peak Leave Day',
      description: 'January 12th had the most leave requests (4 employees)',
    },
  ];

  const getTypeStyles = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'alert':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Alerts & Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getTypeStyles(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {insight.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold">{insight.title}</h4>
                  {insight.count !== undefined && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20">
                      {insight.count}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-1 opacity-80">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
