'use client';

import Card from '@/components/ui/Card/Card';

interface TrendData {
  day: number;
  present: number;
  absent: number;
}

interface StatusData {
  label: string;
  value: number;
  color: string;
}

export default function MonthlyTrendCharts() {
  // Generate mock trend data
  const generateTrendData = (): TrendData[] => {
    const data: TrendData[] = [];
    for (let i = 1; i <= 31; i++) {
      data.push({
        day: i,
        present: Math.floor(Math.random() * 20) + 180,
        absent: Math.floor(Math.random() * 10) + 5,
      });
    }
    return data;
  };

  const trendData = generateTrendData();

  const statusData: StatusData[] = [
    { label: 'Present', value: 198, color: 'bg-green-500' },
    { label: 'Absent', value: 8, color: 'bg-red-500' },
    { label: 'Leave', value: 12, color: 'bg-blue-500' },
    { label: 'Late', value: 5, color: 'bg-amber-500' },
    { label: 'Early Out', value: 3, color: 'bg-orange-500' },
  ];

  const maxValue = Math.max(...trendData.map(d => d.present));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart - Attendance Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Daily Attendance Trend
        </h3>
        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{maxValue}</span>
            <span>{Math.round(maxValue * 0.75)}</span>
            <span>{Math.round(maxValue * 0.5)}</span>
            <span>{Math.round(maxValue * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-14 h-full flex items-end gap-1 border-l border-b border-zinc-200 dark:border-zinc-700 pb-6">
            {trendData.map((data) => {
              const presentHeight = (data.present / maxValue) * 100;
              const absentHeight = (data.absent / maxValue) * 100;
              return (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex flex-col gap-0.5">
                    <div
                      className="w-full bg-green-500 rounded-t hover:opacity-80 transition-opacity"
                      style={{ height: `${presentHeight}%` }}
                      title={`Present: ${data.present}`}
                    />
                    <div
                      className="w-full bg-red-500 rounded-b hover:opacity-80 transition-opacity"
                      style={{ height: `${absentHeight}%` }}
                      title={`Absent: ${data.absent}`}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Absent</span>
          </div>
        </div>
      </Card>

      {/* Pie/Donut Chart - Status Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Status Breakdown
        </h3>
        <div className="flex items-center justify-center">
          {/* Donut Chart */}
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {statusData.map((item, index) => {
                const total = statusData.reduce((sum, d) => sum + d.value, 0);
                const percentage = (item.value / total) * 100;
                const circumference = 2 * Math.PI * 40;
                const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                const offset = circumference - (index === 0 ? 0 : statusData.slice(0, index).reduce((sum, d) => sum + (d.value / total) * circumference, 0));
                
                return (
                  <circle
                    key={item.label}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={item.color.replace('bg-', '#')}
                    strokeWidth="12"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-offset}
                    className="hover:opacity-80 transition-opacity"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {statusData.reduce((sum, d) => sum + d.value, 0)}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {statusData.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${item.color}`} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
