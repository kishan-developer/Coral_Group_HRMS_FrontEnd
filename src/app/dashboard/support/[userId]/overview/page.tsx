'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  LifeBuoy,
  Plus,
  Search,
  MessageSquare,
  Wrench,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  CheckCircle2,
  Clock,
  User,
  ArrowUpRight,
  Eye,
  Check,
  X,
  ExternalLink,
  ThumbsUp,
  Megaphone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getToken } from '@/lib/auth';

export interface SupportTicket {
  id: string;
  ticketCode: string;
  subject: string;
  category: string;
  requesterName: string;
  requesterEmail: string;
  requesterRole: string;
  priority: string;
  status: string;
  createdAt: string;
  assignedAgent?: string;
  rawId?: string;
}

export interface ChatQueueSession {
  id: string;
  userName: string;
  userEmail: string;
  userRole: string;
  status: string;
  lastMessage: string;
  waitTime: string;
  unreadCount: number;
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  helpfulCount: number;
  author: string;
  updatedAt: string;
  summary: string;
}

export interface SupportAnnouncement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetAudience: string;
  createdAt: string;
  author: string;
}

export type SupportTab = 'all' | 'chat' | 'technical' | 'kb' | 'reports' | 'announcements' | 'settings';

export default function SupportDashboardOverview() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/v1\/?$/, '');

  const [activeTab, setActiveTab] = useState<SupportTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [kbCategoryFilter, setKbCategoryFilter] = useState<string>('All');
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states for creating new ticket
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<string>('IT Support');
  const [newPriority, setNewPriority] = useState<string>('Medium');

  // Settings state
  const [slaResponseTime, setSlaResponseTime] = useState('15 mins');
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [workingHours, setWorkingHours] = useState('09:00 AM - 07:00 PM EST');

  // Datasets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'st-1',
      ticketCode: 'TICK-1092',
      subject: 'Unable to download March Payslip PDF',
      category: 'Payroll & Tax',
      requesterName: 'Rahul Sharma',
      requesterEmail: 'rahul.s@coral-group.in',
      requesterRole: 'Employee',
      priority: 'High',
      status: 'Open',
      createdAt: '2026-08-23 10:15 AM',
      assignedAgent: 'Support Agent A',
    },
    {
      id: 'st-2',
      ticketCode: 'TICK-1091',
      subject: 'Biometric Attendance Punch Mismatch',
      category: 'IT Support',
      requesterName: 'Priya Verma',
      requesterEmail: 'priya.v@coral-group.in',
      requesterRole: 'HR Manager',
      priority: 'Urgent',
      status: 'In Progress',
      createdAt: '2026-08-23 09:30 AM',
      assignedAgent: 'Tech Specialist B',
    },
    {
      id: 'st-3',
      ticketCode: 'TICK-1090',
      subject: 'Access Control Permission Request for Finance Lead',
      category: 'Access Control',
      requesterName: 'Amit Patel',
      requesterEmail: 'amit.p@coral-group.in',
      requesterRole: 'Accounts Lead',
      priority: 'Medium',
      status: 'Pending User',
      createdAt: '2026-08-22 04:45 PM',
      assignedAgent: 'Admin Support',
    },
    {
      id: 'st-4',
      ticketCode: 'TICK-1089',
      subject: 'Form-16 Tax Exemption Certificate Query',
      category: 'Payroll & Tax',
      requesterName: 'Neha Gupta',
      requesterEmail: 'neha.g@coral-group.in',
      requesterRole: 'Employee',
      priority: 'Low',
      status: 'Resolved',
      createdAt: '2026-08-21 02:20 PM',
      assignedAgent: 'Payroll Team',
    },
    {
      id: 'st-5',
      ticketCode: 'TICK-1088',
      subject: 'SuperAdmin Dashboard Loading Latency Bug',
      category: 'System Bug',
      requesterName: 'Super Admin',
      requesterEmail: 'adminit@coral-group.in',
      requesterRole: 'Super Admin',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2026-08-20 11:00 AM',
      assignedAgent: 'DevOps Lead',
    },
  ]);

  const [chatQueue, setChatQueue] = useState<ChatQueueSession[]>([
    {
      id: 'chat-101',
      userName: 'Vikram Seth',
      userEmail: 'vikram.seth@company.com',
      userRole: 'Employee',
      status: 'Active',
      lastMessage: 'I need assistance with my leave balance synchronization.',
      waitTime: '2 mins ago',
      unreadCount: 2,
    },
    {
      id: 'chat-102',
      userName: 'Ananya Roy',
      userEmail: 'ananya.roy@company.com',
      userRole: 'HR Manager',
      status: 'Waiting',
      lastMessage: 'Can someone verify the new employee onboarding documents?',
      waitTime: '5 mins ago',
      unreadCount: 1,
    },
  ]);

  const [kbArticles, setKbArticles] = useState<KBArticle[]>([
    {
      id: 'kb-1',
      title: 'How to Reset Your HRMS Employee Portal Password',
      category: 'Account Access',
      views: 342,
      helpfulCount: 89,
      author: 'Support Admin',
      updatedAt: '2026-08-15',
      summary: 'Step-by-step guide to resetting forgotten passwords and enabling 2FA security.',
    },
    {
      id: 'kb-2',
      title: 'Understanding Payslip Deductions & Tax Exemptions',
      category: 'Payroll & Tax',
      views: 521,
      helpfulCount: 142,
      author: 'Accounts Team',
      updatedAt: '2026-08-18',
      summary: 'Comprehensive explanation of HRA, PF, Tax brackets, and monthly salary slip components.',
    },
    {
      id: 'kb-3',
      title: 'Biometric Attendance Punch Troubleshooting & Device Sync',
      category: 'IT Support',
      views: 290,
      helpfulCount: 67,
      author: 'IT Specialist',
      updatedAt: '2026-08-20',
      summary: 'Fix common attendance log sync delays and fingerprint scanner connection failures.',
    },
    {
      id: 'kb-4',
      title: 'Submitting & Tracking Leave Applications and Approvals',
      category: 'Leave Policy',
      views: 415,
      helpfulCount: 110,
      author: 'HR Lead',
      updatedAt: '2026-08-22',
      summary: 'How to apply for Casual, Sick, and Paid leave and check approval status in real time.',
    },
  ]);

  const [announcements, setAnnouncements] = useState<SupportAnnouncement[]>([
    {
      id: 'ann-1',
      title: 'Scheduled System Maintenance: HRMS Server Upgrade',
      content: 'The HRMS portal will undergo routine backend server maintenance on Sunday at 02:00 AM EST for 2 hours.',
      type: 'Urgent',
      targetAudience: 'All Users',
      createdAt: '2026-08-22',
      author: 'DevOps & Support',
    },
    {
      id: 'ann-2',
      title: 'New Feature Released: Instant Reimbursement Uploads',
      content: 'Employees can now directly scan and upload expense receipts via the mobile web portal.',
      type: 'Information',
      targetAudience: 'Employees & Managers',
      createdAt: '2026-08-21',
      author: 'Product Team',
    },
    {
      id: 'ann-3',
      title: 'Updated Financial Year 2026-2027 Tax Submission Deadline',
      content: 'Please submit your investment proofs before the 15th of next month to avoid higher TDS deductions.',
      type: 'Policy Update',
      targetAudience: 'All Employees',
      createdAt: '2026-08-19',
      author: 'Finance & Accounts',
    },
  ]);

  // Fetch Live Data from Backend API
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Tickets
      const tRes = await fetch(`${BACKEND_URL}/api/v1/support/tickets`, { headers });
      const tData = await tRes.json();
      if (tData.success && Array.isArray(tData.data) && tData.data.length > 0) {
        setTickets(
          tData.data.map((item: any) => ({
            id: item._id || item.ticketId,
            rawId: item._id,
            ticketCode: item.ticketId || `TICK-${item._id.substring(0, 5)}`,
            subject: item.title || item.subject,
            category: item.category || 'General',
            requesterName: item.createdBy?.firstName ? `${item.createdBy.firstName} ${item.createdBy.lastName}` : item.createdBy || 'User',
            requesterEmail: item.createdBy?.email || 'user@coral.com',
            requesterRole: 'Employee',
            priority: item.priority || 'Medium',
            status: item.status || 'Open',
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today',
            assignedAgent: item.assignedTo?.firstName ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}` : 'Unassigned',
          }))
        );
      }

      // 2. Knowledge Base
      const kbRes = await fetch(`${BACKEND_URL}/api/v1/support/knowledge-base`, { headers });
      const kbData = await kbRes.json();
      if (kbData.success && Array.isArray(kbData.data) && kbData.data.length > 0) {
        setKbArticles(
          kbData.data.map((item: any) => ({
            id: item._id || item.articleId,
            title: item.title,
            category: item.category,
            views: item.views || 0,
            helpfulCount: item.helpfulCount || 0,
            author: item.author?.firstName ? `${item.author.firstName} ${item.author.lastName}` : item.author || 'Support',
            updatedAt: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Recent',
            summary: item.content?.substring(0, 100) || item.title,
          }))
        );
      }

      // 3. Announcements
      const annRes = await fetch(`${BACKEND_URL}/api/v1/support/announcements`, { headers });
      const annData = await annRes.json();
      if (annData.success && Array.isArray(annData.data) && annData.data.length > 0) {
        setAnnouncements(
          annData.data.map((item: any) => ({
            id: item._id || item.announcementId,
            title: item.title,
            content: item.content,
            type: item.type || 'General',
            targetAudience: item.targetAudience || 'All',
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today',
            author: item.createdBy?.firstName ? `${item.createdBy.firstName} ${item.createdBy.lastName}` : item.createdBy || 'Admin',
          }))
        );
      }
    } catch (err) {
      console.log('Using local fallback support dataset');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [BACKEND_URL]);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = getToken();
      const target = tickets.find((t) => t.id === id);
      if (target && target.rawId) {
        await fetch(`${BACKEND_URL}/api/v1/support/tickets/${target.rawId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
      }
    } catch (e) {
      console.error(e);
    }

    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`Ticket status updated to "${newStatus}"`, 'success');
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject) return;

    try {
      const token = getToken();
      const res = await fetch(`${BACKEND_URL}/api/v1/support/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newSubject,
          description: newSubject,
          category: newCategory,
          priority: newPriority,
          createdBy: userId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (e) {
      const newTicket: SupportTicket = {
        id: `st-${Date.now()}`,
        ticketCode: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: newSubject,
        category: newCategory,
        requesterName: 'Bhardwaj Kishan',
        requesterEmail: 'bhardwajk852@gmail.com',
        requesterRole: 'Support Specialist',
        priority: newPriority,
        status: 'Open',
        createdAt: new Date().toLocaleString(),
        assignedAgent: 'Unassigned',
      };
      setTickets([newTicket, ...tickets]);
    }

    setCreateTicketModal(false);
    setNewSubject('');
    showToast('Support ticket created successfully!', 'success');
  };

  // Filtered ticket datasets based on activeTab
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

      if (activeTab === 'technical') {
        const isTechCategory =
          t.category === 'IT Support' || t.category === 'System Bug' || t.category === 'Access Control' || t.category === 'Technical';
        return matchesSearch && matchesStatus && isTechCategory;
      }

      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, statusFilter, activeTab]);

  const technicalTicketsCount = useMemo(() => {
    return tickets.filter(
      (t) => t.category === 'IT Support' || t.category === 'System Bug' || t.category === 'Access Control' || t.category === 'Technical'
    ).length;
  }, [tickets]);

  const filteredKbArticles = useMemo(() => {
    return kbArticles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = kbCategoryFilter === 'All' || art.category === kbCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [kbArticles, searchTerm, kbCategoryFilter]);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(
      (ann) =>
        ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [announcements, searchTerm]);

  // Tab count indicators
  const tabCounts = {
    all: tickets.length,
    chat: chatQueue.length,
    technical: technicalTicketsCount,
    kb: kbArticles.length,
    reports: 5,
    announcements: announcements.length,
    settings: 4,
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 animate-in slide-in-from-top-3 duration-200 ${
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
              Support Helpdesk & Ticket Command Center
            </h1>
            <Badge variant="brand">Helpdesk Online</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            System helpdesk command center for managing customer tickets, technical requests, live chats, and announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setCreateTicketModal(true)}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create Support Request
          </Button>
        </div>
      </div>

      {/* Interactive Support Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Tickets & Requests', icon: LifeBuoy, count: tabCounts.all },
          { id: 'chat', label: 'Live Chat Queue', icon: MessageSquare, count: tabCounts.chat },
          { id: 'technical', label: 'Technical Requests', icon: Wrench, count: tabCounts.technical },
          { id: 'kb', label: 'Knowledge Base', icon: BookOpen, count: tabCounts.kb },
          { id: 'reports', label: 'Helpdesk Reports', icon: BarChart3, count: tabCounts.reports },
          { id: 'announcements', label: 'Announcements', icon: Bell, count: tabCounts.announcements },
          { id: 'settings', label: 'Settings', icon: Settings, count: tabCounts.settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SupportTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm font-semibold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR FOR TAB-LEVEL FILTERING */}
      {(activeTab === 'all' || activeTab === 'technical' || activeTab === 'kb' || activeTab === 'announcements') && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder={
                activeTab === 'kb'
                  ? 'Search articles, topics...'
                  : activeTab === 'announcements'
                  ? 'Search announcements...'
                  : 'Search ticket subject, code, or requester...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
            />
          </div>

          {/* Ticket Status Pills (Only for All & Technical tabs) */}
          {(activeTab === 'all' || activeTab === 'technical') && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto">
              {['all', 'Open', 'In Progress', 'Pending User', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  {st === 'all' ? 'All Statuses' : st}
                </button>
              ))}
            </div>
          )}

          {/* KB Category Filter (Only for Knowledge Base tab) */}
          {activeTab === 'kb' && (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-end">
              {['All', 'Account Access', 'Payroll & Tax', 'IT Support', 'Leave Policy'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setKbCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer whitespace-nowrap ${
                    kbCategoryFilter === cat
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: ALL TICKETS & REQUESTS */}
      {/* ========================================================================= */}
      {activeTab === 'all' && (
        <Card className="rounded-lg">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4 text-[#94cb3d]" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  All Support Tickets & Service Requests
                </h3>
                <Badge variant="secondary" className="text-[10px]">
                  {filteredTickets.length} Items
                </Badge>
              </div>
              <button
                onClick={() => router.push(`/dashboard/support/${userId}/tickets`)}
                className="inline-flex items-center gap-1 text-xs text-[#94cb3d] font-semibold hover:underline cursor-pointer"
              >
                Open Full Tickets Page <ExternalLink className="h-3 w-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Requester</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Ticket & Subject</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Priority</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Created Date</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-xs text-zinc-400">
                        No support tickets found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                              {ticket.requesterName[0]?.toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                                {ticket.requesterName}
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                {ticket.requesterEmail} • {ticket.requesterRole}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {ticket.subject}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-400">{ticket.ticketCode}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge variant="secondary" className="text-[10px]">
                            {ticket.category}
                          </Badge>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              ticket.priority === 'Urgent'
                                ? 'bg-red-500/15 text-red-600'
                                : ticket.priority === 'High'
                                ? 'bg-amber-500/15 text-amber-600'
                                : ticket.priority === 'Medium'
                                ? 'bg-blue-500/15 text-blue-600'
                                : 'bg-zinc-100 text-zinc-600'
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge
                            variant={
                              ticket.status === 'Resolved'
                                ? 'success'
                                : ticket.status === 'In Progress'
                                ? 'brand'
                                : ticket.status === 'Open'
                                ? 'default'
                                : 'secondary'
                            }
                            className="text-[10px] uppercase font-bold"
                          >
                            {ticket.status}
                          </Badge>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                          {ticket.createdAt}
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {ticket.status !== 'Resolved' && (
                              <button
                                onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                                className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                title="Mark Ticket Resolved"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {ticket.status === 'Open' && (
                              <button
                                onClick={() => handleStatusChange(ticket.id, 'In Progress')}
                                className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                title="Set In Progress"
                              >
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: LIVE CHAT QUEUE */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Live Chat Queue & Active Sessions
                </h3>
                <p className="text-xs text-zinc-500">Real-time chat requests awaiting support agent response.</p>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/dashboard/support/${userId}/live-chat`)}
              className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Open Full Live Chat Portal <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chatQueue.map((chat) => (
              <Card key={chat.id} className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 font-bold flex items-center justify-center text-sm">
                      {chat.userName[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{chat.userName}</h4>
                      <p className="text-xs text-zinc-500">{chat.userEmail} • {chat.userRole}</p>
                    </div>
                  </div>

                  <Badge
                    variant={chat.status === 'Active' ? 'success' : 'brand'}
                    className="text-[10px] uppercase font-bold"
                  >
                    {chat.status}
                  </Badge>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 italic border border-zinc-100 dark:border-zinc-800">
                  "{chat.lastMessage}"
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Wait time: {chat.waitTime}
                  </span>
                  <button
                    onClick={() => router.push(`/dashboard/support/${userId}/live-chat`)}
                    className="px-3 py-1 bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-md font-medium text-xs transition-colors cursor-pointer"
                  >
                    Join Chat Session
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICAL REQUESTS */}
      {activeTab === 'technical' && (
        <Card className="rounded-lg">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-purple-500" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Technical IT & System Bug Requests
                </h3>
                <Badge variant="secondary" className="text-[10px]">
                  {filteredTickets.length} Tech Issues
                </Badge>
              </div>

              <button
                onClick={() => router.push(`/dashboard/support/${userId}/technical`)}
                className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline cursor-pointer"
              >
                Open Technical Desk <ExternalLink className="h-3 w-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Requester</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Technical Issue</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Category</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Assigned Tech</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Priority</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">Status</th>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-xs text-zinc-400">
                        No technical tickets found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                        <td className="px-4 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {ticket.requesterName}
                          <span className="block text-[10px] font-normal text-zinc-400">{ticket.requesterRole}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{ticket.subject}</p>
                          <span className="text-[10px] font-mono text-zinc-400">{ticket.ticketCode}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge variant="secondary" className="text-[10px]">
                            {ticket.category}
                          </Badge>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                          {ticket.assignedAgent || 'Unassigned'}
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              ticket.priority === 'Urgent'
                                ? 'bg-red-500/15 text-red-600'
                                : ticket.priority === 'High'
                                ? 'bg-amber-500/15 text-amber-600'
                                : 'bg-blue-500/15 text-blue-600'
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge
                            variant={
                              ticket.status === 'Resolved'
                                ? 'success'
                                : ticket.status === 'In Progress'
                                ? 'brand'
                                : 'default'
                            }
                            className="text-[10px] uppercase font-bold"
                          >
                            {ticket.status}
                          </Badge>
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          {ticket.status !== 'Resolved' && (
                            <button
                              onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                              className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Resolve Issue
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: KNOWLEDGE BASE */}
      {activeTab === 'kb' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Support Knowledge Base & FAQs
                </h3>
                <p className="text-xs text-zinc-500">Self-service documentation and portal user manuals.</p>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/dashboard/support/${userId}/knowledge-base`)}
              className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Knowledge Base Portal <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKbArticles.map((art) => (
              <Card key={art.id} className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" className="text-[10px]">
                    {art.category}
                  </Badge>
                  <span className="text-[10px] text-zinc-400 font-mono">Updated: {art.updatedAt}</span>
                </div>

                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#94cb3d] cursor-pointer">
                  {art.title}
                </h4>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{art.summary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {art.views} views
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <ThumbsUp className="h-3.5 w-3.5" /> {art.helpfulCount} helpful
                    </span>
                  </div>

                  <button
                    onClick={() => router.push(`/dashboard/support/${userId}/knowledge-base`)}
                    className="text-xs font-medium text-[#94cb3d] hover:underline cursor-pointer"
                  >
                    Read Article →
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: HELPDESK REPORTS & METRICS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Helpdesk Analytics & SLA Performance Reports
                </h3>
                <p className="text-xs text-zinc-500">Key metrics for resolution efficiency and customer satisfaction.</p>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/dashboard/support/${userId}/reports`)}
              className="bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Open Full Reports <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 rounded-xl space-y-1">
              <p className="text-xs text-zinc-500">Total Support Requests</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{tickets.length}</h3>
              <p className="text-[10px] text-emerald-600 font-semibold">+12% vs last week</p>
            </Card>

            <Card className="p-4 rounded-xl space-y-1">
              <p className="text-xs text-zinc-500">Avg First Response Time</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">12 mins</h3>
              <p className="text-[10px] text-emerald-600 font-semibold">Well within 15 min SLA</p>
            </Card>

            <Card className="p-4 rounded-xl space-y-1">
              <p className="text-xs text-zinc-500">SLA Resolution Rate</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">94.2%</h3>
              <p className="text-[10px] text-emerald-600 font-semibold">Target: 90%</p>
            </Card>

            <Card className="p-4 rounded-xl space-y-1">
              <p className="text-xs text-zinc-500">User Satisfaction (CSAT)</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">4.8 / 5.0</h3>
              <p className="text-[10px] text-emerald-600 font-semibold">Based on 48 ratings</p>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 6: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-rose-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Helpdesk Broadcast Announcements & Alerts
                </h3>
                <p className="text-xs text-zinc-500">System maintenance alerts and company-wide notices.</p>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/dashboard/support/${userId}/announcements`)}
              className="bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Announcements Management <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="space-y-3">
            {filteredAnnouncements.map((ann) => (
              <Card key={ann.id} className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={ann.type === 'Urgent' ? 'destructive' : ann.type === 'Policy Update' ? 'brand' : 'secondary'}
                      className="text-[10px] font-bold"
                    >
                      {ann.type}
                    </Badge>
                    <span className="text-xs text-zinc-400">Target: {ann.targetAudience}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{ann.createdAt}</span>
                </div>

                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{ann.title}</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{ann.content}</p>

                <div className="pt-2 text-[10px] text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
                  Published by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{ann.author}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS */}
      {activeTab === 'settings' && (
        <Card className="p-6 rounded-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  Helpdesk & SLA Configuration
                </h3>
                <p className="text-xs text-zinc-500">Configure response targets, support hours, and email alerts.</p>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/dashboard/support/${userId}/settings`)}
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Open Full Settings <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="block font-semibold text-zinc-900 dark:text-zinc-100">
                SLA Target First Response Time
              </label>
              <select
                value={slaResponseTime}
                onChange={(e) => setSlaResponseTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium"
              >
                <option value="15 mins">15 Minutes (High Priority)</option>
                <option value="30 mins">30 Minutes (Standard)</option>
                <option value="1 hour">1 Hour</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-zinc-900 dark:text-zinc-100">
                Helpdesk Operating Hours
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800 md:col-span-2">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Automatic Ticket Load Balancing</p>
                <p className="text-[11px] text-zinc-500">Automatically assign incoming tickets to available support specialists.</p>
              </div>

              <input
                type="checkbox"
                checked={autoAssignment}
                onChange={(e) => setAutoAssignment(e.target.checked)}
                className="h-4 w-4 text-[#94cb3d] rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              onClick={() => showToast('Helpdesk settings saved successfully!', 'success')}
              className="bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-semibold rounded-lg cursor-pointer"
            >
              Save Helpdesk Settings
            </Button>
          </div>
        </Card>
      )}

      {/* Create Ticket Modal */}
      {createTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Create New Support Request</h2>
              <button onClick={() => setCreateTicketModal(false)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Subject / Summary *
                </label>
                <Input
                  required
                  placeholder="Describe your technical issue or request..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="IT Support">IT Support</option>
                  <option value="Payroll & Tax">Payroll & Tax</option>
                  <option value="System Bug">System Bug</option>
                  <option value="Access Control">Access Control</option>
                  <option value="General HR">General HR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Priority Level *
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Priority</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateTicketModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Create Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
