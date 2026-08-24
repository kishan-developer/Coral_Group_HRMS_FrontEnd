'use client';

import { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, XCircle, Clock, FileText, Calendar, TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

interface ExpenseClaim {
  id: string;
  claimNumber: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  manager: string;
  category: 'Travel' | 'Fuel' | 'Hotel' | 'Food' | 'Medical' | 'Office Supplies' | 'Internet' | 'Training' | 'Client Meeting' | 'Miscellaneous';
  expenseDate: string;
  submittedDate: string;
  amount: number;
  approvedAmount: number;
  description: string;
  businessPurpose: string;
  attachments: string[];
  status: 'Draft' | 'Submitted' | 'Manager Approved' | 'Accounts Verified' | 'Finance Approved' | 'Paid' | 'Rejected';
  managerApproval?: {
    approvedBy: string;
    approvedDate: string;
    remarks?: string;
  };
  accountsVerification?: {
    verifiedBy: string;
    verifiedDate: string;
    verifiedAmount: number;
    remarks?: string;
  };
  financeApproval?: {
    approvedBy: string;
    approvedDate: string;
    remarks?: string;
  };
  paymentStatus?: 'Pending' | 'Processing' | 'Completed';
  paymentDate?: string;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ExpenseClaims() {
  const params = useParams();
  const userId = params.userId as string;

  const [claims, setClaims] = useState<ExpenseClaim[]>([
    {
      id: '1',
      claimNumber: 'EXP-00001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Singh',
      department: 'Sales',
      designation: 'Sales Executive',
      manager: 'Amit Kumar',
      category: 'Travel',
      expenseDate: '2026-06-01',
      submittedDate: '2026-06-01',
      amount: 5000,
      approvedAmount: 4500,
      description: 'Client meeting travel to Mumbai',
      businessPurpose: 'Client meeting for new project discussion',
      attachments: ['receipt.pdf', 'hotel_bill.jpg'],
      status: 'Manager Approved',
      managerApproval: {
        approvedBy: 'Amit Kumar',
        approvedDate: '2026-06-02',
        remarks: 'Approved with minor reduction',
      },
      createdAt: '2026-06-01',
      updatedAt: '2026-06-02',
    },
    {
      id: '2',
      claimNumber: 'EXP-00002',
      employeeId: 'EMP002',
      employeeName: 'Priya Sharma',
      department: 'HR',
      designation: 'HR Executive',
      manager: 'Neha Gupta',
      category: 'Medical',
      expenseDate: '2026-06-03',
      submittedDate: '2026-06-03',
      amount: 3500,
      approvedAmount: 3500,
      description: 'Medical consultation and medicines',
      businessPurpose: 'Health checkup',
      attachments: ['medical_bill.pdf'],
      status: 'Accounts Verified',
      managerApproval: {
        approvedBy: 'Neha Gupta',
        approvedDate: '2026-06-04',
      },
      accountsVerification: {
        verifiedBy: 'Accounts Manager',
        verifiedDate: '2026-06-05',
        verifiedAmount: 3500,
        remarks: 'All receipts verified',
      },
      createdAt: '2026-06-03',
      updatedAt: '2026-06-05',
    },
    {
      id: '3',
      claimNumber: 'EXP-00003',
      employeeId: 'EMP003',
      employeeName: 'Vikram Patel',
      department: 'Engineering',
      designation: 'Software Engineer',
      manager: 'Suresh Reddy',
      category: 'Training',
      expenseDate: '2026-06-05',
      submittedDate: '2026-06-05',
      amount: 25000,
      approvedAmount: 25000,
      description: 'AWS Certification training fee',
      businessPurpose: 'Skill development for cloud infrastructure',
      attachments: ['training_invoice.pdf', 'certificate.pdf'],
      status: 'Finance Approved',
      managerApproval: {
        approvedBy: 'Suresh Reddy',
        approvedDate: '2026-06-06',
      },
      accountsVerification: {
        verifiedBy: 'Accounts Manager',
        verifiedDate: '2026-06-07',
        verifiedAmount: 25000,
      },
      financeApproval: {
        approvedBy: 'Finance Manager',
        approvedDate: '2026-06-08',
      },
      createdAt: '2026-06-05',
      updatedAt: '2026-06-08',
    },
    {
      id: '4',
      claimNumber: 'EXP-00004',
      employeeId: 'EMP004',
      employeeName: 'Anjali Mehta',
      department: 'Marketing',
      designation: 'Marketing Manager',
      manager: 'Rajesh Kumar',
      category: 'Client Meeting',
      expenseDate: '2026-06-10',
      submittedDate: '2026-06-10',
      amount: 8000,
      approvedAmount: 8000,
      description: 'Client dinner and meeting expenses',
      businessPurpose: 'Client relationship building',
      attachments: ['restaurant_bill.pdf'],
      status: 'Paid',
      paymentStatus: 'Completed',
      paymentDate: '2026-06-15',
      paymentReference: 'PAY-2026-06-15-001',
      managerApproval: {
        approvedBy: 'Rajesh Kumar',
        approvedDate: '2026-06-11',
      },
      accountsVerification: {
        verifiedBy: 'Accounts Manager',
        verifiedDate: '2026-06-12',
        verifiedAmount: 8000,
      },
      financeApproval: {
        approvedBy: 'Finance Manager',
        approvedDate: '2026-06-13',
      },
      createdAt: '2026-06-10',
      updatedAt: '2026-06-15',
    },
    {
      id: '5',
      claimNumber: 'EXP-00005',
      employeeId: 'EMP005',
      employeeName: 'Sandeep Kumar',
      department: 'Operations',
      designation: 'Operations Lead',
      manager: 'Meera Nair',
      category: 'Office Supplies',
      expenseDate: '2026-06-12',
      submittedDate: '2026-06-12',
      amount: 12000,
      approvedAmount: 0,
      description: 'Office equipment and supplies',
      businessPurpose: 'Team equipment upgrade',
      attachments: ['invoice.pdf'],
      status: 'Rejected',
      managerApproval: {
        approvedBy: 'Meera Nair',
        approvedDate: '2026-06-13',
        remarks: 'Budget exceeded for this quarter',
      },
      createdAt: '2026-06-12',
      updatedAt: '2026-06-13',
    },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<ExpenseClaim | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [verificationAmount, setVerificationAmount] = useState(0);
  const [verificationRemarks, setVerificationRemarks] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [paymentReference, setPaymentReference] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredClaims = claims.filter(claim => {
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Pending' && ['Submitted', 'Manager Approved', 'Accounts Verified', 'Finance Approved'].includes(claim.status)) ||
      (activeTab === 'Approved' && ['Manager Approved', 'Accounts Verified', 'Finance Approved', 'Paid'].includes(claim.status)) ||
      (activeTab === 'Rejected' && claim.status === 'Rejected') ||
      (activeTab === 'Paid' && claim.status === 'Paid');
    const matchesStatus = selectedStatus === 'All' || claim.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'All' || claim.department === selectedDepartment;
    const matchesCategory = selectedCategory === 'All' || claim.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      claim.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesDepartment && matchesCategory && matchesSearch;
  });

  const totalClaims = claims.length;
  const pendingClaims = claims.filter(c => c.status === 'Submitted' || c.status === 'Manager Approved' || c.status === 'Accounts Verified' || c.status === 'Finance Approved').length;
  const approvedClaims = claims.filter(c => c.status === 'Manager Approved' || c.status === 'Accounts Verified' || c.status === 'Finance Approved' || c.status === 'Paid').length;
  const rejectedClaims = claims.filter(c => c.status === 'Rejected').length;
  const paidClaims = claims.filter(c => c.status === 'Paid').length;
  const totalClaimAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const totalApprovedAmount = claims.reduce((sum, c) => sum + c.approvedAmount, 0);

  const handleView = (claim: ExpenseClaim) => {
    setSelectedClaim(claim);
    setVerificationAmount(claim.approvedAmount);
    setVerificationRemarks('');
    setShowViewModal(true);
  };

  const handleVerify = () => {
    if (!selectedClaim) return;
    setClaims(claims.map(c => 
      c.id === selectedClaim.id 
        ? { 
            ...c, 
            status: 'Accounts Verified' as const,
            accountsVerification: {
              verifiedBy: 'Accounts Manager',
              verifiedDate: new Date().toISOString().split('T')[0],
              verifiedAmount: verificationAmount,
              remarks: verificationRemarks,
            },
            approvedAmount: verificationAmount,
          } 
        : c
    ));
    setShowViewModal(false);
  };

  const handleReject = () => {
    if (!selectedClaim) return;
    const remarks = prompt('Please enter rejection reason:');
    if (remarks) {
      setClaims(claims.map(c => 
        c.id === selectedClaim.id 
          ? { 
              ...c, 
              status: 'Rejected' as const,
              accountsVerification: {
                verifiedBy: 'Accounts Manager',
                verifiedDate: new Date().toISOString().split('T')[0],
                verifiedAmount: 0,
                remarks,
              },
              approvedAmount: 0,
            } 
          : c
      ));
      setShowViewModal(false);
    }
  };

  const handleProcessPayment = () => {
    if (!selectedClaim) return;
    setClaims(claims.map(c => 
      c.id === selectedClaim.id 
        ? { 
            ...c, 
            status: 'Paid' as const,
            paymentStatus: 'Completed' as const,
            paymentDate: new Date().toISOString().split('T')[0],
            paymentReference: paymentReference || `PAY-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          } 
        : c
    ));
    setShowViewModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'Submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Manager Approved': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Accounts Verified': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Finance Approved': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      case 'Paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Expense Claims Management</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage employee reimbursement requests and approvals</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Claims</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalClaims}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Pending Approval</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingClaims}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Approved Claims</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedClaims}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Rejected Claims</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{rejectedClaims}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Paid Claims</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{paidClaims}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Claim Amount</p>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(totalClaimAmount)}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Approved Amount</p>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(totalApprovedAmount)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search employee or claim ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Manager Approved">Manager Approved</option>
            <option value="Accounts Verified">Accounts Verified</option>
            <option value="Finance Approved">Finance Approved</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Categories</option>
            <option value="Travel">Travel</option>
            <option value="Fuel">Fuel</option>
            <option value="Hotel">Hotel</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Internet">Internet</option>
            <option value="Training">Training</option>
            <option value="Client Meeting">Client Meeting</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <FileText className="h-4 w-4" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex gap-4">
          {['All', 'Pending', 'Approved', 'Rejected', 'Paid'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#94cb3d] text-[#94cb3d]'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              {tab} Claims
            </button>
          ))}
        </nav>
      </div>

      {/* Claims Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Claim ID</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Employee</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Dept</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Submitted</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Approved</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Approver</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{claim.claimNumber}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{claim.employeeName}</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">{claim.employeeId}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">{claim.department}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">{claim.category}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">{new Date(claim.submittedDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(claim.amount)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(claim.approvedAmount)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {claim.managerApproval?.approvedBy || claim.accountsVerification?.verifiedBy || claim.financeApproval?.approvedBy || '-'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleView(claim)}
                      className="text-[#94cb3d] hover:text-[#7ab52f] flex items-center gap-1"
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

      {/* View Modal */}
      {showViewModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-4xl w-full my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Claim Details</h2>
                <p className="text-zinc-600 dark:text-zinc-400">{selectedClaim.claimNumber}</p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Employee Information */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Employee Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Name</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Employee ID</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Department</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.department}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Designation</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.designation}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Manager</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.manager}</p>
                  </div>
                </div>
              </div>

              {/* Expense Details */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Expense Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Claim Number</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.claimNumber}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Expense Date</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{new Date(selectedClaim.expenseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Category</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.category}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Claimed Amount</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedClaim.amount)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Approved Amount</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedClaim.approvedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedClaim.status)}`}>
                      {selectedClaim.status}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-zinc-600 dark:text-zinc-400">Description</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.description}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-zinc-600 dark:text-zinc-400">Business Purpose</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedClaim.businessPurpose}</p>
                  </div>
                </div>
              </div>

              {/* Receipt Attachments */}
              {selectedClaim.attachments.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Receipt Attachments</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700">
                        <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        <span className="text-sm text-zinc-900 dark:text-zinc-50">{attachment}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">Preview</button>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approval Workflow */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Approval Workflow</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Employee Submitted</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{new Date(selectedClaim.submittedDate).toLocaleString()}</p>
                    </div>
                  </div>
                  {selectedClaim.managerApproval && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Manager Approved</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.managerApproval.approvedBy} - {new Date(selectedClaim.managerApproval.approvedDate).toLocaleDateString()}</p>
                        {selectedClaim.managerApproval.remarks && <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.managerApproval.remarks}</p>}
                      </div>
                    </div>
                  )}
                  {selectedClaim.accountsVerification && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Accounts Verified</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.accountsVerification.verifiedBy} - {new Date(selectedClaim.accountsVerification.verifiedDate).toLocaleDateString()}</p>
                        {selectedClaim.accountsVerification.remarks && <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.accountsVerification.remarks}</p>}
                      </div>
                    </div>
                  )}
                  {selectedClaim.financeApproval && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Finance Approved</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.financeApproval.approvedBy} - {new Date(selectedClaim.financeApproval.approvedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  {selectedClaim.status === 'Paid' && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Payment Completed</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedClaim.paymentDate && new Date(selectedClaim.paymentDate).toLocaleDateString()}</p>
                        {selectedClaim.paymentReference && <p className="text-xs text-zinc-600 dark:text-zinc-400">Ref: {selectedClaim.paymentReference}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Accounts Verification Section */}
              {(selectedClaim.status === 'Manager Approved' || selectedClaim.status === 'Submitted') && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Accounts Verification</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Claim Amount</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedClaim.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Verified Amount</p>
                        <input
                          type="number"
                          value={verificationAmount}
                          onChange={(e) => setVerificationAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Verification Remarks</p>
                      <textarea
                        value={verificationRemarks}
                        onChange={(e) => setVerificationRemarks(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleVerify}
                        className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={handleReject}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Processing Section */}
              {!['Paid', 'Rejected'].includes(selectedClaim.status) && ['Finance Approved', 'Accounts Verified'].includes(selectedClaim.status) && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Payment Processing</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Payment Method</p>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                        >
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="UPI">UPI</option>
                          <option value="Cash">Cash</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Reference Number</p>
                        <input
                          type="text"
                          value={paymentReference}
                          onChange={(e) => setPaymentReference(e.target.value)}
                          placeholder="Optional"
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleProcessPayment}
                      className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
                    >
                      Mark as Paid
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
