'use client';

import { useState } from 'react';
import MonthlyHeader from './components/MonthlyHeader';
import MonthlyFilters, { MonthlyFilterState } from './components/MonthlyFilters';
import MonthlySummaryWidgets from './components/MonthlySummaryWidgets';
import AttendanceCalendarGrid from './components/AttendanceCalendarGrid';
import EmployeeMonthlyTable from './components/EmployeeMonthlyTable';
import MonthlyTrendCharts from './components/MonthlyTrendCharts';
import HolidayEventsBar from './components/HolidayEventsBar';
import QuickActions from './components/QuickActions';
import DayDetailModal from './components/DayDetailModal';
import AlertsInsights from './components/AlertsInsights';

const defaultFilters: MonthlyFilterState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  department: 'All Departments',
  employee: 'All Employees',
  shift: 'All Shifts',
  status: 'All Status',
  employmentType: 'All Types',
};

export default function Page() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filters, setFilters] = useState<MonthlyFilterState>(defaultFilters);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dayModalOpen, setDayModalOpen] = useState(false);

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
    setFilters({
      ...filters,
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setDayModalOpen(true);
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  const handleExportXLS = () => {
    console.log('Export XLS');
  };

  const handleExportPDF = () => {
    console.log('Export PDF');
  };

  const handleMarkAttendance = () => {
    console.log('Mark Attendance');
  };

  const handleApproveLeave = () => {
    console.log('Approve Leave');
  };

  const handleRejectLeave = () => {
    console.log('Reject Leave');
  };

  const handleRegularization = () => {
    console.log('Regularization');
  };

  const handleDownloadReport = () => {
    console.log('Download Report');
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <MonthlyHeader
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        onExportCSV={handleExportCSV}
        onExportXLS={handleExportXLS}
        onExportPDF={handleExportPDF}
      />

      <MonthlyFilters
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />

      <MonthlySummaryWidgets />

      <AttendanceCalendarGrid
        selectedMonth={selectedMonth}
        onDayClick={handleDayClick}
      />

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="xl:col-span-2">
          <EmployeeMonthlyTable />
        </div>
        {/* <div className="space-y-6">
          <QuickActions
            onMarkAttendance={handleMarkAttendance}
            onApproveLeave={handleApproveLeave}
            onRejectLeave={handleRejectLeave}
            onRegularization={handleRegularization}
            onDownloadReport={handleDownloadReport}
          />
          <HolidayEventsBar />
        </div> */}
      </div>

      <MonthlyTrendCharts />

      <AlertsInsights />

      <DayDetailModal
        isOpen={dayModalOpen}
        onClose={() => setDayModalOpen(false)}
        date={selectedDay || 1}
        month={monthNames[selectedMonth.getMonth()]}
        year={selectedMonth.getFullYear()}
      />
    </div>
  );
}
