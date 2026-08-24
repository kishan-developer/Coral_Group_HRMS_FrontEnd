'use client';

import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, TrendingUp, Download, Filter, Plus, Search } from 'lucide-react';

interface Subscription {
  id: string;
  company: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  startDate: string;
}

export default function SubscriptionsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/super-admin/subscriptions`);
        const data = await response.json();
        if (data.success) {
          setSubscriptions(data.data);
        }
      } catch (error) {
        setSubscriptions([
          { id: '1', company: 'Acme Corporation', plan: 'enterprise', status: 'active', amount: 999, billingCycle: 'monthly', nextBillingDate: '2024-02-15', startDate: '2024-01-15' },
          { id: '2', company: 'Tech Solutions Ltd', plan: 'professional', status: 'active', amount: 299, billingCycle: 'monthly', nextBillingDate: '2024-02-20', startDate: '2024-01-20' },
          { id: '3', company: 'Global Industries', plan: 'starter', status: 'trial', amount: 0, billingCycle: 'monthly', nextBillingDate: '2024-02-10', startDate: '2024-01-10' },
          { id: '4', company: 'StartupXYZ', plan: 'professional', status: 'expired', amount: 299, billingCycle: 'monthly', nextBillingDate: '2024-01-05', startDate: '2023-12-05' },
          { id: '5', company: 'Innovate Ltd', plan: 'enterprise', status: 'active', amount: 999, billingCycle: 'yearly', nextBillingDate: '2025-01-01', startDate: '2024-01-01' },
        ]);
      }
    };
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'all' || sub.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const statusColors = {
    active: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    trial: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    expired: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    cancelled: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  };

  const planColors = {
    starter: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    professional: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    enterprise: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  const totalRevenue = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-500" />
            Subscription Management
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Manage company subscriptions and billing</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="h-4 w-4" />
            New Subscription
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Monthly Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{subscriptions.filter(s => s.status === 'active').length}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Active Subscriptions</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{subscriptions.filter(s => s.status === 'trial').length}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Trial Accounts</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Filter className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{subscriptions.filter(s => s.status === 'expired').length}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Expired</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-50"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-50"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Billing Cycle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Next Billing</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">{sub.company}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${planColors[sub.plan]}`}>
                      {sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[sub.status]}`}>
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">${sub.amount}/mo</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{sub.billingCycle}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{sub.nextBillingDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
