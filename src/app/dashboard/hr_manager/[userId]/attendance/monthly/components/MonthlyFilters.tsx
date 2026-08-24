'use client';

import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';

export interface MonthlyFilterState {
  month: number;
  year: number;
  department: string;
  employee: string;
  shift: string;
  status: string;
  employmentType: string;
}

interface MonthlyFiltersProps {
  value: MonthlyFilterState;
  onChange: (filters: MonthlyFilterState) => void;
  onClear: () => void;
}

const departments = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const employees = ['All Employees', 'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown'];
const shifts = ['All Shifts', 'Morning (9AM-6PM)', 'Evening (2PM-11PM)', 'Night (10PM-7AM)'];
const statuses = ['All Status', 'Present', 'Absent', 'Leave', 'Late', 'Early Out'];
const employmentTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Intern'];

export default function MonthlyFilters({ value, onChange, onClear }: MonthlyFiltersProps) {
  const handleFieldChange = (field: keyof MonthlyFilterState, newValue: string | number) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Month */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Month
          </label>
          <select
            value={value.month}
            onChange={(e) => handleFieldChange('month', parseInt(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(2024, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Year
          </label>
          <select
            value={value.year}
            onChange={(e) => handleFieldChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Department
          </label>
          <select
            value={value.department}
            onChange={(e) => handleFieldChange('department', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Employee */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Employee
          </label>
          <select
            value={value.employee}
            onChange={(e) => handleFieldChange('employee', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {employees.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </div>

        {/* Shift */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Shift
          </label>
          <select
            value={value.shift}
            onChange={(e) => handleFieldChange('shift', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Status */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Status
          </label>
          <select
            value={value.status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
            Employment Type
          </label>
          <select
            value={value.employmentType}
            onChange={(e) => handleFieldChange('employmentType', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]/50"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <Button variant="primary" size="sm">
          Apply Filters
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
