'use client';

import { useState } from 'react';
import { Search, ArrowUpDown, Download, Eye } from 'lucide-react';

interface EmployeeRankingTableProps {
  onEmployeeClick: (employee: any) => void;
}

const employees = [
  { rank: 1, name: 'Rahul Sharma', department: 'Sales', attendance: '98%', tasksCompleted: 145, sales: '₹5,20,000', score: 95 },
  { rank: 2, name: 'Amit Kumar', department: 'Support', attendance: '97%', tasksCompleted: 132, sales: '₹4,80,000', score: 92 },
  { rank: 3, name: 'Priya Singh', department: 'Marketing', attendance: '96%', tasksCompleted: 128, sales: '₹4,50,000', score: 90 },
  { rank: 4, name: 'John Doe', department: 'IT', attendance: '95%', tasksCompleted: 120, sales: '₹4,20,000', score: 88 },
  { rank: 5, name: 'Sarah Williams', department: 'Finance', attendance: '94%', tasksCompleted: 115, sales: '₹3,90,000', score: 86 },
  { rank: 6, name: 'Mike Johnson', department: 'Operations', attendance: '93%', tasksCompleted: 110, sales: '₹3,60,000', score: 84 },
  { rank: 7, name: 'Emma Davis', department: 'HR', attendance: '92%', tasksCompleted: 105, sales: '₹3,30,000', score: 82 },
  { rank: 8, name: 'David Wilson', department: 'Sales', attendance: '91%', tasksCompleted: 100, sales: '₹3,00,000', score: 80 },
];

export default function EmployeeRankingTable({ onEmployeeClick }: EmployeeRankingTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'score', direction: 'desc' });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredEmployees = employees
    .filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      const aNum = typeof aValue === 'string' ? parseFloat(aValue.replace(/[^\d.-]/g, '')) : aValue;
      const bNum = typeof bValue === 'string' ? parseFloat(bValue.replace(/[^\d.-]/g, '')) : bValue;
      
      return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
    });

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Employee Ranking</h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            PDF
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Rank
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Employee
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center gap-1">
                  Department
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('attendance')}
              >
                <div className="flex items-center gap-1">
                  Attendance
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('tasksCompleted')}
              >
                <div className="flex items-center gap-1">
                  Tasks Completed
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center gap-1">
                  Sales
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center gap-1">
                  Score
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.rank} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    employee.rank === 1 ? 'bg-amber-100 text-amber-700' :
                    employee.rank === 2 ? 'bg-zinc-200 text-zinc-700' :
                    employee.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-zinc-100 text-zinc-700'
                  }`}>
                    {employee.rank}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                  {employee.name}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {employee.department}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {employee.attendance}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {employee.tasksCompleted}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {employee.sales}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    employee.score >= 90 ? 'bg-green-100 text-green-700' :
                    employee.score >= 80 ? 'bg-blue-100 text-blue-700' :
                    employee.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {employee.score}%
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEmployeeClick(employee)}
                    className="flex items-center gap-1 text-[#94cb3d] hover:text-[#7ab32e] text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
