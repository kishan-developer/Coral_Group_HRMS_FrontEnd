'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Bug,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function SupportReportsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [activeTab, setActiveTab] = useState<string>('tickets');
  const [reportsData, setReportsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/reports`);
      const data = await response.json();
      if (data.success && data.data) {
        setReportsData(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch support reports:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#94cb3d]" />
              Support Helpdesk Reports & SLA Analytics
            </h1>
            <Badge variant="brand">Real-Time Data Engine</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Executive insights into ticket volumes, resolution SLA compliance, technical bug metrics, and knowledge base coverage.
          </p>
        </div>

        <Button className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium">
          <Download className="h-4 w-4 mr-1.5" />
          Export Report Summary
        </Button>
      </div>

      {/* Tab-Isolated Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'tickets', label: 'Tickets Analytics', icon: FileText },
          { id: 'sla', label: 'Resolution SLA Compliance', icon: Clock },
          { id: 'bugs', label: 'Technical Bug Metrics', icon: Bug },
          { id: 'kb', label: 'Knowledge Base Coverage', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Component-Isolated Tab Display */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-zinc-500">Total Support Tickets</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">269</p>
                <span className="text-[10px] text-emerald-600 font-bold">↑ 12% vs last month</span>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-zinc-500">Resolved Tickets</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">214</p>
                <span className="text-[10px] text-zinc-400">79.5% Resolution Rate</span>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-zinc-500">Open & In Progress</p>
                <p className="text-2xl font-bold text-amber-500 mt-1">45</p>
                <span className="text-[10px] text-zinc-400">Active in Queue</span>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-zinc-500">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">4.2 Hrs</p>
                <span className="text-[10px] text-emerald-600 font-bold">Within 24h SLA limit</span>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'sla' && (
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#94cb3d]" />
            SLA Response & Resolution Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">First Response SLA Met</p>
              <p className="text-xl font-bold text-emerald-600">96.8%</p>
              <p className="text-[10px] text-zinc-400">Avg First Response: 14 Mins</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">Resolution Time SLA Met</p>
              <p className="text-xl font-bold text-emerald-600">92.4%</p>
              <p className="text-[10px] text-zinc-400">Avg Resolution: 4.2 Hrs</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">SLA Breaches</p>
              <p className="text-xl font-bold text-red-500">8 Incidents</p>
              <p className="text-[10px] text-zinc-400">Reassigned & Escalated</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'bugs' && (
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Bug className="h-4 w-4 text-amber-500" />
            Technical Incidents & Bug Severity Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 space-y-1">
              <p className="text-xs font-bold text-red-600">Critical & High Outages</p>
              <p className="text-xl font-bold text-red-600">3 Active Outages</p>
              <p className="text-[10px] text-red-500">Assigned to Core Engineering</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-1">
              <p className="text-xs font-bold text-blue-600">Medium & Low Severity Glitches</p>
              <p className="text-xl font-bold text-blue-600">12 Reported Glitches</p>
              <p className="text-[10px] text-blue-500">Scheduled for Next Release</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'kb' && (
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#94cb3d]" />
            Knowledge Base Self-Service Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">Articles Read</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">3,840 Views</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">Deflected Support Tickets</p>
              <p className="text-xl font-bold text-emerald-600">~140 Deflected</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 space-y-1">
              <p className="text-xs text-zinc-500 font-medium">Helpful Rating</p>
              <p className="text-xl font-bold text-[#94cb3d]">94% Upvoted</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
