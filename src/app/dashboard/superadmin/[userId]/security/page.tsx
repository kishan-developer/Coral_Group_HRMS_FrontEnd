'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Globe,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Key,
  Laptop,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Download,
  Eye,
  UserX,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_attempt' | 'password_change' | 'suspicious_activity';
  user: string;
  email: string;
  company?: string;
  ip: string;
  location: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

interface IpRule {
  id: string;
  ipRange: string;
  description: string;
  status: 'Active' | 'Disabled';
  addedBy: string;
  addedAt: string;
}

export default function SecurityCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // IP Whitelist Form State
  const [newIpRange, setNewIpRange] = useState('');
  const [newIpLabel, setNewIpLabel] = useState('');
  const [ipRules, setIpRules] = useState<IpRule[]>([
    { id: '1', ipRange: '192.168.1.0/24', description: 'Corporate Office HQ Subnet', status: 'Active', addedBy: 'SuperAdmin', addedAt: '2026-01-10' },
    { id: '2', ipRange: '45.12.89.0/22', description: 'Development Center VPN Gateway', status: 'Active', addedBy: 'SuperAdmin', addedAt: '2026-02-14' },
    { id: '3', ipRange: '103.44.12.5', description: 'Executive Data Center IP', status: 'Active', addedBy: 'SuperAdmin', addedAt: '2026-04-01' },
  ]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    { id: 'SEC-101', type: 'login', user: 'Kishan Kumar', email: 'kishan@company.com', company: 'Acme Corp', ip: '192.168.1.1', location: 'Mumbai, IN', timestamp: '2026-08-27T09:12:00', status: 'success' },
    { id: 'SEC-102', type: 'failed_attempt', user: 'Unknown Attacker', email: 'unknown@external.net', ip: '45.67.89.123', location: 'Moscow, RU', timestamp: '2026-08-27T08:55:00', status: 'failed' },
    { id: 'SEC-103', type: 'password_change', user: 'Sarah Johnson', email: 'sarah@techsol.com', company: 'Tech Solutions', ip: '192.168.1.2', location: 'London, UK', timestamp: '2026-08-27T08:15:00', status: 'success' },
    { id: 'SEC-104', type: 'suspicious_activity', user: 'Mike Wilson', email: 'mike@global.io', company: 'Global Industries', ip: '78.90.123.45', location: 'Berlin, DE', timestamp: '2026-08-27T07:45:00', status: 'warning' },
    { id: 'SEC-105', type: 'login', user: 'Priya Sharma', email: 'priya@hr.org', company: 'Coral Group', ip: '182.70.12.4', location: 'Bangalore, IN', timestamp: '2026-08-27T06:30:00', status: 'success' },
  ]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleRunSecurityScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      showToast('Security Threat Scan completed! 0 Critical Vulnerabilities found.', 'success');
    }, 1200);
  };

  const handleAddIpRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIpRange.trim()) return;

    const newRule: IpRule = {
      id: String(Date.now()),
      ipRange: newIpRange,
      description: newIpLabel || 'Whitelisted IP Range',
      status: 'Active',
      addedBy: 'SuperAdmin',
      addedAt: new Date().toISOString().split('T')[0],
    };

    setIpRules([newRule, ...ipRules]);
    setNewIpRange('');
    setNewIpLabel('');
    showToast(`IP Range ${newRule.ipRange} added to Firewall Whitelist!`, 'success');
  };

  const handleDeleteIpRule = (id: string) => {
    setIpRules(ipRules.filter((r) => r.id !== id));
    showToast('IP Whitelist Rule removed from Firewall.', 'warning');
  };

  const handleBlockIp = (ip: string) => {
    showToast(`IP Address ${ip} has been permanently blocked by Firewall!`, 'warning');
  };

  const filteredEvents = securityEvents.filter(
    (ev) =>
      ev.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.ip.includes(searchQuery) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Alert Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
            toast.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
              : toast.type === 'warning'
              ? 'bg-amber-600/95 border-amber-500 shadow-amber-900/20'
              : 'bg-blue-600/95 border-blue-500 shadow-blue-900/20'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-48 h-48 bg-[#94cb3d]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold tracking-wide uppercase">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Zero-Trust Security Engine</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Web Application Firewall (WAF) Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              SuperAdmin Security & Threat Prevention Center
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Real-time monitoring of authentication attempts, IP whitelisting firewall rules, authorized device management, and security audit trails.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleRunSecurityScan}
              disabled={scanning}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
              Run Security Scan
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Security Score</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">98%</h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">Optimal Protection</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Active Sessions</span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Lock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">1,234</h3>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 block">Encrypted JWT Tokens</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Failed Login Attempts</span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">23</h3>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 block">Auto-Mitigated Threats</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Trusted Devices</span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Smartphone className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">456</h3>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 block">Registered & Verified</span>
          </div>
        </div>
      </div>

      {/* Main Section with Sidebar Tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-2 shadow-sm space-y-1">
            {[
              { id: 'overview', label: 'Security Overview', icon: ShieldCheck },
              { id: 'login-history', label: 'Login History', icon: Lock },
              { id: 'devices', label: 'Trusted Devices', icon: Smartphone },
              { id: 'ip-whitelist', label: 'IP Whitelist Rules', icon: Globe },
              { id: 'audit-logs', label: 'Security Audit Trail', icon: FileText },
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#94cb3d] text-zinc-950 shadow-md shadow-[#94cb3d]/20 font-extrabold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
          {/* Tab 1: Security Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#94cb3d]" />
                    Live Security Events & Authentication Activity
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Real-time threat feed and login attempts across all corporate tenants.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <Input
                    type="text"
                    placeholder="Search by user or IP..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50/70 dark:bg-zinc-950/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl ${
                          event.status === 'success'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : event.status === 'failed'
                            ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {event.type === 'login' && <Lock className="h-4 w-4" />}
                        {event.type === 'failed_attempt' && <AlertTriangle className="h-4 w-4" />}
                        {event.type === 'password_change' && <Key className="h-4 w-4" />}
                        {event.type === 'suspicious_activity' && <ShieldAlert className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{event.user}</p>
                          <Badge
                            variant={event.status === 'success' ? 'success' : event.status === 'failed' ? 'destructive' : 'warning'}
                            className="text-[10px] px-2 py-0.5"
                          >
                            {event.type.toUpperCase().replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-medium">
                          {event.email} • {event.company || 'Platform'} • <span className="font-mono text-zinc-700 dark:text-zinc-300">{event.ip}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-zinc-200 dark:border-zinc-800">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{event.location}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                      {event.status === 'failed' || event.status === 'warning' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBlockIp(event.ip)}
                          className="rounded-xl text-[11px] font-bold text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <UserX className="h-3.5 w-3.5 mr-1" />
                          Block IP
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Login History */}
          {activeTab === 'login-history' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-500" />
                  Detailed Platform Authentication Log
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Comprehensive history of user sign-ins and session durations.</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left font-medium text-xs">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">User & Email</th>
                      <th className="px-4 py-3">IP Address</th>
                      <th className="px-4 py-3">Browser / OS</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Login Time</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {[
                      { user: 'Kishan Kumar', email: 'kishan@hrms.com', ip: '192.168.1.1', browser: 'Chrome 122 / Mac OS X', loc: 'Mumbai, IN', time: 'Today, 09:12 AM', status: 'Success' },
                      { user: 'Sarah Johnson', email: 'sarah@techsol.com', ip: '192.168.1.2', browser: 'Firefox 120 / Windows 11', loc: 'London, UK', time: 'Today, 08:15 AM', status: 'Success' },
                      { user: 'Mike Wilson', email: 'mike@global.io', ip: '78.90.123.45', browser: 'Safari 17 / iOS 17', loc: 'Berlin, DE', time: 'Today, 07:45 AM', status: 'Success' },
                      { user: 'Unknown Attacker', email: 'badactor@botnet.org', ip: '45.67.89.123', browser: 'Curl / Python Request', loc: 'Moscow, RU', time: 'Today, 06:30 AM', status: 'Failed' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                        <td className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100">
                          {item.user} <span className="block text-[10px] font-normal text-zinc-500">{item.email}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">{item.ip}</td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{item.browser}</td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{item.loc}</td>
                        <td className="px-4 py-3 text-zinc-500 font-mono text-[11px]">{item.time}</td>
                        <td className="px-4 py-3">
                          <Badge variant={item.status === 'Success' ? 'success' : 'destructive'} className="text-[10px]">
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Registered Devices */}
          {activeTab === 'devices' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-purple-500" />
                  Trusted Hardware & Registered Devices
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Manage employee mobile devices and laptops authorized for platform access.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'MacBook Pro M3 Max (SuperAdmin Workstation)', user: 'Kishan Kumar', deviceId: 'DEV-8891-MAC', status: 'Authorized', lastSeen: 'Active Now', icon: Laptop },
                  { name: 'iPhone 15 Pro Max (Mobile App)', user: 'Sarah Johnson', deviceId: 'DEV-4421-IOS', status: 'Authorized', lastSeen: '10 mins ago', icon: Smartphone },
                  { name: 'Dell XPS 15 (Corporate Laptop)', user: 'Mike Wilson', deviceId: 'DEV-1102-WIN', status: 'Authorized', lastSeen: '1 hour ago', icon: Laptop },
                  { name: 'Samsung Galaxy S24 Ultra', user: 'Priya Sharma', deviceId: 'DEV-9901-AND', status: 'Pending Verification', lastSeen: '3 hours ago', icon: Smartphone },
                ].map((dev, i) => {
                  const DeviceIcon = dev.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            <DeviceIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{dev.name}</h3>
                            <p className="text-[11px] text-zinc-500">{dev.user} • <span className="font-mono text-zinc-700 dark:text-zinc-300">{dev.deviceId}</span></p>
                          </div>
                        </div>
                        <Badge variant={dev.status === 'Authorized' ? 'success' : 'warning'} className="text-[10px]">
                          {dev.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px]">
                        <span className="text-zinc-500">Last Seen: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{dev.lastSeen}</span></span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => showToast(`Device ${dev.deviceId} access revoked!`, 'warning')}
                          className="rounded-xl text-[10px] font-bold text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Revoke Access
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: IP Whitelist */}
          {activeTab === 'ip-whitelist' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-500" />
                  Firewall IP Whitelist Rules
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Restrict admin access to specific office subnets or static IP addresses.</p>
              </div>

              {/* Add IP Form */}
              <form onSubmit={handleAddIpRule} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    IP Address or Subnet (CIDR)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. 192.168.1.0/24"
                    value={newIpRange}
                    onChange={(e) => setNewIpRange(e.target.value)}
                    required
                    className="rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Rule Label / Description
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. HQ Office Gateway"
                    value={newIpLabel}
                    onChange={(e) => setNewIpLabel(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs py-2.5">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Whitelist Rule
                  </Button>
                </div>
              </form>

              {/* IP Rules Table */}
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left font-medium text-xs">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">IP Range (CIDR)</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Added By</th>
                      <th className="px-4 py-3">Date Added</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {ipRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                        <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{rule.ipRange}</td>
                        <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{rule.description}</td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{rule.addedBy}</td>
                        <td className="px-4 py-3 text-zinc-500 font-mono text-[11px]">{rule.addedAt}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteIpRule(rule.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 5: Audit Trail */}
          {activeTab === 'audit-logs' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#94cb3d]" />
                  Security Event Audit Trail
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Immutable audit record of all security configuration changes.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { action: 'SECURITY_POLICY_UPDATE', detail: 'Session timeout updated to 30 minutes', user: 'SuperAdmin', time: 'Today, 09:00 AM' },
                  { action: 'IP_WHITELIST_ADD', detail: 'Added IP subnet 192.168.1.0/24 to WAF whitelist', user: 'SuperAdmin', time: 'Today, 08:30 AM' },
                  { action: '2FA_ENFORCE_TOGGLE', detail: 'Two-Factor Authentication set to Optional for All Users', user: 'SuperAdmin', time: 'Yesterday, 04:15 PM' },
                  { action: 'DEVICE_ACCESS_REVOKE', detail: 'Revoked access for unauthorized device DEV-9901-AND', user: 'SuperAdmin', time: '2 days ago' },
                ].map((audit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="brand" className="text-[10px] font-mono">{audit.action}</Badge>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{audit.detail}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Performed by {audit.user}</p>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">{audit.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
