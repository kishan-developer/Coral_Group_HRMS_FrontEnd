'use client';

import { useState } from 'react';
import { Settings, Save, Shield, Clock, Bell, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function SupportSettingsPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [toast, setToast] = useState<{ message: string; type: 'success' } | null>(null);

  const tabs = [
    { id: 'categories', name: 'Ticket Categories', icon: Settings },
    { id: 'priorities', name: 'Priority Levels', icon: Shield },
    { id: 'sla', name: 'SLA Response Rules', icon: Clock },
    { id: 'notifications', name: 'Notification Triggers', icon: Bell },
    { id: 'permissions', name: 'Support Rights & Matrix', icon: Users },
  ];

  const categories = [
    { id: 1, name: 'Technical', description: 'System bugs, outages, and API errors', active: true },
    { id: 2, name: 'HR', description: 'Leave balances, policies, and onboarding queries', active: true },
    { id: 3, name: 'Payroll', description: 'Salary slips, reimbursements, and tax calculations', active: true },
    { id: 4, name: 'IT Infrastructure', description: 'Hardware, biometrics, and network connectivity', active: true },
  ];

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('Support system configuration updated successfully!');
  };

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
              <Settings className="h-5 w-5 text-[#94cb3d]" />
              Support Helpdesk System Settings & SLAs
            </h1>
            <Badge variant="brand">Configuration Engine</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Configure ticket categories, SLA response thresholds, notification channels, and agent permissions.
          </p>
        </div>

        <Button onClick={handleSave} className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium">
          <Save className="h-4 w-4 mr-1.5" />
          Save Changes
        </Button>
      </div>

      {/* Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all border ${
                  isActive
                    ? 'bg-[#94cb3d] text-white border-[#94cb3d] shadow-sm font-bold'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <Card className="flex-1 rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-6 space-y-4">
            {activeTab === 'categories' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Configured Ticket Categories</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{c.name}</p>
                        <p className="text-[11px] text-zinc-500">{c.description}</p>
                      </div>
                      <Badge variant="success" className="text-[10px]">Active</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'priorities' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Priority Escalation Timers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <span className="text-xs font-bold text-red-600 block">Critical Outage</span>
                    <span className="text-[11px] text-zinc-500">15-minute response SLA • 2-hour resolution</span>
                  </div>
                  <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <span className="text-xs font-bold text-amber-600 block">High Priority</span>
                    <span className="text-[11px] text-zinc-500">1-hour response SLA • 6-hour resolution</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'categories' && activeTab !== 'priorities' && (
              <div className="p-8 text-center text-xs font-medium text-zinc-500 space-y-2">
                <CheckCircle2 className="h-8 w-8 text-[#94cb3d] mx-auto mb-2" />
                <p>Support setting configurations active & synchronized with backend database.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
