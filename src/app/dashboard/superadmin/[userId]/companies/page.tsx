'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Company {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'expired';
  subscriptionPlan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  employeeCount?: number;
  createdAt: string;
}

export default function CompaniesList() {
  const params = useParams();
  const userId = params.userId as string;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${BACKEND_URL}/companies`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCompanies(data.data.companies || []);
      } else {
        setCompanies([
          {
            id: 'comp-1',
            name: 'Coral Group Head Office',
            code: 'CORAL-HQ',
            email: 'admin@coral-group.in',
            phone: '+91 98765 43210',
            subscriptionStatus: 'active',
            subscriptionPlan: 'enterprise',
            status: 'active',
            employeeCount: 142,
            createdAt: new Date().toISOString(),
          },
          {
            id: 'comp-2',
            name: 'Coral Tech Solutions Pvt Ltd',
            code: 'CORAL-TECH',
            email: 'info@coral-tech.in',
            phone: '+91 98765 11223',
            subscriptionStatus: 'active',
            subscriptionPlan: 'professional',
            status: 'active',
            employeeCount: 68,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([
        {
          id: 'comp-1',
          name: 'Coral Group Head Office',
          code: 'CORAL-HQ',
          email: 'admin@coral-group.in',
          phone: '+91 98765 43210',
          subscriptionStatus: 'active',
          subscriptionPlan: 'enterprise',
          status: 'active',
          employeeCount: 142,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'comp-2',
          name: 'Coral Tech Solutions Pvt Ltd',
          code: 'CORAL-TECH',
          email: 'info@coral-tech.in',
          phone: '+91 98765 11223',
          subscriptionStatus: 'active',
          subscriptionPlan: 'professional',
          status: 'active',
          employeeCount: 68,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (companyId: string, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/companies/${companyId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchCompanies();
      setToast({ message: `Company status updated to ${newStatus}`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error('Error updating company status:', error);
    }
  };

  const handleDelete = async (companyId: string) => {
    if (confirm('Are you sure you want to delete this company record?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/companies/${companyId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchCompanies();
        setToast({ message: 'Company record deleted', type: 'success' });
        setTimeout(() => setToast(null), 3000);
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: companies.length,
    active: companies.filter((c) => c.status === 'active').length,
    inactive: companies.filter((c) => c.status === 'inactive').length,
    suspended: companies.filter((c) => c.status === 'suspended').length,
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Companies Directory Command Center
            </h1>
            <Badge variant="brand">{filteredCompanies.length} Registered Entities</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Manage multi-company accounts, subscription plans, domain codes, and enterprise tenancy.
          </p>
        </div>

        <Link
          href={`/dashboard/superadmin/${userId}/companies/create`}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#94cb3d] text-white rounded-lg font-medium hover:bg-[#82b632] transition-all shadow-sm text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </Link>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Entities', count: statusCounts.all, icon: Building2 },
          { id: 'active', label: 'Active', count: statusCounts.active, icon: CheckCircle2 },
          { id: 'inactive', label: 'Inactive', count: statusCounts.inactive, icon: XCircle },
          { id: 'suspended', label: 'Suspended', count: statusCounts.suspended, icon: ShieldCheck },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = filterStatus === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterStatus(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search company name, code, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium"
          />
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading company records...
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No company records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Company Entity</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Company Code</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Subscription Plan</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Employees</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Created Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center font-bold text-xs text-[#94cb3d] shrink-0">
                            <Building2 className="h-4 w-4 text-[#94cb3d]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {company.name}
                            </p>
                            <p className="text-[10px] text-zinc-500">{company.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {company.code}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                          {company.subscriptionPlan}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            company.status === 'active'
                              ? 'success'
                              : company.status === 'suspended'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {company.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {company.employeeCount || 0}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                        {new Date(company.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/superadmin/${userId}/companies/${company.id}`}
                            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 text-[10px] font-medium"
                          >
                            View
                          </Link>
                          {company.status === 'active' ? (
                            <button
                              onClick={() => handleStatusChange(company.id, 'suspended')}
                              className="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white text-[10px] font-medium transition-colors"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(company.id, 'active')}
                              className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white text-[10px] font-medium transition-colors"
                            >
                              Activate
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white text-[10px] font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
