'use client';

import { useState } from 'react';

interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  amount: number;
  percentage: number;
  taxable: boolean;
  description: string;
}

export default function SalaryComponents() {
  const [activeTab, setActiveTab] = useState<'earning' | 'deduction'>('earning');
  const [components, setComponents] = useState<SalaryComponent[]>([
    // Earnings
    { id: '1', name: 'Basic Salary', type: 'earning', amount: 0, percentage: 50, taxable: true, description: 'Base salary component' },
    { id: '2', name: 'HRA', type: 'earning', amount: 0, percentage: 40, taxable: true, description: 'House Rent Allowance' },
    { id: '3', name: 'Conveyance', type: 'earning', amount: 0, percentage: 10, taxable: true, description: 'Transport allowance' },
    { id: '4', name: 'Medical Allowance', type: 'earning', amount: 0, percentage: 5, taxable: false, description: 'Medical reimbursement' },
    { id: '5', name: 'Special Allowance', type: 'earning', amount: 0, percentage: 15, taxable: true, description: 'Performance bonus' },
    { id: '6', name: 'Bonus', type: 'earning', amount: 0, percentage: 0, taxable: true, description: 'Annual bonus' },
    { id: '7', name: 'Overtime', type: 'earning', amount: 0, percentage: 0, taxable: true, description: 'Overtime pay' },
    // Deductions
    { id: '8', name: 'PF', type: 'deduction', amount: 0, percentage: 12, taxable: false, description: 'Provident Fund' },
    { id: '9', name: 'ESI', type: 'deduction', amount: 0, percentage: 1, taxable: false, description: 'Employee State Insurance' },
    { id: '10', name: 'TDS', type: 'deduction', amount: 0, percentage: 0, taxable: false, description: 'Tax Deducted at Source' },
    { id: '11', name: 'Professional Tax', type: 'deduction', amount: 0, percentage: 0, taxable: false, description: 'State professional tax' },
    { id: '12', name: 'Loan EMI', type: 'deduction', amount: 0, percentage: 0, taxable: false, description: 'Loan installment' },
    { id: '13', name: 'Late Penalty', type: 'deduction', amount: 0, percentage: 0, taxable: false, description: 'Late payment penalty' },
  ]);

  const filteredComponents = components.filter(c => c.type === activeTab);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleTaxable = (id: string) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, taxable: !c.taxable } : c
    ));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Salary Components
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Configure earnings and deductions for payroll calculation
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="border-b border-zinc-200 dark:border-zinc-700">
          <nav className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('earning')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'earning'
                  ? 'border-[#94cb3d] text-[#94cb3d]'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              Earnings
            </button>
            <button
              onClick={() => setActiveTab('deduction')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'deduction'
                  ? 'border-[#94cb3d] text-[#94cb3d]'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              Deductions
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Component Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Fixed Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Taxable
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {filteredComponents.map((component) => (
                  <tr key={component.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {component.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {component.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50">
                      {component.percentage > 0 ? `${component.percentage}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50">
                      {component.amount > 0 ? formatCurrency(component.amount) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleTaxable(component.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          component.taxable
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {component.taxable ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-[#94cb3d] hover:text-[#7ab52f]">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Component
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Earnings Summary</h3>
          <div className="space-y-3">
            {components.filter(c => c.type === 'earning').map((component) => (
              <div key={component.id} className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{component.name}</span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {component.percentage > 0 ? `${component.percentage}%` : 'Fixed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Deductions Summary</h3>
          <div className="space-y-3">
            {components.filter(c => c.type === 'deduction').map((component) => (
              <div key={component.id} className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{component.name}</span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {component.percentage > 0 ? `${component.percentage}%` : 'Fixed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
