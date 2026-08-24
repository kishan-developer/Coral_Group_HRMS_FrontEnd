'use client';

import { useState } from 'react';
import PerformanceFilters from './components/PerformanceFilters';
import PerformanceStatsCards from './components/PerformanceStatsCards';
import PerformanceOverviewChart from './components/PerformanceOverviewChart';
import EmployeeRankingTable from './components/EmployeeRankingTable';
import DepartmentPerformanceChart from './components/DepartmentPerformanceChart';
import EmployeeKPISection from './components/EmployeeKPISection';
import TopPerformers from './components/TopPerformers';
import UnderperformingEmployees from './components/UnderperformingEmployees';
import EmployeeDetailDrawer from './components/EmployeeDetailDrawer';
import ExportReports from './components/ExportReports';

export default function Page() {
  const [dateRange, setDateRange] = useState('month');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEmployeeClick = (employee: any) => {
    setSelectedEmployeeDetail(employee);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Employee Performance</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Track employee productivity, attendance, sales, targets, and overall performance</p>
        </div>
        <ExportReports />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <PerformanceFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedEmployee={selectedEmployee}
          onEmployeeChange={setSelectedEmployee}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      </div>

      {/* Statistics Cards */}
      <PerformanceStatsCards />

      {/* Performance Overview Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <PerformanceOverviewChart />
      </div>

      {/* Employee Ranking Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <EmployeeRankingTable onEmployeeClick={handleEmployeeClick} />
      </div>

      {/* Department Performance Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <DepartmentPerformanceChart />
      </div>

      {/* Employee KPI Section */}
      <EmployeeKPISection />

      {/* Top Performers */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <TopPerformers onEmployeeClick={handleEmployeeClick} />
      </div>

      {/* Underperforming Employees */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <UnderperformingEmployees onEmployeeClick={handleEmployeeClick} />
      </div>

      {/* Employee Detail Drawer */}
      <EmployeeDetailDrawer
        employee={selectedEmployeeDetail}
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedEmployeeDetail(null); }}
      />
    </div>
  );
}
