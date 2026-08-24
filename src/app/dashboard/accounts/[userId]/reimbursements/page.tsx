'use client';

import { useState } from 'react';

interface Reimbursement {
  id: string;
  employeeId: string;
  name: string;
  type: 'Travel' | 'Food' | 'Medical' | 'Internet' | 'Fuel' | 'Other';
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  description: string;
}

export default function Reimbursements() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([
        {
          id: '1',
          employeeId: 'EMP001',
          name: 'John Smith',
          type: 'Travel',
          amount: 5000,
          date: '2026-06-15',
          status: 'pending',
          description: 'Client meeting travel expenses',
        },
        {
          id: '2',
          employeeId: 'EMP002',
          name: 'Sarah Johnson',
          type: 'Medical',
          amount: 3500,
          date: '2026-06-14',
          status: 'approved',
          description: 'Medical consultation',
        },
        {
          id: '3',
          employeeId: 'EMP003',
          name: 'Mike Brown',
          type: 'Food',
          amount: 1200,
          date: '2026-06-13',
          status: 'pending',
          description: 'Team dinner',
        },
        {
          id: '4',
          employeeId: 'EMP004',
          name: 'Emily Davis',
          type: 'Internet',
          amount: 800,
          date: '2026-06-12',
          status: 'paid',
          description: 'Home internet bill',
        },
        {
          id: '5',
          employeeId: 'EMP005',
          name: 'David Wilson',
          type: 'Fuel',
          amount: 2500,
          date: '2026-06-11',
          status: 'rejected',
          description: 'Personal fuel expense',
        },
      ]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReimbursement, setSelectedReimbursement] = useState<Reimbursement | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = (id: string) => {
    setReimbursements(reimbursements.map(r => 
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
  };

  const handleReject = (id: string) => {
    setReimbursements(reimbursements.map(r => 
      r.id === id ? { ...r, status: 'rejected' as const } : r
    ));
  };

  const handlePayment = (id: string) => {
    setReimbursements(reimbursements.map(r => 
      r.id === id ? { ...r, status: 'paid' as const } : r
    ));
  };

  const handleView = (id: string) => {
    const reimbursement = reimbursements.find(r => r.id === id);
    if (reimbursement) {
      setSelectedReimbursement(reimbursement);
      setShowViewModal(true);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Reimbursements
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Process and manage employee reimbursement requests
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Types</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Internet">Internet</option>
            <option value="Fuel">Fuel</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="paid">Paid</option>
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Description
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
              {reimbursements.map((reimbursement) => (
                <tr key={reimbursement.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{reimbursement.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{reimbursement.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {reimbursement.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(reimbursement.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {reimbursement.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                    {reimbursement.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      reimbursement.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : reimbursement.status === 'paid'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : reimbursement.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {reimbursement.status.charAt(0).toUpperCase() + reimbursement.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {reimbursement.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(reimbursement.id)}
                            className="text-[#94cb3d] hover:text-[#7ab52f]"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(reimbursement.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {reimbursement.status === 'approved' && (
                        <button 
                          onClick={() => handlePayment(reimbursement.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Process Payment
                        </button>
                      )}
                      <button 
                        onClick={() => handleView(reimbursement.id)}
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

      <div className="mt-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Reimbursement Workflow</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
            <span className="text-zinc-600 dark:text-zinc-400">Employee Request</span>
          </div>
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-zinc-600 dark:text-zinc-400">Manager Approval</span>
          </div>
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-zinc-600 dark:text-zinc-400">Accounts Verification</span>
          </div>
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-zinc-600 dark:text-zinc-400">Payment</span>
          </div>
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-zinc-600 dark:text-zinc-400">Closed</span>
          </div>
        </div>
      </div>

      {showViewModal && selectedReimbursement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Reimbursement Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Employee ID</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Type</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.type}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Amount</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedReimbursement.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Date</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.date}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Description</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.description}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedReimbursement.status}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowViewModal(false);
                setSelectedReimbursement(null);
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
