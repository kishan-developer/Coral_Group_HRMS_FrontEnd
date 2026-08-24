'use client';

import { useState } from 'react';

interface Loan {
  id: string;
  employeeId: string;
  name: string;
  loanType: 'Salary Advance' | 'Employee Loan';
  loanAmount: number;
  emi: number;
  balance: number;
  startDate: string;
  status: 'active' | 'paid' | 'pending';
}

export default function LoansAndAdvances() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loans, setLoans] = useState<Loan[]>([
        {
          id: '1',
          employeeId: 'EMP001',
          name: 'John Smith',
          loanType: 'Employee Loan',
          loanAmount: 100000,
          emi: 8333,
          balance: 50000,
          startDate: '2026-03-01',
          status: 'active',
        },
        {
          id: '2',
          employeeId: 'EMP002',
          name: 'Sarah Johnson',
          loanType: 'Salary Advance',
          loanAmount: 25000,
          emi: 12500,
          balance: 0,
          startDate: '2026-05-01',
          status: 'paid',
        },
        {
          id: '3',
          employeeId: 'EMP003',
          name: 'Mike Brown',
          loanType: 'Employee Loan',
          loanAmount: 150000,
          emi: 12500,
          balance: 125000,
          startDate: '2026-04-01',
          status: 'active',
        },
        {
          id: '4',
          employeeId: 'EMP004',
          name: 'Emily Davis',
          loanType: 'Salary Advance',
          loanAmount: 30000,
          emi: 15000,
          balance: 15000,
          startDate: '2026-05-15',
          status: 'active',
        },
        {
          id: '5',
          employeeId: 'EMP005',
          name: 'David Wilson',
          loanType: 'Employee Loan',
          loanAmount: 200000,
          emi: 16667,
          balance: 200000,
          startDate: '2026-06-01',
          status: 'pending',
        },
      ]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [editData, setEditData] = useState<Partial<Loan>>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApproveLoan = (id: string) => {
    setLoans(loans.map(loan => 
      loan.id === id ? { ...loan, status: 'active' as const } : loan
    ));
  };

  const handleViewLoan = (id: string) => {
    const loan = loans.find(l => l.id === id);
    if (loan) {
      setSelectedLoan(loan);
      setShowViewModal(true);
    }
  };

  const handleViewSchedule = (id: string) => {
    const loan = loans.find(l => l.id === id);
    if (loan) {
      setSelectedLoan(loan);
      setShowScheduleModal(true);
    }
  };

  const handleEditLoan = (id: string) => {
    const loan = loans.find(l => l.id === id);
    if (loan) {
      setEditData(loan);
      setSelectedLoan(loan);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedLoan && editData) {
      setLoans(loans.map(loan => 
        loan.id === selectedLoan.id ? { ...loan, ...editData } : loan
      ));
      setShowEditModal(false);
      setEditData({});
      setSelectedLoan(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Loans & Advances
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage employee salary advances and loans
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Loan
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Types</option>
            <option value="Salary Advance">Salary Advance</option>
            <option value="Employee Loan">Employee Loan</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
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
                  Loan Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Loan Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  EMI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Start Date
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
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{loan.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{loan.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {loan.loanType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(loan.loanAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {formatCurrency(loan.emi)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(loan.balance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {loan.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      loan.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : loan.status === 'paid'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {loan.status === 'pending' && (
                        <button 
                          onClick={() => handleApproveLoan(loan.id)}
                          className="text-[#94cb3d] hover:text-[#7ab52f]"
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewLoan(loan.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleViewSchedule(loan.id)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Schedule
                      </button>
                      <button 
                        onClick={() => handleEditLoan(loan.id)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showViewModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedLoan.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee ID</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedLoan.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan Type</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedLoan.loanType}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan Amount</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedLoan.loanAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">EMI</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedLoan.emi)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Balance</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedLoan.balance)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedLoan.status}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowViewModal(false);
                setSelectedLoan(null);
              }}
              className="mt-6 w-full px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showScheduleModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">EMI Schedule</h3>
            <div className="mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan: {selectedLoan.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Amount: {formatCurrency(selectedLoan.loanAmount)}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">EMI: {formatCurrency(selectedLoan.emi)}</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900">
                  <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">Month</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">EMI</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">Balance</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((month) => (
                  <tr key={month} className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50">Month {month}</td>
                    <td className="px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedLoan.emi)}</td>
                    <td className="px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedLoan.balance - (month * selectedLoan.emi))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => {
                setShowScheduleModal(false);
                setSelectedLoan(null);
              }}
              className="mt-6 w-full px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Edit Loan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Loan Amount</label>
                <input
                  type="number"
                  value={editData.loanAmount || ''}
                  onChange={(e) => setEditData({ ...editData, loanAmount: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">EMI</label>
                <input
                  type="number"
                  value={editData.emi || ''}
                  onChange={(e) => setEditData({ ...editData, emi: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value as 'active' | 'paid' | 'pending' })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData({});
                  setSelectedLoan(null);
                }}
                className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
