'use client';

import { X, Calendar, Briefcase, Building2, TrendingUp, Activity, Target, DollarSign, MessageSquare, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EmployeeDetailDrawerProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
}

const monthlyData = [
  { month: 'Jan', score: 85, productivity: 82, attendance: 90 },
  { month: 'Feb', score: 88, productivity: 85, attendance: 92 },
  { month: 'Mar', score: 87, productivity: 84, attendance: 91 },
  { month: 'Apr', score: 90, productivity: 88, attendance: 93 },
  { month: 'May', score: 92, productivity: 89, attendance: 94 },
];

const recentActivities = [
  { type: 'task', description: 'Completed 5 tasks', date: '2 hours ago' },
  { type: 'sale', description: 'Closed deal worth ₹50,000', date: '5 hours ago' },
  { type: 'attendance', description: 'Present on time', date: 'Today' },
  { type: 'review', description: 'Performance review completed', date: '2 days ago' },
];

export default function EmployeeDetailDrawer({ employee, isOpen, onClose }: EmployeeDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Employee Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#94cb3d]" />
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Employee ID</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee?.employeeId || 'EMP001'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee?.name || 'Rahul Sharma'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Role</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee?.role || 'Senior Executive'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee?.department || 'Sales'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Joining Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee?.joiningDate || '15 Jan 2023'}</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Attendance</p>
                <p className="text-2xl font-bold text-[#94cb3d]">94%</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Productivity</p>
                <p className="text-2xl font-bold text-blue-600">89%</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Sales</p>
                <p className="text-2xl font-bold text-purple-600">87%</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Target Achievement</p>
                <p className="text-2xl font-bold text-amber-600">92%</p>
              </div>
            </div>
          </div>

          {/* Monthly Trend Graph */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Monthly Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-700" />
                <XAxis dataKey="month" stroke="#71717a" className="text-xs" />
                <YAxis stroke="#71717a" className="text-xs" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(24 24 27)',
                    border: '1px solid rgb(63 63 70)',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Line type="monotone" dataKey="score" stroke="#94cb3d" strokeWidth={2} name="Score" />
                <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={2} name="Productivity" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 bg-white dark:bg-zinc-900 p-3 rounded-lg">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#94cb3d]" />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-900 dark:text-zinc-100">{activity.description}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manager Remarks */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Manager Remarks
            </h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">15 May 2024</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">Excellent performance this month. Keep up the good work!</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">10 Apr 2024</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">Great improvement in customer satisfaction scores.</p>
              </div>
            </div>
          </div>

          {/* Incentive & Bonus Tracking */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Incentive & Bonus Tracking
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Target %</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Bonus Eligible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-3 text-sm text-zinc-900 dark:text-zinc-100">{employee?.name || 'Rahul Sharma'}</td>
                    <td className="py-2 px-3 text-sm text-zinc-900 dark:text-zinc-100">120%</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Yes
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
