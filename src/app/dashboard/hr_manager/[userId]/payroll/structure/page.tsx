'use client';

import { useState } from 'react';
import { Plus, Download, Settings } from 'lucide-react';
import StructureSummaryWidgets from './components/StructureSummaryWidgets';
import StructureFilters from './components/StructureFilters';
import StructureTable from './components/StructureTable';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [activeStatus, setActiveStatus] = useState('');

  // Mock salary structures
  const mockStructures = [
    {
      id: '1',
      structureName: 'IT Staff Structure',
      structureCode: 'IT-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 6,
      deductionComponents: 4,
      totalCTC: 600000,
      assignedEmployees: 45,
      status: 'active' as const,
      effectiveFrom: '2024-01-01',
    },
    {
      id: '2',
      structureName: 'HR Management Structure',
      structureCode: 'HR-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 7,
      deductionComponents: 5,
      totalCTC: 900000,
      assignedEmployees: 12,
      status: 'active' as const,
      effectiveFrom: '2024-01-01',
    },
    {
      id: '3',
      structureName: 'Sales Executive Structure',
      structureCode: 'SALES-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 5,
      deductionComponents: 3,
      totalCTC: 450000,
      assignedEmployees: 68,
      status: 'active' as const,
      effectiveFrom: '2024-01-01',
    },
    {
      id: '4',
      structureName: 'Contract Worker Structure',
      structureCode: 'CON-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 4,
      deductionComponents: 2,
      totalCTC: 300000,
      assignedEmployees: 85,
      status: 'active' as const,
      effectiveFrom: '2024-02-01',
    },
    {
      id: '5',
      structureName: 'Executive Management Structure',
      structureCode: 'EXEC-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 8,
      deductionComponents: 6,
      totalCTC: 1800000,
      assignedEmployees: 15,
      status: 'active' as const,
      effectiveFrom: '2024-01-01',
    },
    {
      id: '6',
      structureName: 'Old IT Structure (Deprecated)',
      structureCode: 'IT-OLD-001',
      salaryCycle: 'monthly' as const,
      earningsComponents: 4,
      deductionComponents: 3,
      totalCTC: 350000,
      assignedEmployees: 0,
      status: 'inactive' as const,
      effectiveFrom: '2023-01-01',
    },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartment('');
    setDesignation('');
    setSalaryType('');
    setActiveStatus('');
  };

  const handleView = (id: string) => {
    alert(`View structure ${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Edit structure ${id}`);
  };

  const handleAssign = (id: string) => {
    alert(`Assign structure ${id} to employees`);
  };

  const handleDuplicate = (id: string) => {
    alert(`Duplicate structure ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this structure?')) {
      alert(`Structure ${id} deleted`);
    }
  };

  const handleAddStructure = () => {
    alert('Opening create structure form...');
  };

  const handleBulkAssign = () => {
    alert('Opening bulk assign dialog...');
  };

  const handleExport = () => {
    alert('Exporting structure list...');
  };

  const handleComponentSettings = () => {
    alert('Opening payroll component settings...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Salary Structure</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and configure salary structures</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBulkAssign}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Bulk Assign
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={handleComponentSettings}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Component Settings
          </button>
          <button
            onClick={handleAddStructure}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Structure
          </button>
        </div>
      </div>

      {/* Structure Summary Widgets */}
      <StructureSummaryWidgets />

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <StructureFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          department={department}
          onDepartmentChange={setDepartment}
          designation={designation}
          onDesignationChange={setDesignation}
          salaryType={salaryType}
          onSalaryTypeChange={setSalaryType}
          activeStatus={activeStatus}
          onActiveStatusChange={setActiveStatus}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Structure Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <StructureTable
          structures={mockStructures}
          onView={handleView}
          onEdit={handleEdit}
          onAssign={handleAssign}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
