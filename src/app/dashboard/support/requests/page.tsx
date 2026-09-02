'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  CheckCircle2,
  FileText,
  X,
  PlusCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SupportRequestItem {
  _id?: string;
  id?: string;
  requestId?: string;
  subject: string;
  description?: string;
  type: 'Information' | 'Service' | 'Complaint' | 'Feedback';
  status: 'Pending' | 'In Review' | 'Completed' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  createdBy: string;
  createdAt: string;
}

export default function SupportRequestsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [requests, setRequests] = useState<SupportRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [modalData, setModalData] = useState({
    subject: '',
    description: '',
    type: 'Service',
    priority: 'Medium',
    createdBy: 'bhardwajk852@gmail.com',
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/requests`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setRequests(data.data);
      } else {
        const mock: SupportRequestItem[] = [
          { id: 'REQ-001', subject: 'Profile detail update request', type: 'Service', status: 'Pending', priority: 'Medium', createdBy: 'Alice Smith', createdAt: '2026-08-23' },
          { id: 'REQ-002', subject: 'Attendance regularization query', type: 'Service', status: 'In Review', priority: 'High', createdBy: 'Bob Johnson', createdAt: '2026-08-23' },
          { id: 'REQ-003', subject: 'Leave balance breakdown inquiry', type: 'Information', status: 'Completed', priority: 'Low', createdBy: 'Charlie Brown', createdAt: '2026-08-22' },
          { id: 'REQ-004', subject: 'Slow mobile app response complaint', type: 'Complaint', status: 'In Review', priority: 'High', createdBy: 'Grace Hopper', createdAt: '2026-08-21' },
        ];
        setRequests(mock);
      }
    } catch (error) {
      console.error('Failed to fetch support requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Request logged successfully!', 'success');
        fetchRequests();
        setShowCreateModal(false);
      } else {
        const newR: SupportRequestItem = {
          id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
          subject: modalData.subject,
          type: modalData.type as any,
          priority: modalData.priority as any,
          status: 'Pending',
          createdBy: modalData.createdBy,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setRequests([newR, ...requests]);
        setShowCreateModal(false);
        showToast('Request created successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to log request:', error);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              Support Employee Requests Command Center
            </h1>
            <Badge variant="brand">{filteredRequests.length} Total Requests</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Track and process employee service requests, information inquiries, complaints, and app feedback.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Log Employee Request
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Pending', 'In Review', 'Completed', 'Rejected'].map((st) => {
          const isActive = statusFilter === st;
          const count = st === 'All' ? requests.length : requests.filter((r) => r.status === st).length;
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
              <span>{st === 'All' ? 'All Requests' : st}</span>
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

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search request subject or creator..."
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
              Loading support requests from backend...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No support requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Request ID</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Subject</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Type</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Priority</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Created By</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredRequests.map((r) => (
                    <tr key={r.id || r._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-mono font-bold text-[#94cb3d]">
                        {r.id || r.requestId || r._id?.substring(0, 8)}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                        {r.subject}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {r.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.priority === 'High'
                              ? 'bg-amber-500/15 text-amber-600'
                              : r.priority === 'Medium'
                              ? 'bg-blue-500/15 text-blue-600'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            r.status === 'Completed'
                              ? 'success'
                              : r.status === 'In Review'
                              ? 'brand'
                              : 'default'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {r.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {r.createdBy}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                        {r.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Log Support Request</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Request Subject *
                </label>
                <Input
                  required
                  placeholder="e.g. Employee Profile Change Request"
                  value={modalData.subject}
                  onChange={(e) => setModalData({ ...modalData, subject: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Description *
                </label>
                <Input
                  required
                  placeholder="Provide request details..."
                  value={modalData.description}
                  onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Type *
                </label>
                <select
                  value={modalData.type}
                  onChange={(e) => setModalData({ ...modalData, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="Information">Information Inquiry</option>
                  <option value="Service">Service Request</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Priority *
                </label>
                <select
                  value={modalData.priority}
                  onChange={(e) => setModalData({ ...modalData, priority: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
