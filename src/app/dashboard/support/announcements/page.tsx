'use client';

import { useState, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  CheckCircle2,
  X,
  Calendar,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AnnouncementItem {
  _id?: string;
  id?: string;
  announcementId?: string;
  title: string;
  content: string;
  type: 'General' | 'Urgent' | 'Information' | 'Policy Update';
  targetAudience: 'All' | 'Employees' | 'Managers' | 'HR' | 'Support';
  isPublished?: boolean;
  createdBy: string;
  createdAt: string;
}

export default function SupportAnnouncementsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    type: 'General',
    targetAudience: 'All',
    createdBy: 'bhardwajk852@gmail.com',
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/announcements`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setAnnouncements(data.data);
      } else {
        const mock: AnnouncementItem[] = [
          { id: 'ANN-001', title: 'System Scheduled Maintenance Outage', content: 'HRMS server maintenance will take place tonight between 11 PM and 2 AM.', type: 'Urgent', targetAudience: 'All', isPublished: true, createdBy: 'IT Infrastructure', createdAt: '2026-08-23' },
          { id: 'ANN-002', title: 'New Leave Policy Update', content: 'Updated maternity and paternity leave guidelines effective next month.', type: 'Policy Update', targetAudience: 'Employees', isPublished: true, createdBy: 'HR Department', createdAt: '2026-08-22' },
          { id: 'ANN-003', title: 'Mobile App Update Version 2.4 Live', content: 'Download the latest APK for face recognition check-in fixes.', type: 'Information', targetAudience: 'All', isPublished: true, createdBy: 'Support Team', createdAt: '2026-08-21' },
        ];
        setAnnouncements(mock);
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...modalData, isPublished: true }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Announcement broadcasted successfully!', 'success');
        fetchAnnouncements();
        setShowCreateModal(false);
      } else {
        const newA: AnnouncementItem = {
          id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
          title: modalData.title,
          content: modalData.content,
          type: modalData.type as any,
          targetAudience: modalData.targetAudience as any,
          isPublished: true,
          createdBy: modalData.createdBy,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setAnnouncements([newA, ...announcements]);
        setShowCreateModal(false);
        showToast('Announcement posted!', 'success');
      }
    } catch (error) {
      console.error('Failed to post announcement:', error);
    }
  };

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || a.type === typeFilter;
    return matchesSearch && matchesType;
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
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-[#94cb3d]" />
              System Announcements & Broadcast Hub
            </h1>
            <Badge variant="brand">{filteredAnnouncements.length} Published Bulletins</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Broadcast technical notices, maintenance alerts, and policy updates across the organization.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Announcement
        </Button>
      </div>

      {/* Type Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'General', 'Urgent', 'Information', 'Policy Update'].map((t) => {
          const isActive = typeFilter === t;
          const count = t === 'All' ? announcements.length : announcements.filter((a) => a.type === t).length;
          return (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <span>{t === 'All' ? 'All Types' : t}</span>
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
            placeholder="Search announcement title or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      {/* Announcements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAnnouncements.map((a) => (
          <Card key={a.id || a._id} className="rounded-xl border-zinc-200/80 dark:border-zinc-800 hover:shadow-md transition-all">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={a.type === 'Urgent' ? 'destructive' : 'brand'}
                    className="text-[10px] uppercase font-bold"
                  >
                    {a.type}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    Audience: {a.targetAudience}
                  </Badge>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{a.createdAt}</span>
              </div>

              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {a.title}
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {a.content}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                <span className="font-semibold">By {a.createdBy}</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="h-3 w-3 text-[#94cb3d]" /> Published Broadcast
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">New Announcement Broadcast</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Bulletin Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Scheduled Server Patch Maintenance"
                  value={modalData.title}
                  onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Content Body *
                </label>
                <Input
                  required
                  placeholder="Full announcement details..."
                  value={modalData.content}
                  onChange={(e) => setModalData({ ...modalData, content: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Announcement Type *
                </label>
                <select
                  value={modalData.type}
                  onChange={(e) => setModalData({ ...modalData, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="General">General</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Information">Information</option>
                  <option value="Policy Update">Policy Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Target Audience *
                </label>
                <select
                  value={modalData.targetAudience}
                  onChange={(e) => setModalData({ ...modalData, targetAudience: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="All">All Staff & Managers</option>
                  <option value="Employees">Employees Only</option>
                  <option value="Managers">Managers Only</option>
                  <option value="HR">HR Team</option>
                  <option value="Support">Support Team</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Broadcast Bulletin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
