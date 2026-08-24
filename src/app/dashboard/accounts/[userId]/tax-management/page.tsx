'use client';

import { useState } from 'react';

interface TaxDeclaration {
  id: string;
  employeeId: string;
  name: string;
  panNumber: string;
  totalIncome: number;
  taxDeducted: number;
  investmentDeclared: number;
  investmentVerified: number;
  status: 'pending' | 'verified' | 'rejected';
  financialYear: string;
}

export default function TaxManagement() {
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [declarations, setDeclarations] = useState<TaxDeclaration[]>([
        {
          id: '1',
          employeeId: 'EMP001',
          name: 'John Smith',
          panNumber: 'ABCDE1234F',
          totalIncome: 960000,
          taxDeducted: 96000,
          investmentDeclared: 150000,
          investmentVerified: 150000,
          status: 'verified',
          financialYear: '2025-26',
        },
        {
          id: '2',
          employeeId: 'EMP002',
          name: 'Sarah Johnson',
          panNumber: 'BCDEF2345G',
          totalIncome: 780000,
          taxDeducted: 78000,
          investmentDeclared: 100000,
          investmentVerified: 100000,
          status: 'verified',
          financialYear: '2025-26',
        },
        {
          id: '3',
          employeeId: 'EMP003',
          name: 'Mike Brown',
          panNumber: 'CDEFG3456H',
          totalIncome: 900000,
          taxDeducted: 90000,
          investmentDeclared: 120000,
          investmentVerified: 0,
          status: 'pending',
          financialYear: '2025-26',
        },
        {
          id: '4',
          employeeId: 'EMP004',
          name: 'Emily Davis',
          panNumber: 'DEFGH4567J',
          totalIncome: 1080000,
          taxDeducted: 108000,
          investmentDeclared: 150000,
          investmentVerified: 120000,
          status: 'verified',
          financialYear: '2025-26',
        },
        {
          id: '5',
          employeeId: 'EMP005',
          name: 'David Wilson',
          panNumber: 'EFGHI5678K',
          totalIncome: 840000,
          taxDeducted: 84000,
          investmentDeclared: 100000,
          investmentVerified: 80000,
          status: 'verified',
          financialYear: '2025-26',
        },
      ]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState<TaxDeclaration | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleVerify = (id: string) => {
    setDeclarations(declarations.map(decl => 
      decl.id === id ? { ...decl, status: 'verified' as const } : decl
    ));
  };

  const handleGenerateForm16 = (id: string) => {
    alert(`Generating Form 16 for ${declarations.find((d: TaxDeclaration) => d.id === id)?.name}`);
  };

  const handleView = (id: string) => {
    const declaration = declarations.find(d => d.id === id);
    if (declaration) {
      setSelectedDeclaration(declaration);
      setShowViewModal(true);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Tax Management
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manage TDS calculations, tax declarations, and Form 16 generation
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="2025-26">2025-26</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending Verification</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  PAN Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Total Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Tax Deducted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Investment Declared
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Investment Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {declarations.map((declaration) => (
                <tr key={declaration.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{declaration.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{declaration.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                    {declaration.panNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(declaration.totalIncome)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(declaration.taxDeducted)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {formatCurrency(declaration.investmentDeclared)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {formatCurrency(declaration.investmentVerified)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      declaration.status === 'verified'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : declaration.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {declaration.status.charAt(0).toUpperCase() + declaration.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {declaration.status === 'pending' && (
                        <button 
                          onClick={() => handleVerify(declaration.id)}
                          className="text-[#94cb3d] hover:text-[#7ab52f]"
                        >
                          Verify
                        </button>
                      )}
                      <button 
                        onClick={() => handleGenerateForm16(declaration.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Form 16
                      </button>
                      <button 
                        onClick={() => handleView(declaration.id)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Calculate TDS for All Employees
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Generate Form 16 Bulk
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Send Tax Declaration Reminder
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Tax Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Total TDS Collected</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">₹4,56,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Investments</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">₹6,20,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Pending Verification</span>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Important Dates</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">TDS Due Date</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">7th July 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Form 16 Issue Deadline</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">15th June 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Declaration Deadline</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">31st May 2026</span>
            </div>
          </div>
        </div>
      </div>

      {showViewModal && selectedDeclaration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Tax Declaration Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedDeclaration.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">PAN Number</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedDeclaration.panNumber}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Income</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedDeclaration.totalIncome)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Tax Deducted</p>
                <p className="font-medium text-red-600 dark:text-red-400">{formatCurrency(selectedDeclaration.taxDeducted)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Investment Declared</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedDeclaration.investmentDeclared)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Investment Verified</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedDeclaration.investmentVerified)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedDeclaration.status}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Financial Year</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedDeclaration.financialYear}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowViewModal(false);
                setSelectedDeclaration(null);
              }}
              className="mt-6 w-full px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
