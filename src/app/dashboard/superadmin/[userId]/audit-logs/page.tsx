'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  RefreshCw,
  Clock,
  User,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Eye,
  PlusCircle,
  Edit3,
  Trash2,
  Lock,
  FileText,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpRight,
  Activity,
  Copy,
  Terminal,
  ChevronRight,
  Info,
  KeyRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface AuditLog {
  id: string;
  action: 'create' | 'update' | 'delete' | 'read' | 'login' | 'security';
  entity: string;
  entityId: string;
  performedBy: string;
  userRole: string;
  userId: string;
  timestamp: string;
  relativeTime: string;
  ipAddress: string;
  location?: string;
  details: string;
  company: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  changes?: { field: string; oldValue: string; newValue: string }[];
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'all' | 'modifications' | 'access' | 'financial' | 'security'>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    // Initializing mock enterprise audit logs dataset
    const timer = setTimeout(() => {
      setLogs([
        {
          id: 'AUD-89201',
          action: 'create',
          entity: 'Company',
          entityId: 'COMP-789',
          performedBy: 'Kishan Admin',
          userRole: 'SuperAdmin',
          userId: 'USR-001',
          timestamp: '2026-08-27T08:42:15.000Z',
          relativeTime: '3 mins ago',
          ipAddress: '192.168.1.105',
          location: 'Mumbai, MH, India',
          details: 'Initialized new corporate subsidiary "Tech Solutions Pvt Ltd" with default HR policies.',
          company: 'Global Corporate Group',
          severity: 'medium',
          changes: [
            { field: 'companyName', oldValue: 'None', newValue: 'Tech Solutions Pvt Ltd' },
            { field: 'taxRegistration', oldValue: 'Pending', newValue: 'GSTIN27AAAAA0000A1Z5' },
          ],
        },
        {
          id: 'AUD-89202',
          action: 'update',
          entity: 'User',
          entityId: 'USR-342',
          performedBy: 'John Smith',
          userRole: 'HR Manager',
          userId: 'USR-042',
          timestamp: '2026-08-27T08:15:00.000Z',
          relativeTime: '30 mins ago',
          ipAddress: '10.0.4.12',
          location: 'Bengaluru, KA, India',
          details: 'Elevated user permissions to Senior Accounts Manager role with full payroll access.',
          company: 'Acme Enterprise',
          severity: 'high',
          changes: [
            { field: 'role', oldValue: 'Accounts Assistant', newValue: 'Senior Accounts Manager' },
            { field: 'permissions', oldValue: 'read_only', newValue: 'read_write_payroll' },
          ],
        },
        {
          id: 'AUD-89203',
          action: 'delete',
          entity: 'Employee',
          entityId: 'EMP-905',
          performedBy: 'Kishan Admin',
          userRole: 'SuperAdmin',
          userId: 'USR-001',
          timestamp: '2026-08-27T07:50:22.000Z',
          relativeTime: '55 mins ago',
          ipAddress: '192.168.1.105',
          location: 'Mumbai, MH, India',
          details: 'Terminated employee record following offboarding clearance.',
          company: 'Acme Enterprise',
          severity: 'critical',
          changes: [
            { field: 'status', oldValue: 'Active', newValue: 'Terminated' },
            { field: 'accessRevoked', oldValue: 'False', newValue: 'True' },
          ],
        },
        {
          id: 'AUD-89204',
          action: 'create',
          entity: 'Role',
          entityId: 'ROL-104',
          performedBy: 'Kishan Admin',
          userRole: 'SuperAdmin',
          userId: 'USR-001',
          timestamp: '2026-08-27T06:30:10.000Z',
          relativeTime: '2 hours ago',
          ipAddress: '192.168.1.105',
          location: 'Mumbai, MH, India',
          details: 'Configured custom security role "Auditor Level 2" with read-only master log view.',
          company: 'Global Corporate Group',
          severity: 'low',
        },
        {
          id: 'AUD-89205',
          action: 'read',
          entity: 'Payroll',
          entityId: 'PAY-2026-08',
          performedBy: 'Priya Sharma',
          userRole: 'Accounts Officer',
          userId: 'USR-088',
          timestamp: '2026-08-27T05:12:40.000Z',
          relativeTime: '3 hours ago',
          ipAddress: '172.16.0.45',
          location: 'Delhi, DL, India',
          details: 'Exported monthly salary ledger & TDS statutory tax calculation document.',
          company: 'Acme Enterprise',
          severity: 'low',
        },
        {
          id: 'AUD-89206',
          action: 'security',
          entity: 'AccessControl',
          entityId: 'SEC-991',
          performedBy: 'Security Bot',
          userRole: 'Automated System',
          userId: 'SYS-BOT',
          timestamp: '2026-08-27T03:00:00.000Z',
          relativeTime: '5 hours ago',
          ipAddress: '127.0.0.1',
          location: 'Cloud Server',
          details: 'Automated 2FA enforcement scan completed for 250 enterprise employee accounts.',
          company: 'All Companies',
          severity: 'low',
        },
        {
          id: 'AUD-89207',
          action: 'login',
          entity: 'UserSession',
          entityId: 'SES-7781',
          performedBy: 'Amit Kumar',
          userRole: 'HR Manager',
          userId: 'USR-019',
          timestamp: '2026-08-27T01:20:15.000Z',
          relativeTime: '7 hours ago',
          ipAddress: '49.36.12.89',
          location: 'Pune, MH, India',
          details: 'Successful login via OAuth2 single sign-on with biometric challenge.',
          company: 'Tech Solutions Pvt Ltd',
          severity: 'low',
        },
      ]);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        log.id.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.entity.toLowerCase().includes(query) ||
        log.performedBy.toLowerCase().includes(query) ||
        log.company.toLowerCase().includes(query) ||
        log.ipAddress.toLowerCase().includes(query) ||
        (log.details && log.details.toLowerCase().includes(query));

      const matchesAction = filterAction === 'all' || log.action === filterAction;
      const matchesEntity = filterEntity === 'all' || log.entity === filterEntity;
      const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;

      let matchesTab = true;
      if (selectedTab === 'modifications') {
        matchesTab = ['create', 'update', 'delete'].includes(log.action);
      } else if (selectedTab === 'access') {
        matchesTab = ['login', 'read'].includes(log.action);
      } else if (selectedTab === 'financial') {
        matchesTab = log.entity === 'Payroll';
      } else if (selectedTab === 'security') {
        matchesTab = log.action === 'security' || log.severity === 'high' || log.severity === 'critical';
      }

      return matchesSearch && matchesAction && matchesEntity && matchesSeverity && matchesTab;
    });
  }, [logs, searchTerm, filterAction, filterEntity, filterSeverity, selectedTab]);

  const handleExportLogs = () => {
    showToast('Exporting filtered audit log records to CSV file...', 'success');
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Audit trail synchronized with master database server.', 'info');
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied to clipboard: "${text}"`, 'info');
  };

  const getActionBadge = (action: AuditLog['action']) => {
    switch (action) {
      case 'create':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <PlusCircle className="h-3 w-3" />
            CREATE
          </span>
        );
      case 'update':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Edit3 className="h-3 w-3" />
            UPDATE
          </span>
        );
      case 'delete':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
            <Trash2 className="h-3 w-3" />
            DELETE
          </span>
        );
      case 'read':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Eye className="h-3 w-3" />
            READ
          </span>
        );
      case 'login':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <KeyRound className="h-3 w-3" />
            LOGIN
          </span>
        );
      case 'security':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Lock className="h-3 w-3" />
            SECURITY
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600">
            {action}
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: AuditLog['severity']) => {
    switch (severity) {
      case 'low':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Low</span>;
      case 'medium':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Medium</span>;
      case 'high':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">High</span>;
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20 animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Critical
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Alert Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${toast.type === 'success'
            ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
            : toast.type === 'warning'
              ? 'bg-amber-600/95 border-amber-500 shadow-amber-900/20'
              : 'bg-zinc-900/95 border-zinc-700 shadow-zinc-900/40'
            }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>SuperAdmin Security Compliance</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Real-Time Audit Trail Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              System Audit Logs & Security Traces
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Complete tamper-evident event logging across all corporate accounts, role modifications, access control updates, payroll exports, and IP addresses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold px-3.5 py-2"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Sync Live Logs
            </Button>
            <Button
              onClick={handleExportLogs}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2 shadow-lg shadow-[#94cb3d]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Audit CSV
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Total Logged Events
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">1,428</h3>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +8.4% vs yesterday
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              System Modifications
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Edit3 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">14</h3>
            <span className="text-[11px] font-semibold text-zinc-500 mt-1 block">
              Roles & Company Changes
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Critical Alerts
            </span>
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">1</h3>
            <span className="text-[11px] font-semibold text-red-500 mt-1 block">
              Employee Offboarding Audit
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Active SuperAdmin Monitoring
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">99.9%</h3>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              Zero Unauthorized Access
            </span>
          </div>
        </div>
      </div>

      {/* Category Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'all', label: 'All Audit Logs', icon: FileText, count: logs.length },
          { id: 'modifications', label: 'Data Modifications (Create/Update/Delete)', icon: Edit3 },
          { id: 'access', label: 'User Sessions & Logins', icon: KeyRound },
          { id: 'financial', label: 'Financial & Payroll Audits', icon: Building2 },
          { id: 'security', label: 'Security Alerts & Critical Traces', icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wide transition-all border-b-2 whitespace-nowrap ${isActive
                ? 'border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/5 rounded-t-xl'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-850 rounded-t-xl'
                }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#94cb3d]' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${isActive ? 'bg-[#94cb3d] text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                    }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Advanced Search & Filter Toolbar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#94cb3d]" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Filter Audit Records
            </span>
          </div>
          {(searchTerm || filterAction !== 'all' || filterEntity !== 'all' || filterSeverity !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterAction('all');
                setFilterEntity('all');
                setFilterSeverity('all');
              }}
              className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, action, user, company, IP address..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            />
          </div>

          {/* Action Select */}
          <div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Action Types</option>
              <option value="create">CREATE</option>
              <option value="update">UPDATE</option>
              <option value="delete">DELETE</option>
              <option value="read">READ</option>
              <option value="login">LOGIN</option>
              <option value="security">SECURITY</option>
            </select>
          </div>

          {/* Entity Select */}
          <div>
            <select
              value={filterEntity}
              onChange={(e) => setFilterEntity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Target Entities</option>
              <option value="Company">Company</option>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
              <option value="Role">Role</option>
              <option value="Payroll">Payroll</option>
              <option value="AccessControl">AccessControl</option>
            </select>
          </div>

          {/* Severity Select */}
          <div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Risk Severities</option>
              <option value="low">Low (Info)</option>
              <option value="medium">Medium (Notice)</option>
              <option value="high">High (Warning)</option>
              <option value="critical">Critical (Alert)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Audit Log Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Audit Event Log Records
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Showing {filteredLogs.length} of {logs.length} system activity entries
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-bold border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/10">
            Tamper-Proof Audit Active
          </Badge>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <RefreshCw className="h-7 w-7 animate-spin text-[#94cb3d]" />
            <p className="text-xs font-semibold">Synchronizing audit security database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium border-collapse">
              <thead className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Event ID & Timestamp</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Target Entity</th>
                  <th className="py-3.5 px-4">Performed By</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Event Details</th>
                  <th className="py-3.5 px-4">IP & Location</th>
                  <th className="py-3.5 px-4 text-center">Severity</th>
                  <th className="py-3.5 px-6 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Info className="h-8 w-8 text-zinc-400" />
                        <p className="font-semibold">No audit logs match your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className="hover:bg-black/10 dark:hover:bg-black/10 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#94cb3d] transition-colors">
                              {log.id}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(log.id);
                              }}
                              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                              title="Copy ID"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-[10px] text-zinc-400 mt-0.5">
                            {new Date(log.timestamp).toLocaleString()} ({log.relativeTime})
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">{getActionBadge(log.action)}</td>
                      <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                          <span>{log.entity}</span>
                          <span className="text-[10px] text-zinc-400 font-mono">({log.entityId})</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">{log.performedBy}</span>
                          <span className="text-[10px] text-[#94cb3d] font-semibold">{log.userRole}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                        {log.company}
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate text-zinc-600 dark:text-zinc-400">
                        {log.details}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-mono text-[11px] text-zinc-800 dark:text-zinc-200 font-semibold">
                            {log.ipAddress}
                          </span>
                          <span className="text-[10px] text-zinc-400">{log.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">{getSeverityBadge(log.severity)}</td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(log);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Details Inspect Drawer Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#94cb3d]" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Audit Event Trace Details: {selectedLog.id}
                  </h3>
                  <p className="text-[11px] text-zinc-400">Recorded: {selectedLog.timestamp}</p>
                </div> 
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Target Entity</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedLog.entity} ({selectedLog.entityId})</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Action Conducted</span>
                  <div className="mt-1">{getActionBadge(selectedLog.action)}</div>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Actor / User</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedLog.performedBy} ({selectedLog.userRole})</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">IP Address & Geo</span>
                  <p className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedLog.ipAddress} ({selectedLog.location})</p>
                </div>
              </div>

              <div>
                <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Full Event Description</span>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 mt-1 font-sans leading-relaxed">
                  {selectedLog.details}
                </p>
              </div>

              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Field Changes Audit Diff</span>
                  <div className="mt-1 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        <tr>
                          <th className="py-2 px-3">Field</th>
                          <th className="py-2 px-3">Old Value</th>
                          <th className="py-2 px-3">New Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {selectedLog.changes.map((change, idx) => (
                          <tr key={idx}>
                            <td className="py-2 px-3 font-bold text-zinc-800 dark:text-zinc-200">{change.field}</td>
                            <td className="py-2 px-3 text-red-500 line-through bg-red-500/5">{change.oldValue}</td>
                            <td className="py-2 px-3 text-emerald-500 font-bold bg-emerald-500/5">{change.newValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  onClick={() => setSelectedLog(null)}
                  className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                >
                  Close Inspection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
