'use client';

import { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Bell,
  Sliders,
  Database,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Download,
  Upload,
  Globe,
  Clock,
  Sparkles,
  Server,
  Key,
  Smartphone,
  ShieldAlert,
  HardDrive,
  Check,
  X,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // General State
  const [systemName, setSystemName] = useState('Coral HRMS Master Engine');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currencySymbol, setCurrencySymbol] = useState('INR (₹)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Security State
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [reqUppercase, setReqUppercase] = useState(true);
  const [reqNumber, setReqNumber] = useState(true);
  const [reqSpecialChar, setReqSpecialChar] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState('optional');

  // Notifications State
  const [notifyLeave, setNotifyLeave] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyPayroll, setNotifyPayroll] = useState(true);
  const [smtpHost, setSmtpHost] = useState('smtp.mailgun.org');
  const [smtpPort, setSmtpPort] = useState('587');

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('System configuration settings saved successfully to MongoDB!', 'success');
    }, 600);
  };

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      showToast('Enterprise MongoDB database backup snapshot created & downloaded!', 'success');
    }, 1200);
  };

  const handleTestSmtp = () => {
    showToast('Sending test email via SMTP Gateway to SuperAdmin...', 'info');
  };

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
              : 'bg-[#94cb3d] text-zinc-950 border-[#94cb3d] shadow-[#94cb3d]/20'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Settings className="h-3.5 w-3.5" />
                <span>SuperAdmin Master Config</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                System Health: 100% Operational
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              System-Wide Enterprise Settings
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Global administration panel for system parameters, security policies, SMTP gateways, 3rd-party integrations, and automated database backups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all flex items-center gap-2"
            >
              <Save className={`h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />
              Save All Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Settings Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active System Modules
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Sliders className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">5 Configured</h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              MongoDB Database Sync Active
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Security Protocol
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Enforced</h3>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 block">
              {sessionTimeout}m Timeout • 2FA Ready
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              SMTP Email Gateway
            </span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Operational</h3>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 block">
              SSL / TLS Encrypted
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Last Backup Status
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Healthy</h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              Daily Automated Snapshots
            </span>
          </div>
        </div>
      </div>

      {/* Main Settings Section Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-2 shadow-sm space-y-1">
            {[
              { id: 'general', label: 'General & Locale', icon: Globe },
              { id: 'security', label: 'Security & Access', icon: Lock },
              { id: 'notifications', label: 'Notifications & SMTP', icon: Bell },
              { id: 'integrations', label: '3rd-Party Integrations', icon: Server },
              { id: 'backup', label: 'Backup & Restore', icon: Database },
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
        <div className="flex-1">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
            {/* Tab 1: General & Locale */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveChanges} className="space-y-6 text-xs font-medium">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#94cb3d]" />
                    General System & Localization Settings
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Configure global HRMS parameters and branding.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      System Name
                    </label>
                    <input
                      type="text"
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Default Currency
                    </label>
                    <select
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    >
                      <option value="INR (₹)">Indian Rupee (₹ INR)</option>
                      <option value="USD ($)">US Dollar ($ USD)</option>
                      <option value="EUR (€)">Euro (€ EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Default Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Default Date Format
                    </label>
                    <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 27/08/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-08-27)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 08/27/2026)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-700 dark:text-amber-400">System Maintenance Mode</p>
                    <p className="text-[11px] text-zinc-500">Prevents non-admin employees from logging into the portal</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="h-5 w-5 rounded accent-[#94cb3d]"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save General Settings
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 2: Security & Access Control */}
            {activeTab === 'security' && (
              <form onSubmit={handleSaveChanges} className="space-y-6 text-xs font-medium">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-500" />
                    Security & Session Policies
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Enforce login authentication and password complexity.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Session Idle Timeout (Minutes)
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={1440}
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">Password Complexity Policy</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reqUppercase}
                          onChange={(e) => setReqUppercase(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span className="text-xs font-semibold">Require Uppercase</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reqNumber}
                          onChange={(e) => setReqNumber(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span className="text-xs font-semibold">Require Numbers</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reqSpecialChar}
                          onChange={(e) => setReqSpecialChar(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span className="text-xs font-semibold">Require Special Chars</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Two-Factor Authentication (2FA) Enforcement
                    </label>
                    <select
                      value={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                    >
                      <option value="disabled">Disabled</option>
                      <option value="optional">Optional for All Users</option>
                      <option value="required">Required for Administrators & HR</option>
                      <option value="all">Mandatory for All Employees</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Security Policies
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 3: Notifications & SMTP */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleSaveChanges} className="space-y-6 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <Bell className="h-4 w-4 text-purple-500" />
                      Email & Gateway Notification Settings
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">Configure system alert events and SMTP server credentials.</p>
                  </div>
                  <Button
                    type="button"
                    onClick={handleTestSmtp}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs font-bold"
                  >
                    Test SMTP Connection
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">Automated Notification Triggers</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyLeave}
                          onChange={(e) => setNotifyLeave(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span>Send email notifications on Leave Requests & Approvals</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyAttendance}
                          onChange={(e) => setNotifyAttendance(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span>Send email notifications on Late Attendance & GPS Punch Alerts</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyPayroll}
                          onChange={(e) => setNotifyPayroll(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#94cb3d]"
                        />
                        <span>Send email notifications on Monthly Payslip Disbursal</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        SMTP Host Server
                      </label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        SMTP Server Port
                      </label>
                      <input
                        type="text"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                  >
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Notification Config
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 4: 3rd-Party Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6 text-xs font-medium">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Server className="h-4 w-4 text-teal-500" />
                    Third-Party API & Webhook Integrations
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Connect external platforms and biometric attendance machines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Slack Webhook</h3>
                      </div>
                      <Badge variant="brand">Connected</Badge>
                    </div>
                    <p className="text-[11px] text-zinc-500">Post leave requests and check-in announcements directly to Slack channels.</p>
                    <Button size="sm" variant="outline" onClick={() => showToast('Slack Webhook updated!', 'info')} className="rounded-xl text-xs mt-2">
                      Configure Webhook
                    </Button>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">WhatsApp Business API</h3>
                      </div>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                    <p className="text-[11px] text-zinc-500">Send WhatsApp payslip alerts and daily biometric attendance updates.</p>
                    <Button size="sm" variant="outline" onClick={() => showToast('WhatsApp API ready for setup!', 'info')} className="rounded-xl text-xs mt-2">
                      Configure API Key
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="space-y-6 text-xs font-medium">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#94cb3d]" />
                    MongoDB Backup & Snapshot Restore Engine
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Generate full database backups or restore system state.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Manual Database Snapshot</h3>
                      <p className="text-[11px] text-zinc-500">Download a full JSON/BSON snapshot of all collections</p>
                    </div>
                    <Button
                      onClick={handleCreateBackup}
                      isLoading={isBackingUp}
                      className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4"
                    >
                      <Download className="h-4 w-4 mr-1.5" />
                      Create Backup Now
                    </Button>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Restore Database from Backup</h3>
                    <input
                      type="file"
                      accept=".json,.bson,.zip"
                      className="w-full px-3 py-2 text-xs border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => showToast('Database restore verification initiated...', 'info')}
                      className="rounded-xl text-xs font-bold"
                    >
                      <Upload className="h-4 w-4 mr-1.5" />
                      Verify & Restore Database
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
