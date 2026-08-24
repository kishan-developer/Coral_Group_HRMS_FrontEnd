'use client';

import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function SupportPerformanceWidget() {
  const metrics: PerformanceMetric[] = [
    { label: 'Tickets Resolved', value: '156', change: '+12%', isPositive: true },
    { label: 'Avg Response Time', value: '2.5h', change: '-15%', isPositive: true },
    { label: 'First Contact Resolution', value: '78%', change: '+5%', isPositive: true },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', isPositive: true },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', tickets: 45, rating: 4.9 },
    { name: 'Mike Wilson', tickets: 42, rating: 4.8 },
    { name: 'Emily Davis', tickets: 38, rating: 4.7 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-500" />
          Support Performance
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">This Week</button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{metric.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{metric.value}</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
          <Target className="h-4 w-4" />
          Top Performers
        </h4>
        <div className="space-y-2">
          {topPerformers.map((performer, index) => (
            <div key={performer.name} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  index === 1 ? 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{performer.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{performer.tickets} tickets</span>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">{performer.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
