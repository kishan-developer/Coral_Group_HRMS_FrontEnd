'use client';

import { useState } from 'react';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import ChartCard from '@/components/ui/Card/ChartCard';

const defaultAttendanceData = [
  { label: 'Present', value: 14, color: '#94cb3d' },
  { label: 'Late', value: 3, color: '#f59e0b' },
  { label: 'Absent', value: 1, color: '#ef4444' },
  { label: 'On Leave', value: 1, color: '#3b82f6' },
  { label: 'Outdoor', value: 3, color: '#8b5cf6' },
];

const weeklyTrendData = [
  { label: 'Mon', value: 15 },
  { label: 'Tue', value: 17 },
  { label: 'Wed', value: 16 },
  { label: 'Thu', value: 18 },
  { label: 'Fri', value: 17 },
  { label: 'Sat', value: 8 },
  { label: 'Sun', value: 4 },
];

const defaultDeptData = [
  { label: 'Real Estate', value: 5, present: 4, absent: 0 },
  { label: 'Hotels', value: 4, present: 3, absent: 1 },
  { label: 'Saree Mfg', value: 4, present: 3, absent: 0 },
  { label: 'Corporate HO', value: 5, present: 4, absent: 0 },
];

type TabType = 'overview' | 'trends' | 'comparison';

interface AttendanceChartCardProps {
  distribution?: Array<{ label: string; value: number; color: string }>;
  departmentInsights?: Array<{ name: string; total: number; present: number; absent: number }>;
}

export default function AttendanceChartCard({ distribution, departmentInsights }: AttendanceChartCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const attendanceData = distribution && distribution.length > 0 ? distribution : defaultAttendanceData;
  const totalCount = attendanceData.reduce((acc, curr) => acc + curr.value, 0) || 1;

  const departmentData = departmentInsights && departmentInsights.length > 0
    ? departmentInsights.map(d => ({ label: d.name, value: d.total || 1, present: d.present, absent: d.absent }))
    : defaultDeptData;

  const monthlyComparisonData = [
    { label: 'Present', value: attendanceData.find(d => d.label === 'Present')?.value || 14, color: '#94cb3d' },
    { label: 'Late', value: attendanceData.find(d => d.label === 'Late')?.value || 3, color: '#f59e0b' },
    { label: 'Absent', value: attendanceData.find(d => d.label === 'Absent')?.value || 1, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Main Attendance Card with Tabs */}
      <ChartCard
        title="Attendance Overview"
        action={
          <div className="flex items-center gap-2">
            <select className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none">
              <option>All Locations</option>
              <option>Site A</option>
              <option>Site B</option>
            </select>
          </div>
        }
      >
        {/* Tab Navigation */}
        <div className="flex gap-1.5 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-1.5">
          {[
            { id: 'overview' as TabType, label: 'Dist.' },
            { id: 'trends' as TabType, label: 'Trends' },
            { id: 'comparison' as TabType, label: 'Comp.' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#94cb3d] text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-3 mt-10">
            <div className="flex items-center justify-center" style={{ height: '300px' }}>
              <PieChart data={attendanceData} size={300} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {attendanceData.map((d) => {
                const percent = ((d.value / totalCount) * 100).toFixed(1);
                return (
                  <div key={d.label} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{d.label}: {d.value} ({percent}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-3">
            <div className="flex items-center justify-center" style={{ height: '200px' }}>
              <LineChart data={weeklyTrendData} color="#94cb3d" height={200} />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 text-center">
              <div>
                <div className="text-xs text-zinc-500">Avg</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">15</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Peak</div>
                <div className="text-sm font-bold text-[#94cb3d]">Thu</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Trend</div>
                <div className="text-sm font-bold text-[#94cb3d]">↑ 2.3%</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-3">
            <div className="flex items-center justify-center" style={{ height: '200px' }}>
              <BarChart data={monthlyComparisonData.map(d => ({ label: d.label, value: d.value }))} color="#94cb3d" height={200} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {monthlyComparisonData.map((d) => (
                <div key={d.label}>
                  <div className="h-1.5 w-1.5 rounded-full mx-auto mb-1" style={{ backgroundColor: d.color }} />
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{d.value}</div>
                  <div className="text-xs text-zinc-500">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ChartCard>

      {/* Department-wise Attendance */}
      <ChartCard
        title="Department-wise Attendance"
        action={
          <span className="text-xs text-zinc-500">Today</span>
        }
      >
        <div className="grid grid-cols-2 gap-3">
          {departmentData.map((d) => {
            const present = d.present;
            const percent = d.value > 0 ? Math.round((present / d.value) * 100) : 0;
            const absent = d.absent;
            
            return (
              <div 
                key={d.label}
                className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700 hover:border-[#94cb3d]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{d.label}</span>
                  <span className="text-xs font-bold text-[#94cb3d]">{percent}%</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Present: {present}</span>
                      <span className="text-zinc-500 dark:text-zinc-500">Absent: {absent}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#94cb3d] transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#94cb3d]" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Total: {d.value}</span>
                  </div>
                  <div className={`text-xs font-medium ${
                    percent >= 90 ? 'text-[#94cb3d]' : 
                    percent >= 75 ? 'text-[#f59e0b]' : 
                    'text-[#ef4444]'
                  }`}>
                    {percent >= 90 ? 'Excellent' : percent >= 75 ? 'Good' : 'Needs Attention'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
}
