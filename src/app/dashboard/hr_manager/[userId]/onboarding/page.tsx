'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Copy,
  ExternalLink,
  Mail,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Building2,
  X,
  FileText,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JoiningLink {
  _id: string;
  token: string;
  employeeName: string;
  email: string;
  departmentId: {
    _id: string;
    name: string;
  };
  joiningDate: string;
  status: 'pending' | 'submitted' | 'expired';
  expiresAt: string;
  submittedAt?: string;
  createdAt: string;
}

export default function OnboardingPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [links, setLinks] = useState<JoiningLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [modalData, setModalData] = useState({
    employeeName: '',
    email: '',
    departmentId: '',
    joiningDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showLinkActions, setShowLinkActions] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/onboarding/joining-links`);
      const data = await response.json();
      if (data.success) {
        setLinks(data.data.joiningForms || []);
      }
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyLink = (token: string) => {
    const link = `${window.location.origin}/joining/${token}`;
    navigator.clipboard.writeText(link);
    showToast('Joining link copied to clipboard!', 'success');
  };

  const handleOpenInNewTab = (token: string) => {
    window.open(`/joining/${token}`, '_blank');
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this joining link?')) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/onboarding/joining-links/${id}/deactivate`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchLinks();
        showToast('Joining link deactivated', 'success');
      }
    } catch (error) {
      console.error('Failed to deactivate link:', error);
    }
  };

  const handleResendEmail = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/onboarding/joining-links/${id}/resend`, {
        method: 'POST',
      });
      if (response.ok) {
        showToast('Onboarding invitation email sent!', 'success');
      }
    } catch (error) {
      console.error('Failed to resend email:', error);
    }
  };

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/onboarding/joining-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modalData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setGeneratedLink(data.data.joiningUrl);
        setShowLinkActions(true);
        fetchLinks();
        showToast('New Joining Link generated!', 'success');
      } else {
        showToast(data.message || 'Failed to generate link', 'error');
      }
    } catch (error) {
      console.error('Failed to generate link:', error);
      showToast('Failed to generate link', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setGeneratedLink('');
    setShowLinkActions(false);
    setModalData({
      employeeName: '',
      email: '',
      departmentId: '',
      joiningDate: '',
    });
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || link.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: links.length,
    pending: links.filter((l) => l.status === 'pending').length,
    submitted: links.filter((l) => l.status === 'submitted').length,
    expired: links.filter((l) => l.status === 'expired').length,
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
              Employee Onboarding Command Center
            </h1>
            <Badge variant="brand">{filteredLinks.length} Active Forms</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Generate digital joining forms, track submission statuses, and dispatch onboarding links.
          </p>
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New Joining Link
        </Button>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: '', label: 'All Links', count: statusCounts.all, icon: UserCheck },
          { id: 'pending', label: 'Pending Submission', count: statusCounts.pending, icon: Clock },
          { id: 'submitted', label: 'Completed Forms', count: statusCounts.submitted, icon: CheckCircle2 },
          { id: 'expired', label: 'Expired / Inactive', count: statusCounts.expired, icon: XCircle },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = statusFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setStatusFilter(cat.id)}
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

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search candidate name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      {/* Command Data Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading onboarding forms...
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No onboarding joining links found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Candidate Name</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Email Address</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Department</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Joining Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Form Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Submission Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredLinks.map((link) => (
                    <tr key={link._id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 text-[#94cb3d] flex items-center justify-center font-bold text-xs shrink-0">
                            {link.employeeName[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                              {link.employeeName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {link.email}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {link.departmentId?.name || 'General'}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                        {new Date(link.joiningDate).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge
                          variant={
                            link.status === 'submitted'
                              ? 'success'
                              : link.status === 'pending'
                              ? 'brand'
                              : 'destructive'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {link.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                        {link.submittedAt ? new Date(link.submittedAt).toLocaleDateString() : '—'}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleCopyLink(link.token)}
                            className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 flex items-center justify-center transition-colors"
                            title="Copy Form Link"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenInNewTab(link.token)}
                            className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 flex items-center justify-center transition-colors"
                            title="Open Form in New Tab"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                          {link.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleResendEmail(link._id)}
                                className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
                                title="Resend Invitation Email"
                              >
                                <Mail className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeactivate(link._id)}
                                className="h-8 w-8 rounded-full bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                                title="Deactivate Link"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}
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

      {/* New Joining Link Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {showLinkActions ? 'Joining Link Ready' : 'Generate New Onboarding Link'}
              </h2>
              <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            {!showLinkActions ? (
              <form onSubmit={handleGenerateLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Employee / Candidate Full Name *
                  </label>
                  <Input
                    required
                    value={modalData.employeeName}
                    onChange={(e) => setModalData({ ...modalData, employeeName: e.target.value })}
                    className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={modalData.email}
                    onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={modalData.departmentId}
                    onChange={(e) => setModalData({ ...modalData, departmentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT Infrastructure</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance & Accounts</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Expected Joining Date *
                  </label>
                  <Input
                    type="date"
                    required
                    value={modalData.joiningDate}
                    onChange={(e) => setModalData({ ...modalData, joiningDate: e.target.value })}
                    className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <Button type="button" variant="outline" size="sm" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={submitting} className="bg-[#94cb3d] text-white">
                    {submitting ? 'Generating...' : 'Generate Link'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    Form Link Generated Successfully!
                  </p>
                  <Input
                    readOnly
                    value={generatedLink}
                    className="text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      showToast('Copied to clipboard!', 'success');
                    }}
                    size="sm"
                    className="flex-1 bg-[#94cb3d] text-white"
                  >
                    Copy Link
                  </Button>
                  <Button
                    onClick={() => window.open(generatedLink, '_blank')}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Open Tab
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
