'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
  AlertCircle,
  User,
  Filter,
  ArrowUpRight,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface SupportTicket {
  id: string;
  ticketCode: string;
  subject: string;
  category: 'IT Support' | 'Payroll & Tax' | 'System Bug' | 'Access Control' | 'General HR';
  requesterName: string;
  requesterEmail: string;
  requesterRole: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Pending User';
  createdAt: string;
}

export type SupportTab = 'all' | 'chat' | 'technical' | 'kb' | 'reports' | 'announcements' | 'settings';

export default function SupportDashboardOverview() {
  const params = useParams();
  const userId = params.userId as string;

  const [activeTab, setActiveTab] = useState<SupportTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('IT Support');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Medium');

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
    },
  ]);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id: string, newStatus: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`Ticket status updated to "${newStatus}"`, 'success');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject) return;

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
    };

    setTickets([newTicket, ...tickets]);
    setCreateTicketModal(false);
    setNewSubject('');
    showToast('Support ticket created successfully!', 'success');
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
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
              Support Helpdesk & Ticket Command Center
            </h1>
            <Badge variant="brand">Helpdesk Online</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            System helpdesk command center for managing customer tickets, technical requests, live chats, and announcements.
          </p>
        </div>

        <Button
          onClick={() => setCreateTicketModal(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Support Request
        </Button>
      </div>

      {/* Support Tabs directly after Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Tickets & Requests', icon: LifeBuoy, count: counts.all },
          { id: 'chat', label: 'Live Chat Queue', icon: MessageSquare, count: 2 },
          { id: 'technical', label: 'Technical Requests', icon: Wrench, count: 4 },
          { id: 'kb', label: 'Knowledge Base', icon: BookOpen, count: 18 },
          { id: 'reports', label: 'Helpdesk Reports', icon: BarChart3, count: 5 },
          { id: 'announcements', label: 'Announcements', icon: Bell, count: 3 },
          { id: 'settings', label: 'Settings', icon: Settings, count: 0 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SupportTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
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
            placeholder="Search ticket subject, code, or requester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {['all', 'Open', 'In Progress', 'Pending User', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                statusFilter === st
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Support Command Table Showing All Support Pages / Requests */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
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
                {filteredTickets.map((ticket) => (
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
                            className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                            title="Mark Ticket Resolved"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {ticket.status === 'Open' && (
                          <button
                            onClick={() => handleStatusChange(ticket.id, 'In Progress')}
                            className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
                            title="Set In Progress"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Ticket Modal */}
      {createTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Create New Support Request</h2>
              <button onClick={() => setCreateTicketModal(false)} className="text-zinc-400 hover:text-zinc-600">
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
                  onChange={(e) => setNewCategory(e.target.value as any)}
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
                  onChange={(e) => setNewPriority(e.target.value as any)}
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
