'use client';

import { useState } from 'react';
import { Shield, Lock, Smartphone, Globe, FileText, AlertTriangle } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_attempt' | 'password_change' | 'suspicious_activity';
  user: string;
  company?: string;
  ip: string;
  location: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

export default function SecurityCenter() {
  const [activeTab, setActiveTab] = useState('overview');

  const securityEvents: SecurityEvent[] = [
    { id: '1', type: 'login', user: 'John Smith', company: 'Acme Corp', ip: '192.168.1.1', location: 'New York, US', timestamp: '2024-01-15T10:30:00', status: 'success' },
    { id: '2', type: 'failed_attempt', user: 'Unknown', ip: '45.67.89.123', location: 'Moscow, RU', timestamp: '2024-01-15T10:25:00', status: 'failed' },
    { id: '3', type: 'password_change', user: 'Sarah Johnson', company: 'Tech Solutions', ip: '192.168.1.2', location: 'London, UK', timestamp: '2024-01-15T09:15:00', status: 'success' },
    { id: '4', type: 'suspicious_activity', user: 'Mike Wilson', company: 'Global Industries', ip: '78.90.123.45', location: 'Berlin, DE', timestamp: '2024-01-15T08:45:00', status: 'warning' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'login-history', name: 'Login History', icon: Lock },
    { id: 'devices', name: 'Devices', icon: Smartphone },
    { id: 'ip-whitelist', name: 'IP Whitelist', icon: Globe },
    { id: 'audit-logs', name: 'Audit Logs', icon: FileText },
  ];

  const eventColors = {
    success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-500" />
          Security Center
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Monitor and manage platform security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">98%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Security Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">1,234</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Active Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">23</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed Attempts</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">456</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Registered Devices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Security Events</h2>
              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${eventColors[event.status]}`}>
                        {event.type === 'login' && <Lock className="h-4 w-4" />}
                        {event.type === 'failed_attempt' && <AlertTriangle className="h-4 w-4" />}
                        {event.type === 'password_change' && <Shield className="h-4 w-4" />}
                        {event.type === 'suspicious_activity' && <AlertTriangle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{event.user}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{event.company || 'Platform'} • {event.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{event.location}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">{new Date(event.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'login-history' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Login History</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">View all login attempts across the platform</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Login history table would be rendered here
              </div>
            </div>
          )}

          {activeTab === 'devices' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Registered Devices</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage trusted devices across all companies</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Device management table would be rendered here
              </div>
            </div>
          )}

          {activeTab === 'ip-whitelist' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">IP Whitelist</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure allowed IP ranges for platform access</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                IP whitelist configuration would be rendered here
              </div>
            </div>
          )}

          {activeTab === 'audit-logs' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Audit Logs</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Complete audit trail of all system activities</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Audit logs table would be rendered here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
