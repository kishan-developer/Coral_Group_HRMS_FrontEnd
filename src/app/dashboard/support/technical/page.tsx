'use client';

import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  Bug,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface TechnicalIssueItem {
  _id?: string;
  id?: string;
  issueId?: string;
  title: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Reported' | 'Investigating' | 'In Progress' | 'Resolved';
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
}

export default function TechnicalIssuesPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [issues, setIssues] = useState<TechnicalIssueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchTechnicalIssues();
  }, []);

  const fetchTechnicalIssues = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/technical-issues`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setIssues(data.data);
      } else {
        const mock: TechnicalIssueItem[] = [
          { id: 'ISS-001', title: 'Server high latency - payroll database cluster', category: 'Infrastructure', severity: 'Critical', status: 'In Progress', reportedBy: 'Alice Smith', assignedTo: 'John Doe', createdAt: '2026-08-23' },
          { id: 'ISS-002', title: 'Biometric device data sync timeout', category: 'Hardware', severity: 'Critical', status: 'Investigating', reportedBy: 'Bob Johnson', assignedTo: 'Jane Smith', createdAt: '2026-08-23' },
          { id: 'ISS-003', title: 'Mobile app push notification delay', category: 'Mobile', severity: 'High', status: 'Reported', reportedBy: 'Diana Prince', createdAt: '2026-08-22' },
          { id: 'ISS-004', title: 'Slow page load times on reports tab', category: 'Performance', severity: 'Medium', status: 'In Progress', reportedBy: 'Eva Green', assignedTo: 'Sarah Davis', createdAt: '2026-08-21' },
        ];
        setIssues(mock);
      }
    } catch (error) {
      console.error('Failed to fetch technical issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = issues.filter((i) => {
    const matchesSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const criticalCount = issues.filter((i) => i.severity === 'Critical' && i.status !== 'Resolved').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 bg-[#94cb3d]">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Bug className="h-5 w-5 text-amber-500" />
              Technical Issues & Bug Command Center
            </h1>
            <Badge variant="brand">{filteredIssues.length} Reported Incidents</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Monitor, investigate, and resolve system outages, hardware glitches, and backend API errors.
          </p>
        </div>
      </div>

      {/* Critical Alert */}
      {criticalCount > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
            <span className="text-xs font-bold text-red-700 dark:text-red-400">
              {criticalCount} Critical Outage Incidents Currently Active — Immediate Developer Attention Needed!
            </span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Reported', 'Investigating', 'In Progress', 'Resolved'].map((st) => {
          const isActive = statusFilter === st;
          const count = st === 'All' ? issues.length : issues.filter((i) => i.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <span>{st === 'All' ? 'All Incidents' : st}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search bug title, category, or reporter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading technical incidents from backend...
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="text-center py-12">
              <Bug className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No technical issues found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Issue ID</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Incident Title</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Severity</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Reported By</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredIssues.map((i) => (
                    <tr key={i.id || i._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-mono font-bold text-[#94cb3d]">
                        {i.id || i.issueId || i._id?.substring(0, 8)}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                        {i.title}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {i.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            i.severity === 'Critical'
                              ? 'bg-red-500/15 text-red-600'
                              : i.severity === 'High'
                              ? 'bg-amber-500/15 text-amber-600'
                              : i.severity === 'Medium'
                              ? 'bg-blue-500/15 text-blue-600'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          {i.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            i.status === 'Resolved'
                              ? 'success'
                              : i.status === 'In Progress'
                              ? 'brand'
                              : 'default'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {i.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {i.reportedBy}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-500">
                        {i.assignedTo || 'Unassigned'}
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
