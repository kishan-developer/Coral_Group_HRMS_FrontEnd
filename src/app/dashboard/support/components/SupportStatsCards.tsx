'use client';

import { Ticket, Clock, CheckCircle, AlertTriangle, Users, MessageSquare, TrendingUp, Star } from 'lucide-react';
import StatsCard from '@/components/ui/Card/StatsCard';

interface SupportStatsCardsProps {
  stats?: {
    tickets?: {
      total: number;
      open: number;
      inProgress: number;
      resolved: number;
    };
    requests?: {
      total: number;
      pending: number;
      completed: number;
    };
    knowledgeBase?: {
      total: number;
      published: number;
    };
    technicalIssues?: {
      total: number;
      critical: number;
    };
    liveChat?: {
      active: number;
    };
  };
}

export default function SupportStatsCards({ stats }: SupportStatsCardsProps) {
  const ticketStats = stats?.tickets || { total: 0, open: 0, inProgress: 0, resolved: 0 };
  const requestStats = stats?.requests || { total: 0, pending: 0, completed: 0 };
  const kbStats = stats?.knowledgeBase || { total: 0, published: 0 };
  const techStats = stats?.technicalIssues || { total: 0, critical: 0 };
  const chatStats = stats?.liveChat || { active: 0 };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Open Tickets"
        value={ticketStats.open.toString()}
        icon={Ticket}
        trend={`${ticketStats.inProgress} in progress`}
        trendUp
      />
      <StatsCard
        title="Pending Requests"
        value={requestStats.pending.toString()}
        icon={Clock}
        trend={`${requestStats.completed} completed`}
        trendUp
      />
      <StatsCard
        title="Resolved Today"
        value={ticketStats.resolved.toString()}
        icon={CheckCircle}
        trend="On track"
        trendUp
      />
      <StatsCard
        title="High Priority Issues"
        value={techStats.critical.toString()}
        icon={AlertTriangle}
        trend="Needs attention"
        trendUp={false}
      />
      <StatsCard
        title="Avg Response Time"
        value="2.5h"
        icon={Clock}
        trend="-15%"
        trendUp
      />
      <StatsCard
        title="Avg Resolution Time"
        value="24h"
        icon={TrendingUp}
        trend="-8%"
        trendUp
      />
      <StatsCard
        title="Active Chats"
        value={chatStats.active.toString()}
        icon={MessageSquare}
        trend="Live"
        trendUp
      />
      <StatsCard
        title="Satisfaction Score"
        value="4.8"
        icon={Star}
        trend="Excellent"
        trendUp
      />
    </div>
  );
}
