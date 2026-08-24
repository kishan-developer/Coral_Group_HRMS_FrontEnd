'use client';

import { useEffect, useState } from 'react';
import {
  Bell,
  Check,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Clock,
  DollarSign,
  Megaphone,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notificationsApi, Notification } from '@/services/api';

export type NotificationCategory = 'all' | 'leave' | 'attendance' | 'payroll' | 'announcement' | 'security';

interface NotificationsPageProps {
  userId?: string;
}

export default function NotificationsPage({ userId }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unread' | 'Read'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationsApi.getAll({
        unreadOnly: statusFilter === 'Unread',
        page,
        pageSize,
      });
      setNotifications(response.data.items);
      setTotal(response.data.pagination.total);
      setTotalPages(response.data.pagination.totalPages);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, statusFilter]);

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
      showToast('Notification marked as read', 'success');
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      showToast('All notifications marked as read', 'success');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await notificationsApi.delete(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setTotal((prev) => prev - 1);
      const deleted = notifications.find((n) => n._id === id);
      if (deleted && !deleted.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      showToast('Notification deleted', 'info');
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryFromType = (type?: string): NotificationCategory => {
    if (!type) return 'announcement';
    const lower = type.toLowerCase();
    if (lower.includes('leave')) return 'leave';
    if (lower.includes('attendance') || lower.includes('regularization')) return 'attendance';
    if (lower.includes('payroll') || lower.includes('expense') || lower.includes('salary')) return 'payroll';
    if (lower.includes('security') || lower.includes('role') || lower.includes('permission')) return 'security';
    return 'announcement';
  };

  const filteredNotifications = notifications.filter((n) => {
    const cat = getCategoryFromType(n.type);
    const matchesCategory = activeCategory === 'all' || cat === activeCategory;
    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Unread'
        ? !n.isRead
        : n.isRead;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const counts = {
    all: notifications.length,
    leave: notifications.filter((n) => getCategoryFromType(n.type) === 'leave').length,
    attendance: notifications.filter((n) => getCategoryFromType(n.type) === 'attendance').length,
    payroll: notifications.filter((n) => getCategoryFromType(n.type) === 'payroll').length,
    announcement: notifications.filter((n) => getCategoryFromType(n.type) === 'announcement').length,
    security: notifications.filter((n) => getCategoryFromType(n.type) === 'security').length,
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-zinc-800'
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
              Unified Notifications Command Center
            </h1>
            <Badge variant="brand">{unreadCount} Unread Alerts</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time alerts, approval status updates, payroll announcements, and system audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1.5" />
              Mark All Read
            </Button>
          )}
          <Button
            onClick={fetchNotifications}
            variant="outline"
            size="sm"
            className="rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800"
          >
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Alerts', count: counts.all, icon: Bell },
          { id: 'leave', label: 'Leaves', count: counts.leave, icon: Calendar },
          { id: 'attendance', label: 'Attendance', count: counts.attendance, icon: Clock },
          { id: 'payroll', label: 'Payroll & Expenses', count: counts.payroll, icon: DollarSign },
          { id: 'announcement', label: 'Announcements', count: counts.announcement, icon: Megaphone },
          { id: 'security', label: 'Security & Access', count: counts.security, icon: ShieldCheck },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as NotificationCategory)}
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

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search notifications, subjects, or messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="h-4 w-4 text-zinc-400" />
          {(['All', 'Unread', 'Read'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Command Table / List */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-500">
              Loading notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-zinc-500">No notifications found in this category</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Notification Subject</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Timestamp</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredNotifications.map((item) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors ${
                        !item.isRead ? 'bg-blue-50/20 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-start gap-3">
                          {!item.isRead ? (
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-[#94cb3d] shrink-0" />
                          ) : (
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                          {getCategoryFromType(item.type)}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                        {formatTime(item.createdAt)}
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge
                          variant={!item.isRead ? 'brand' : 'secondary'}
                          className="text-[10px]"
                        >
                          {!item.isRead ? 'Unread' : 'Read'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {!item.isRead && (
                            <button
                              onClick={() => markAsRead(item._id)}
                              className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 flex items-center justify-center transition-all"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(item._id)}
                            className="h-8 w-8 rounded-full bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-500/20 flex items-center justify-center transition-all"
                            title="Delete notification"
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
