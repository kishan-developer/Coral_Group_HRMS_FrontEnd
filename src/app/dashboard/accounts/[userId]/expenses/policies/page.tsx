'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Download, Upload, Eye, Edit, Copy, Archive, Trash2, FileText, Calendar, Settings, Users, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { useParams } from 'next/navigation';

interface ExpensePolicy {
  id: string;
  policyCode: string;
  policyName: string;
  description: string;
  categories: string[];
  departments: string[];
  maxLimit: number;
  approvalLevels: number;
  effectiveFrom: string;
  effectiveTo?: string;
  status: 'Active' | 'Draft' | 'Inactive' | 'Expired';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: string;
}

export default function ExpensePolicies() {
  const params = useParams();
  const userId = params.userId as string;

  const [policies, setPolicies] = useState<ExpensePolicy[]>([
    {
      id: '1',
      policyCode: 'EXP-001',
      policyName: 'Travel Expense Policy',
      description: 'Travel expenses for business trips and client meetings',
      categories: ['Travel', 'Hotel', 'Food'],
      departments: ['Sales', 'Engineering', 'Management'],
      maxLimit: 25000,
      approvalLevels: 3,
      effectiveFrom: '2026-01-01',
      effectiveTo: '2026-12-31',
      status: 'Active',
      createdBy: 'Accounts Admin',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      version: '1.0',
    },
    {
      id: '2',
      policyCode: 'EXP-002',
      policyName: 'Medical Reimbursement Policy',
      description: 'Medical expenses for employees and dependents',
      categories: ['Medical'],
      departments: ['All'],
      maxLimit: 50000,
      approvalLevels: 2,
      effectiveFrom: '2026-01-01',
      status: 'Active',
      createdBy: 'HR Admin',
      createdAt: '2026-01-15',
      updatedAt: '2026-01-15',
      version: '1.0',
    },
    {
      id: '3',
      policyCode: 'EXP-003',
      policyName: 'Training & Development Policy',
      description: 'Training and skill development expenses',
      categories: ['Training', 'Education'],
      departments: ['Engineering', 'HR'],
      maxLimit: 100000,
      approvalLevels: 3,
      effectiveFrom: '2026-02-01',
      status: 'Active',
      createdBy: 'HR Admin',
      createdAt: '2026-02-01',
      updatedAt: '2026-02-01',
      version: '1.0',
    },
    {
      id: '4',
      policyCode: 'EXP-004',
      policyName: 'Office Supplies Policy',
      description: 'Office equipment and supplies',
      categories: ['Office Supplies', 'Equipment'],
      departments: ['All'],
      maxLimit: 10000,
      approvalLevels: 2,
      effectiveFrom: '2026-03-01',
      status: 'Draft',
      createdBy: 'Operations Admin',
      createdAt: '2026-03-01',
      updatedAt: '2026-03-01',
      version: '1.0',
    },
    {
      id: '5',
      policyCode: 'EXP-005',
      policyName: 'Client Entertainment Policy',
      description: 'Client meeting and entertainment expenses',
      categories: ['Food', 'Entertainment'],
      departments: ['Sales', 'Marketing'],
      maxLimit: 15000,
      approvalLevels: 3,
      effectiveFrom: '2025-01-01',
      effectiveTo: '2025-12-31',
      status: 'Expired',
      createdBy: 'Sales Admin',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      version: '1.0',
    },
  ]);

  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<ExpensePolicy | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [formData, setFormData] = useState({
    policyName: '',
    policyCode: '',
    description: '',
    status: 'Draft' as 'Active' | 'Draft' | 'Inactive',
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: '',
    categories: [] as string[],
    departments: [] as string[],
    maxLimit: 0,
    approvalLevels: 1,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesStatus = selectedStatus === 'All' || policy.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'All' || policy.departments.includes(selectedDepartment) || policy.departments.includes('All');
    const matchesCategory = selectedCategory === 'All' || policy.categories.includes(selectedCategory);
    const matchesSearch = searchTerm === '' || 
      policy.policyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesDepartment && matchesCategory && matchesSearch;
  });

  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => p.status === 'Active').length;
  const draftPolicies = policies.filter(p => p.status === 'Draft').length;
  const expiredPolicies = policies.filter(p => p.status === 'Expired').length;
  const totalCategories = [...new Set(policies.flatMap(p => p.categories))].length;
  const totalEmployees = 150; // Mock data

  const handleCreate = () => {
    if (!formData.policyName || !formData.policyCode) return;

    const newPolicy: ExpensePolicy = {
      id: Date.now().toString(),
      ...formData,
      createdBy: 'Accounts Admin',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: '1.0',
    };

    setPolicies([newPolicy, ...policies]);
    setShowCreateModal(false);
    setFormData({
      policyName: '',
      policyCode: '',
      description: '',
      status: 'Draft',
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: '',
      categories: [],
      departments: [],
      maxLimit: 0,
      approvalLevels: 1,
    });
  };

  const handleView = (policy: ExpensePolicy) => {
    setSelectedPolicy(policy);
    setActiveTab('Overview');
    setShowViewModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const handleArchive = (id: string) => {
    setPolicies(policies.map(p => 
      p.id === id ? { ...p, status: 'Inactive' as const } : p
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'Inactive': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categoryOptions = ['Travel', 'Fuel', 'Hotel', 'Food', 'Medical', 'Office Supplies', 'Training', 'Internet', 'Client Meeting', 'Entertainment', 'Miscellaneous'];
  const departmentOptions = ['Sales', 'Engineering', 'HR', 'Marketing', 'Operations', 'Finance', 'All'];

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleDepartment = (department: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department]
    }));
  };

  return (
    <div className="p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Expense Policies</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Configure reimbursement rules, limits, approvals, and expense categories</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg hover:bg-[#7ab52f] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Policy
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Policies</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalPolicies}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Active Policies</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{activePolicies}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Draft Policies</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{draftPolicies}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Expired Policies</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{expiredPolicies}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Categories Covered</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalCategories}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Employees Assigned</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalEmployees}</p>
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
                placeholder="Search policy..."
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
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Expired">Expired</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Departments</option>
            {departmentOptions.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Categories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Policy Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Code</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Policy Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Categories</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Department</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Max Limit</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Approval</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Effective</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{policy.policyCode}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{policy.policyName}</td>
                  <td className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-[150px] truncate">{policy.categories.join(', ')}</td>
                  <td className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-[100px] truncate">{policy.departments.join(', ')}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(policy.maxLimit)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">{policy.approvalLevels} Levels</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">{new Date(policy.effectiveFrom).toLocaleDateString()}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleView(policy)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-amber-600 hover:text-amber-800"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-800"
                        title="Clone"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleArchive(policy.id)}
                        className="text-zinc-600 hover:text-zinc-800"
                        title="Archive"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(policy.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-4xl w-full my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create New Policy</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Configure expense reimbursement rules</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Policy Name *</label>
                    <input
                      type="text"
                      value={formData.policyName}
                      onChange={(e) => setFormData({ ...formData, policyName: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Policy Code *</label>
                    <input
                      type="text"
                      value={formData.policyCode}
                      onChange={(e) => setFormData({ ...formData, policyCode: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Effective From</label>
                    <input
                      type="date"
                      value={formData.effectiveFrom}
                      onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Effective To (Optional)</label>
                    <input
                      type="date"
                      value={formData.effectiveTo}
                      onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Max Limit</label>
                    <input
                      type="number"
                      value={formData.maxLimit}
                      onChange={(e) => setFormData({ ...formData, maxLimit: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Approval Levels</label>
                    <input
                      type="number"
                      value={formData.approvalLevels}
                      onChange={(e) => setFormData({ ...formData, approvalLevels: Number(e.target.value) })}
                      min="1"
                      max="5"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>
                </div>
              </div>

              {/* Expense Categories */}
              <div className="space-y-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Expense Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categoryOptions.map(category => (
                    <label key={category} className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-600 rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-[#94cb3d] focus:ring-[#94cb3d]"
                      />
                      <span className="text-sm text-zinc-900 dark:text-zinc-50">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Departments */}
              <div className="space-y-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Applicable Departments</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departmentOptions.map(department => (
                    <label key={department} className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-600 rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700">
                      <input
                        type="checkbox"
                        checked={formData.departments.includes(department)}
                        onChange={() => toggleDepartment(department)}
                        className="h-4 w-4 text-[#94cb3d] focus:ring-[#94cb3d]"
                      />
                      <span className="text-sm text-zinc-900 dark:text-zinc-50">{department}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Policy Modal */}
      {showViewModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-4xl w-full my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{selectedPolicy.policyName}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">{selectedPolicy.policyCode}</p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-zinc-200 dark:border-zinc-700 mb-6">
              <nav className="flex gap-4">
                {['Overview', 'Categories & Limits', 'Approval Workflow', 'Eligibility', 'Documents', 'Audit Logs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[#94cb3d] text-[#94cb3d]'
                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {activeTab === 'Overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Policy Code</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.policyCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Status</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPolicy.status)}`}>
                        {selectedPolicy.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Effective From</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{new Date(selectedPolicy.effectiveFrom).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Effective To</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.effectiveTo ? new Date(selectedPolicy.effectiveTo).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Max Limit</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{formatCurrency(selectedPolicy.maxLimit)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Approval Levels</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.approvalLevels}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Version</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Created By</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.createdBy}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Description</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{selectedPolicy.description}</p>
                  </div>
                </div>
              )}

              {activeTab === 'Categories & Limits' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Categories Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPolicy.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm text-zinc-900 dark:text-zinc-50">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Expense Limits</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-700">
                          <th className="py-2 text-left">Category</th>
                          <th className="py-2 text-right">Daily Limit</th>
                          <th className="py-2 text-right">Monthly Limit</th>
                          <th className="py-2 text-right">Annual Limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPolicy.categories.map((category, index) => (
                          <tr key={index} className="border-b border-zinc-200 dark:border-zinc-700">
                            <td className="py-2">{category}</td>
                            <td className="py-2 text-right">{formatCurrency(selectedPolicy.maxLimit * 0.1)}</td>
                            <td className="py-2 text-right">{formatCurrency(selectedPolicy.maxLimit * 0.5)}</td>
                            <td className="py-2 text-right">{formatCurrency(selectedPolicy.maxLimit)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'Approval Workflow' && (
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Approval Flow</p>
                    <div className="space-y-3">
                      {[...Array(selectedPolicy.approvalLevels)].map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#94cb3d] flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-zinc-900 dark:text-zinc-50">
                              {index === 0 && 'Reporting Manager'}
                              {index === 1 && 'Department Head'}
                              {index === 2 && 'Accounts Team'}
                              {index === 3 && 'Finance Head'}
                              {index === 4 && 'CEO'}
                            </p>
                          </div>
                          {index < selectedPolicy.approvalLevels - 1 && (
                            <div className="text-zinc-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Eligibility' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Applicable Departments</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPolicy.departments.map((dept, index) => (
                        <span key={index} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm text-zinc-900 dark:text-zinc-50">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Documents' && (
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg text-center">
                    <FileText className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">No documents uploaded</p>
                    <button className="mt-4 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
                      Upload Document
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Audit Logs' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Policy Created</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedPolicy.createdBy} - {new Date(selectedPolicy.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Last Updated</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{new Date(selectedPolicy.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>
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
