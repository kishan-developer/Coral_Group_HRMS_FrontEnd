'use client';

import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
}

interface RecentTicketsWidgetProps {
  tickets?: Ticket[];
}

export default function RecentTicketsWidget({ tickets = [] }: RecentTicketsWidgetProps) {
  const priorityColors = {
    Low: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    Medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    High: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    Critical: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusIcons = {
    Open: <AlertCircle className="h-4 w-4 text-orange-500" />,
    'In Progress': <Clock className="h-4 w-4 text-blue-500" />,
    Resolved: <CheckCircle className="h-4 w-4 text-green-500" />,
    Closed: <CheckCircle className="h-4 w-4 text-zinc-400" />,
  };

  const mockTickets: Ticket[] = tickets.length > 0 ? tickets : [
    { id: 'TKT-001', title: 'Login authentication issue', category: 'Technical', priority: 'High', status: 'Open', createdAt: '2 hours ago' },
    { id: 'TKT-002', title: 'Payroll discrepancy query', category: 'Payroll', priority: 'Medium', status: 'In Progress', createdAt: '4 hours ago' },
    { id: 'TKT-003', title: 'Leave balance not updating', category: 'HR', priority: 'High', status: 'Open', createdAt: '5 hours ago' },
    { id: 'TKT-004', title: 'Mobile app crash on iOS', category: 'Technical', priority: 'Critical', status: 'In Progress', createdAt: '6 hours ago' },
    { id: 'TKT-005', title: 'Document upload failed', category: 'IT', priority: 'Low', status: 'Resolved', createdAt: '1 day ago' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Tickets</h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <div className="mt-0.5">{statusIcons[ticket.status]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{ticket.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[ticket.priority]}`}>
                  {ticket.priority}
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{ticket.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{ticket.category}</span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{ticket.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
