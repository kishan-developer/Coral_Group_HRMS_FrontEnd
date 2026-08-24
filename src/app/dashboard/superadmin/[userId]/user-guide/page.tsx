'use client';

import { useState } from 'react';
import {
  BookOpen,
  Search,
  ChevronRight,
  ShieldCheck,
  Users,
  Calendar,
  Clock,
  DollarSign,
  ClipboardCheck,
  Building2,
  Package,
  Layers,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface MindMapNode {
  id: string;
  title: string;
  category: 'core' | 'admin' | 'employee' | 'leave' | 'payroll' | 'approval';
  icon: any;
  description: string;
  steps: string[];
  subNodes: { name: string; detail: string; route?: string }[];
  accentColor: string;
}

export default function UserGuideMindMapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-1');

  const mindMapNodes: MindMapNode[] = [
    {
      id: 'node-1',
      title: 'Super Admin Command & Access Control',
      category: 'admin',
      icon: ShieldCheck,
      description: 'Central administrative portal for managing role permissions, page access, companies, and global leave policies.',
      steps: [
        'Navigate to SuperAdmin -> Role & Access Control to define user permissions.',
        'Manage Multi-Company setups under Companies Directory.',
        'Configure custom Leave Policies (CL, PL, SL, LWP) & Indian Holidays under Custom Leave Setup.',
      ],
      subNodes: [
        { name: 'Role & Page Access Control', detail: 'Assign granular view/edit rights per employee role.', route: 'access-control' },
        { name: 'Multi-Company Management', detail: 'Manage parent and branch entities seamlessly.', route: 'companies' },
        { name: 'Master Leave Policy Setup', detail: 'Persist MongoDB policy rules for CL, PL, SL & LWP.', route: 'leave-setup' },
      ],
      accentColor: '#94cb3d',
    },
    {
      id: 'node-2',
      title: 'Employee Directory & Lifecycle Management',
      category: 'employee',
      icon: Users,
      description: 'Complete employee lifecycle management from digital onboarding to profile management, documents, and asset tagging.',
      steps: [
        'Add new employees using the Employee Directory wizard.',
        'Upload required identity proofs (PAN, Aadhaar, Bank Details) for compliance.',
        'Assign company assets (Laptops, SIM Cards) with auto-tracking.',
      ],
      subNodes: [
        { name: 'Employee Profiles', detail: 'Manage personal, contact, emergency & salary information.', route: 'users' },
        { name: 'Document Verification', detail: 'Review uploaded compliance certificates and IDs.', route: 'documents' },
        { name: 'Asset Allocation', detail: 'Track hardware inventory and employee assignments.', route: 'assets' },
      ],
      accentColor: '#2563eb',
    },
    {
      id: 'node-3',
      title: 'Leave Engine & Attendance regularizations',
      category: 'leave',
      icon: Calendar,
      description: 'Automated Leave Balance Auto-Decrement (CL/PL/SL) and Attendance Regularization connected directly with Payroll.',
      steps: [
        'Employees request leaves (CL, PL, SL, LWP) from their dashboard.',
        'Managers approve requests in the Approvals Center, auto-decrementing available balance.',
        'Unapproved absences automatically log as LWP (Leave Without Pay) impacting salary calculation.',
      ],
      subNodes: [
        { name: 'Casual Leave (CL)', detail: 'Short personal leave auto-deducted from balance.', route: 'leave' },
        { name: 'Privilege Leave (PL)', detail: 'Planned vacation leave with carry-forward support.', route: 'leave' },
        { name: 'Biometric & GPS Attendance', detail: 'Daily attendance logs & regularization approvals.', route: 'attendance' },
      ],
      accentColor: '#10b981',
    },
    {
      id: 'node-4',
      title: 'Indian Payroll, Allowances & Taxes (INR / ₹)',
      category: 'payroll',
      icon: DollarSign,
      description: 'Automated Indian payroll computation including Base Pay, HRA, Special Allowances, PF, ESI, TDS, and One-Click Payslips.',
      steps: [
        'Define salary structures with Indian currency standard (INR / ₹).',
        'System calculates PF (12%), ESI (0.75%), TDS tax, and auto-deducts LWP unpaid days.',
        'Generate and distribute PDF payslips to employees instantly.',
      ],
      subNodes: [
        { name: 'Salary Components', detail: 'Configure Basic, HRA, Special Allowance & Statutory Deductions.', route: 'payroll/structure' },
        { name: 'Monthly Payroll Run', detail: 'Execute monthly payroll with auto LWP deduction.', route: 'payroll/monthly' },
        { name: 'Payslip Generation', detail: 'Generate downloadable PDF payslips in INR (₹).', route: 'payroll/payslips' },
      ],
      accentColor: '#8b5cf6',
    },
    {
      id: 'node-5',
      title: 'Unified Approvals Command Center',
      category: 'approval',
      icon: ClipboardCheck,
      description: 'Single centralized inbox to manage all pending HR requests with 1-click Approve or Reject actions.',
      steps: [
        'Open Approvals Center from the main sidebar.',
        'Filter by category (Leaves, Attendance, Overtime, Expenses, Loans, Assets).',
        'Review employee request details and click Approve or Reject with instant notification.',
      ],
      subNodes: [
        { name: 'Leave & Attendance Approvals', detail: 'Approve CL/PL/SL and punch regularizations.', route: 'approvals' },
        { name: 'Expense & Loan Claims', detail: 'Reimburse travel receipts and emergency advances.', route: 'approvals' },
        { name: 'Asset Requests', detail: 'Approve new hardware allocation requests.', route: 'approvals' },
      ],
      accentColor: '#475569',
    },
  ];

  const selectedNode = mindMapNodes.find((n) => n.id === selectedNodeId) || mindMapNodes[0];

  const filteredNodes = mindMapNodes.filter(
    (node) =>
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.subNodes.some((sub) => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Interactive HRMS User Guide & Mind Map
            </h1>
            <Badge variant="brand">System Architecture Manual</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Visual interactive mind map explaining module connections, leave logic, payroll flows, and approvals.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search mind map modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-lg text-xs font-medium"
          />
        </div>
      </div>

      {/* Main Mind Map Grid & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Mind Map Tree */}
        <div className="lg:col-span-7 space-y-4">
          {/* Central Root Node */}
          <div className="bg-[#94cb3d]/10 border-2 border-[#94cb3d] p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#94cb3d] text-white flex items-center justify-center font-bold text-lg shadow-md">
                🏢
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Coral HRMS Core Ecosystem
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Central Hub connecting All 36 Modules & Roles
                </p>
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-[#94cb3d]" />
          </div>

          {/* Connected Branch Nodes */}
          <div className="space-y-3 pl-4 border-l-2 border-dashed border-zinc-300 dark:border-zinc-700">
            {filteredNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-900 border-[#94cb3d] shadow-md ring-2 ring-[#94cb3d]/20 scale-[1.01]'
                      : 'bg-white/80 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {/* Connector Dot */}
                  <div
                    className="absolute -left-[23px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm"
                    style={{ backgroundColor: node.accentColor }}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: node.accentColor }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {node.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 mt-0.5">
                          {node.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected ? 'text-[#94cb3d] translate-x-1' : 'text-zinc-400'
                      }`}
                    />
                  </div>

                  {/* Sub-node Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                    {node.subNodes.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        • {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mind Map Inspector & Module Guide */}
        <div className="lg:col-span-5">
          <Card className="sticky top-20 rounded-xl border-zinc-200/80 dark:border-zinc-800 shadow-md">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedNode.accentColor }}
                >
                  <selectedNode.icon className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold">{selectedNode.title}</CardTitle>
                  <CardDescription className="text-[11px]">Module Workflow Guide</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-5">
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Module Overview:
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Step-by-Step Operational Workflow:
                </p>
                <div className="space-y-2">
                  {selectedNode.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                      <span
                        className="h-4 w-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: selectedNode.accentColor }}
                      >
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-node Links */}
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Connected Subpage Modules:
                </p>
                <div className="space-y-2">
                  {selectedNode.subNodes.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {sub.name}
                        </p>
                        <p className="text-[10px] text-zinc-500">{sub.detail}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
