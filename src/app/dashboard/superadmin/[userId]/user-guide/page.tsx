'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Users,
  Calendar,
  DollarSign,
  ClipboardCheck,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Zap,
  ArrowRight,
  Lock,
  Building2,
  FileText,
  Clock,
  Layers,
  Settings,
  ExternalLink,
  Cpu,
  Database,
  Move,
  Hand,
  MousePointer,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface MindNode {
  id: string;
  parentId?: string;
  title: string;
  category: 'core' | 'admin' | 'employee' | 'leave' | 'payroll' | 'approvals';
  icon: any;
  shortDesc: string;
  fullOverview: string;
  steps: string[];
  dbEndpoint?: string;
  targetRoute?: string;
  x: number;
  y: number;
  accentColor: string;
  subItems?: string[];
}

export default function AdvancedMindMapUserGuide() {
  const params = useParams();
  const router = useRouter();
  const userId = (params.userId as string) || '6a8abc6bfd73fb208b7611b4';

  const [selectedNodeId, setSelectedNodeId] = useState<string>('leave-engine');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  // Grab & Pan Dragging State
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isGrabActive, setIsGrabActive] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoomLevel((z) => Math.min(Math.max(z + delta, 0.6), 1.5));
    } else {
      setPanOffset((prev) => ({
        x: prev.x - e.deltaX * 0.8,
        y: prev.y - e.deltaY * 0.8,
      }));
    }
  };

  // Definition of 5 Major Branches and 15 Sub-Nodes
  const mindMapNodes: MindNode[] = [
    // --- ROOT NODE ---
    {
      id: 'root-core',
      title: 'Coral HRMS Master Engine',
      category: 'core',
      icon: Cpu,
      shortDesc: 'Central Processing & Database Hub',
      fullOverview: 'The core architecture connecting all 36 HRMS modules, Express REST APIs, and MongoDB database collections.',
      steps: [
        'Central JWT Authentication and Role-Based Access Control (RBAC).',
        'Real-time WebSocket event dispatching for notifications & attendance.',
        'Unified Data Layer managing Employees, Leaves, Payroll, Assets, and Audit Trails.',
      ],
      dbEndpoint: '/api/v1/health',
      x: 480,
      y: 280,
      accentColor: '#94cb3d',
    },

    // --- BRANCH 1: SuperAdmin Control ---
    {
      id: 'admin-hub',
      parentId: 'root-core',
      title: 'SuperAdmin & Security Center',
      category: 'admin',
      icon: ShieldCheck,
      shortDesc: 'Role Permissions & Platform Config',
      fullOverview: 'Global administrative control for page permissions, multi-company setups, WAF IP whitelisting, and system audit logs.',
      steps: [
        'Manage page-level action permissions under Role Access Control.',
        'Configure multi-tenant companies and branch locations.',
        'Enforce 2FA security, session timeouts, and IP whitelist rules.',
      ],
      dbEndpoint: '/api/v1/access-control',
      targetRoute: `/dashboard/superadmin/${userId}/access-control`,
      x: 180,
      y: 120,
      accentColor: '#3b82f6',
      subItems: ['Role & Page Access', 'Company Directory', 'Audit Logs & WAF'],
    },
    {
      id: 'admin-roles',
      parentId: 'admin-hub',
      title: 'Granular Role Permissions',
      category: 'admin',
      icon: Lock,
      shortDesc: 'SuperAdmin, HR, Accounts & Employee Rights',
      fullOverview: 'Define exact read/write/delete capabilities for every page across all user roles.',
      steps: ['Select Target Role.', 'Toggle page view and action switches.', 'Save rules to MongoDB.'],
      dbEndpoint: '/api/v1/access-control/permissions',
      targetRoute: `/dashboard/superadmin/${userId}/access-control`,
      x: 60,
      y: 40,
      accentColor: '#60a5fa',
    },
    {
      id: 'admin-companies',
      parentId: 'admin-hub',
      title: 'Multi-Tenant Company Hub',
      category: 'admin',
      icon: Building2,
      shortDesc: 'Manage Parent Companies & Entities',
      fullOverview: 'Register new corporate entities, branches, and tenant configurations.',
      steps: ['Add Company Profile.', 'Set tax registration (GSTIN/PAN).', 'Assign dedicated admins.'],
      dbEndpoint: '/api/v1/companies',
      targetRoute: `/dashboard/superadmin/${userId}/companies`,
      x: 60,
      y: 180,
      accentColor: '#3b82f6',
    },

    // --- BRANCH 2: Employee Lifecycle ---
    {
      id: 'employee-hub',
      parentId: 'root-core',
      title: 'Employee Directory & Onboarding',
      category: 'employee',
      icon: Users,
      shortDesc: 'Complete Employee Lifecycle Suite',
      fullOverview: 'From digital onboarding and profile management to asset allocation and document compliance.',
      steps: [
        'Add new staff via Employee Registration Wizard.',
        'Collect digital identity documents (PAN, Aadhaar, Bank Details).',
        'Assign company IT assets (Laptops, SIMs) with auto-tracking.',
      ],
      dbEndpoint: '/api/v1/users',
      targetRoute: `/dashboard/superadmin/${userId}/users`,
      x: 780,
      y: 120,
      accentColor: '#06b6d4',
      subItems: ['Employee Profiles', 'Digital Onboarding', 'IT Asset Tracking'],
    },
    {
      id: 'emp-profile',
      parentId: 'employee-hub',
      title: 'Employee Master Profiles',
      category: 'employee',
      icon: Users,
      shortDesc: 'Personal, Work & Salary Records',
      fullOverview: 'Centralized employee repository holding contact details, manager hierarchy, and bank details.',
      steps: ['Search employee by ID or Name.', 'View complete background details.', 'Edit role or department.'],
      dbEndpoint: '/api/v1/users/:id',
      targetRoute: `/dashboard/superadmin/${userId}/users`,
      x: 900,
      y: 40,
      accentColor: '#22d3ee',
    },
    {
      id: 'emp-assets',
      parentId: 'employee-hub',
      title: 'IT Hardware Assets',
      category: 'employee',
      icon: Layers,
      shortDesc: 'Hardware Inventory & Allocation',
      fullOverview: 'Track company hardware inventory in ₹ INR valuation, assigning devices to employees with serial numbers.',
      steps: ['Register Hardware Asset.', 'Assign to Employee ID.', 'Track warranty & valuation.'],
      dbEndpoint: '/api/v1/assets',
      targetRoute: `/dashboard/superadmin/${userId}/assets`,
      x: 900,
      y: 180,
      accentColor: '#0891b2',
    },

    // --- BRANCH 3: Leave Engine & 6-Month Rules ---
    {
      id: 'leave-engine',
      parentId: 'root-core',
      title: 'CL & PL Leave Rules Engine',
      category: 'leave',
      icon: Calendar,
      shortDesc: 'Monthly Auto-Fill & 6-Month Probation Rule',
      fullOverview: 'Automated monthly leave credit engine enforcing 6-month probation rules and 1st CL -> 2nd PL -> 3rd LWP priority consumption.',
      steps: [
        '0-6 Months Probation: Only Casual Leave (CL) is accrued monthly.',
        '6+ Months Post-Probation: Both CL and Privilege Leave (PL) auto-fill every month.',
        'Absence Conversion: Admins can manually convert absences to CL or PL.',
        'Priority Consumption: 1st CL consumed -> 2nd PL consumed -> 3rd LWP triggered.',
      ],
      dbEndpoint: '/api/v1/leaves/policy',
      targetRoute: `/dashboard/superadmin/${userId}/leave-setup`,
      x: 180,
      y: 420,
      accentColor: '#10b981',
      subItems: ['CL Monthly Auto-Fill', '6-Month Probation Gate', '1st CL -> 2nd PL -> LWP Priority'],
    },
    {
      id: 'leave-accrual',
      parentId: 'leave-engine',
      title: 'Monthly Auto-Accrual Cron',
      category: 'leave',
      icon: Clock,
      shortDesc: 'Auto Credits CL & PL on 1st of Month',
      fullOverview: 'Background engine that automatically credits leave balances to active employees based on service duration.',
      steps: ['Check joining date.', 'Apply probation rule.', 'Credit MongoDB LeaveBalance.'],
      dbEndpoint: '/api/v1/leaves/admin/run-accrual',
      targetRoute: `/dashboard/superadmin/${userId}/leave-setup`,
      x: 60,
      y: 350,
      accentColor: '#34d399',
    },
    {
      id: 'leave-override',
      parentId: 'leave-engine',
      title: 'Admin Absence Converter',
      category: 'leave',
      icon: Settings,
      shortDesc: 'Manual Admin Absence to CL/PL',
      fullOverview: 'Admin tool allowing manual conversion of absent days into CL or PL with instant balance update.',
      steps: ['Select Employee.', 'Input absent days count.', 'Choose Auto-Priority or Direct CL/PL.'],
      dbEndpoint: '/api/v1/leaves/admin/convert-absence',
      targetRoute: `/dashboard/superadmin/${userId}/leave-setup`,
      x: 60,
      y: 490,
      accentColor: '#059669',
    },

    // --- BRANCH 4: Indian Payroll & Tax ---
    {
      id: 'payroll-engine',
      parentId: 'root-core',
      title: 'Indian Payroll & Tax Suite (INR / ₹)',
      category: 'payroll',
      icon: DollarSign,
      shortDesc: 'Base Pay, HRA, PF, ESI & LWP Deductions',
      fullOverview: 'Automated Indian statutory payroll processing in ₹ INR with LWP salary deductions and PDF payslips.',
      steps: [
        'Formulate salary structure with Basic, HRA, Special Allowance.',
        'Auto-calculate PF (12%), ESI (0.75%), and LWP deduction formula: (Base Salary ÷ 30) × LWP Days.',
        'Generate and disburse PDF payslips in Indian Rupee (₹).',
      ],
      dbEndpoint: '/api/v1/payroll',
      targetRoute: `/dashboard/superadmin/${userId}/reports`,
      x: 780,
      y: 420,
      accentColor: '#8b5cf6',
      subItems: ['Base Pay & HRA', 'PF & ESI Compliance', 'LWP Salary Auto-Deductions'],
    },
    {
      id: 'payroll-formula',
      parentId: 'payroll-engine',
      title: 'LWP Payroll Deduction Formula',
      category: 'payroll',
      icon: CalculatorIcon,
      shortDesc: 'Salary Deduction = (Base ÷ 30) × LWP',
      fullOverview: 'Exact payroll formula enforced when employee exhausts paid CL & PL leaves.',
      steps: ['Fetch monthly LWP count.', 'Divide Base Salary by 30.', 'Subtract deduction from net pay.'],
      dbEndpoint: '/api/v1/payroll/calculate',
      targetRoute: `/dashboard/superadmin/${userId}/reports`,
      x: 900,
      y: 350,
      accentColor: '#a78bfa',
    },
    {
      id: 'payroll-payslips',
      parentId: 'payroll-engine',
      title: 'PDF Payslip Generator (₹)',
      category: 'payroll',
      icon: FileText,
      shortDesc: 'One-Click INR Payslip Disbursal',
      fullOverview: 'Generate digital PDF payslips formatted in Indian Rupee (₹ INR) with tax breakdown.',
      steps: ['Select Pay Period.', 'Review statutory line items.', 'Disburse to Employee Portal.'],
      dbEndpoint: '/api/v1/payslips',
      targetRoute: `/dashboard/superadmin/${userId}/reports`,
      x: 900,
      y: 490,
      accentColor: '#7c3aed',
    },

    // --- BRANCH 5: Approvals Center ---
    {
      id: 'approvals-hub',
      parentId: 'root-core',
      title: 'Unified Approvals Center',
      category: 'approvals',
      icon: ClipboardCheck,
      shortDesc: '1-Click HR Approvals Inbox',
      fullOverview: 'Central inbox for HR Managers and SuperAdmins to approve leave requests, attendance regularizations, and expense claims.',
      steps: [
        'Open Approvals Inbox.',
        'Inspect request details, employee leave balance, and manager notes.',
        'Click Approve or Reject for instant status update & email alert.',
      ],
      dbEndpoint: '/api/v1/leaves/approvals',
      targetRoute: `/dashboard/superadmin/${userId}/reports`,
      x: 480,
      y: 530,
      accentColor: '#f59e0b',
      subItems: ['Leave Approvals Inbox', 'Attendance Punch Regularization', 'Reimbursements & Claims'],
    },
  ];

  const selectedNode = mindMapNodes.find((n) => n.id === selectedNodeId) || mindMapNodes[0];

  const filteredNodes = mindMapNodes.filter((node) => {
    const matchesCategory = activeCategory === 'all' || node.category === activeCategory || node.category === 'core';
    const matchesSearch =
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.fullOverview.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showToastMsg = (msg: string) => {
    setToast({ message: msg, type: 'info' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12 select-none">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center gap-2.5 shadow-2xl border border-zinc-700 animate-in fade-in slide-in-from-top-4">
          <Zap className="h-4 w-4 text-[#94cb3d]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Hero Header & Control Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Hand className="h-3.5 w-3.5" />
                <span>Grab & Scroll Pan Canvas Active</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Click & Drag Mouse to Pan Canvas
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              HRMS System Architecture & Operations Mind Map
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Use mouse click-and-drag to grab and pan around the infinite canvas. Use scroll wheel to pan smoothly or Ctrl + Scroll to zoom in and out.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Filter mind map nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-400 rounded-xl text-xs font-medium w-full sm:w-56"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1.5 rounded-xl border border-zinc-700">
              <button
                onClick={() => setIsGrabActive(!isGrabActive)}
                title="Toggle Grab Hand Mode"
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                  isGrabActive
                    ? 'bg-[#94cb3d] text-zinc-950 shadow-md'
                    : 'hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                <Hand className="h-4 w-4" />
                <span className="hidden sm:inline">Grab</span>
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                title="Zoom In"
                className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
                title="Zoom Out"
                className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                  setSearchTerm('');
                  setActiveCategory('all');
                  setSelectedNodeId('root-core');
                  showToastMsg('Canvas view reset');
                }}
                title="Reset View & Pan"
                className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Connected Modules', icon: Layers },
          { id: 'admin', label: 'SuperAdmin & Security', icon: ShieldCheck },
          { id: 'employee', label: 'Employee Lifecycle', icon: Users },
          { id: 'leave', label: 'Leave Rules & Probation Engine', icon: Calendar },
          { id: 'payroll', label: 'Indian Payroll (₹ INR)', icon: DollarSign },
          { id: 'approvals', label: 'Approvals Inbox', icon: ClipboardCheck },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#94cb3d] text-zinc-950 shadow-md shadow-[#94cb3d]/20'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Split Screen: Grab & Scroll Interactive Canvas + Live Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Grab & Pan Interactive Vector Mind Map Canvas */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`lg:col-span-8 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 relative overflow-hidden shadow-2xl min-h-[620px] flex flex-col justify-between select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

          {/* Interactive Scalable & Pannable Canvas */}
          <div
            ref={containerRef}
            className="relative w-full h-[580px] transition-transform duration-75 origin-top-left"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            }}
          >
            {/* SVG Connecting Bezier Vector Curves Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94cb3d" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {filteredNodes.map((node) => {
                if (!node.parentId) return null;
                const parent = mindMapNodes.find((p) => p.id === node.parentId);
                if (!parent) return null;

                const isConnectedToSelected = selectedNodeId === node.id || selectedNodeId === parent.id;

                const dx = node.x - parent.x;
                const dy = node.y - parent.y;
                const cx1 = parent.x + dx * 0.5;
                const cy1 = parent.y;
                const cx2 = parent.x + dx * 0.5;
                const cy2 = node.y;

                const pathData = `M ${parent.x + 80} ${parent.y + 25} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${node.x} ${node.y + 25}`;

                return (
                  <g key={`link-${node.id}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isConnectedToSelected ? 'url(#gradient-active)' : '#334155'}
                      strokeWidth={isConnectedToSelected ? '3' : '1.5'}
                      strokeDasharray={isConnectedToSelected ? 'none' : '4 4'}
                      className="transition-all duration-300"
                    />
                    {isConnectedToSelected && (
                      <circle
                        cx={(parent.x + node.x) / 2}
                        cy={(parent.y + node.y) / 2}
                        r="4"
                        fill="#94cb3d"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Mind Map Nodes */}
            {filteredNodes.map((node) => {
              const NodeIcon = node.icon;
              const isSelected = selectedNodeId === node.id;
              const isRoot = node.category === 'core';

              return (
                <div
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                    showToastMsg(`Selected Module: ${node.title}`);
                  }}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                  }}
                  className={`absolute z-10 cursor-pointer transition-all duration-200 group ${
                    isRoot
                      ? 'w-56 p-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-850 to-zinc-900 border-2 border-[#94cb3d] shadow-xl shadow-[#94cb3d]/20 text-white'
                      : isSelected
                      ? 'w-52 p-3.5 rounded-2xl bg-zinc-900 border-2 border-[#94cb3d] shadow-lg shadow-[#94cb3d]/20 text-white scale-105'
                      : 'w-48 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:scale-102'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="p-2 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                      style={{ backgroundColor: node.accentColor }}
                    >
                      <NodeIcon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold tracking-tight truncate group-hover:text-[#94cb3d] transition-colors">
                          {node.title}
                        </h3>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate">{node.shortDesc}</p>
                    </div>
                  </div>

                  {/* Sub items chip preview */}
                  {node.subItems && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
                      {node.subItems.map((sub, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Canvas Footer Legend */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white flex items-center gap-1">
                <Hand className="h-3.5 w-3.5 text-[#94cb3d]" /> Grab & Drag Active
              </span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#94cb3d]" /> System Core</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> SuperAdmin</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Leave Rules</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Payroll (₹)</span>
            </div>
            <span className="text-zinc-500">Pan Offset: ({Math.round(panOffset.x)}px, {Math.round(panOffset.y)}px) • Zoom: {Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>

        {/* Right 4 Columns: Interactive Live Module Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm sticky top-20 space-y-5">
            {/* Selected Node Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div
                className="p-3 rounded-2xl text-white shrink-0 shadow-md"
                style={{ backgroundColor: selectedNode.accentColor }}
              >
                <selectedNode.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold uppercase tracking-wider border-zinc-300 dark:border-zinc-700"
                >
                  {selectedNode.category.toUpperCase()} MODULE
                </Badge>
                <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
                  {selectedNode.title}
                </h2>
              </div>
            </div>

            {/* Module Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Module Overview
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {selectedNode.fullOverview}
              </p>
            </div>

            {/* Step-by-Step Workflow */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Step-by-Step Operational Manual
              </h4>
              <div className="space-y-2">
                {selectedNode.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-start gap-2.5"
                  >
                    <span
                      className="h-5 w-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                      style={{ backgroundColor: selectedNode.accentColor }}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Database Specs */}
            {selectedNode.dbEndpoint && (
              <div className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-zinc-400 flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-[#94cb3d]" /> Express REST Endpoint
                  </span>
                  <span className="font-mono text-[#94cb3d]">GET / POST</span>
                </div>
                <p className="font-mono text-xs text-zinc-200 font-semibold">{selectedNode.dbEndpoint}</p>
              </div>
            )}

            {/* Direct Page Navigation Trigger */}
            {selectedNode.targetRoute && (
              <Button
                onClick={() => router.push(selectedNode.targetRoute!)}
                className="w-full bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs py-3 shadow-md shadow-[#94cb3d]/20 flex items-center justify-center gap-2"
              >
                <span>Launch {selectedNode.title} Module</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalculatorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}
