'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  ChevronRight,
  Zap,
  Star,
  ShieldCheck,
  UserCheck,
  Building2,
  FileText,
  PieChart,
  Grid,
  Download,
  Send,
  X,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Check,
  Flame,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface PerformanceRecord {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  avatar: string;
  rating: number; // e.g. 4.8
  okrProgress: number; // e.g. 85%
  status: 'Top Performer' | 'On Track' | 'Needs Improvement' | 'Under Review';
  reviewStage: 'Self Review' | 'Manager Review' | 'HR Calibration' | 'Completed';
  reviewCycle: string;
  potentialScore: 'High' | 'Medium' | 'Low';
  performanceScore: 'High' | 'Medium' | 'Low';
  selfScore: number;
  managerScore: number;
  peerScore: number;
}

export interface OKRGoal {
  id: string;
  title: string;
  category: 'Company' | 'Department' | 'Individual';
  department: string;
  assignee: string;
  assigneeEmail: string;
  progress: number;
  targetMetric: string;
  currentValue: string;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Behind Schedule' | 'Completed';
  weightage: number;
}

export interface AppraisalCycle {
  id: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  completionRate: number;
  status: 'Active' | 'Upcoming' | 'Closed';
  totalParticipants: number;
}

export type PerformanceTab = 'overview' | 'goals' | 'appraisal' | 'ninebox' | 'reports';

export default function PerformanceDashboard() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [activeTab, setActiveTab] = useState<PerformanceTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [cycleFilter, setCycleFilter] = useState('Q3 2026 Appraisal');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Modals
  const [createCycleModal, setCreateCycleModal] = useState(false);
  const [createGoalModal, setCreateGoalModal] = useState(false);
  const [selectedEmpProfile, setSelectedEmpProfile] = useState<PerformanceRecord | null>(null);

  // New Cycle Form
  const [newCycleTitle, setNewCycleTitle] = useState('');
  const [newCyclePeriod, setNewCyclePeriod] = useState('Q4 2026');
  const [newCycleDueDate, setNewCycleDueDate] = useState('');

  // New Goal Form
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalAssignee, setNewGoalAssignee] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<OKRGoal['category']>('Individual');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  // Employee Performance Records
  const [employees, setEmployees] = useState<PerformanceRecord[]>([
    {
      id: 'emp-101',
      employeeId: 'CG-EMP-001',
      name: 'Kishan Kumar',
      email: 'kishan@coral-group.in',
      department: 'Executive Board',
      designation: 'VP of Product & Engineering',
      avatar: 'KK',
      rating: 4.9,
      okrProgress: 94,
      status: 'Top Performer',
      reviewStage: 'Completed',
      reviewCycle: 'Q3 2026 Appraisal',
      potentialScore: 'High',
      performanceScore: 'High',
      selfScore: 4.8,
      managerScore: 5.0,
      peerScore: 4.9,
    },
    {
      id: 'emp-102',
      employeeId: 'CG-EMP-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@coral-group.in',
      department: 'Human Resources',
      designation: 'Senior HR Operations Manager',
      avatar: 'SJ',
      rating: 4.6,
      okrProgress: 88,
      status: 'Top Performer',
      reviewStage: 'Completed',
      reviewCycle: 'Q3 2026 Appraisal',
      potentialScore: 'High',
      performanceScore: 'High',
      selfScore: 4.5,
      managerScore: 4.7,
      peerScore: 4.6,
    },
    {
      id: 'emp-103',
      employeeId: 'CG-EMP-003',
      name: 'Amit Verma',
      email: 'amit.v@coral-group.in',
      department: 'Finance',
      designation: 'Financial Lead',
      avatar: 'AV',
      rating: 4.1,
      okrProgress: 76,
      status: 'On Track',
      reviewStage: 'HR Calibration',
      reviewCycle: 'Q3 2026 Appraisal',
      potentialScore: 'Medium',
      performanceScore: 'High',
      selfScore: 4.0,
      managerScore: 4.2,
      peerScore: 4.1,
    },
    {
      id: 'emp-104',
      employeeId: 'CG-EMP-004',
      name: 'Priya Sharma',
      email: 'priya.s@coral-group.in',
      department: 'Engineering',
      designation: 'Lead Frontend Engineer',
      avatar: 'PS',
      rating: 4.4,
      okrProgress: 82,
      status: 'On Track',
      reviewStage: 'Manager Review',
      reviewCycle: 'Q3 2026 Appraisal',
      potentialScore: 'High',
      performanceScore: 'Medium',
      selfScore: 4.3,
      managerScore: 4.5,
      peerScore: 4.4,
    },
    {
      id: 'emp-105',
      employeeId: 'CG-EMP-005',
      name: 'Vikram Malhotra',
      email: 'vikram.m@coral-group.in',
      department: 'IT Operations',
      designation: 'DevOps & Systems Lead',
      avatar: 'VM',
      rating: 3.2,
      okrProgress: 55,
      status: 'Needs Improvement',
      reviewStage: 'Self Review',
      reviewCycle: 'Q3 2026 Appraisal',
      potentialScore: 'Low',
      performanceScore: 'Low',
      selfScore: 3.5,
      managerScore: 3.0,
      peerScore: 3.1,
    },
  ]);

  // OKR Goals
  const [goals, setGoals] = useState<OKRGoal[]>([
    {
      id: 'g-1',
      title: 'Achieve 99.9% HRMS System Uptime & Microservice SLA',
      category: 'Company',
      department: 'Engineering',
      assignee: 'Vikram Malhotra',
      assigneeEmail: 'vikram.m@coral-group.in',
      progress: 92,
      targetMetric: '99.9% Uptime',
      currentValue: '99.85%',
      dueDate: '2026-09-30',
      status: 'On Track',
      weightage: 30,
    },
    {
      id: 'g-2',
      title: 'Complete Annual Performance Review Calibration for 200+ Staff',
      category: 'Department',
      department: 'Human Resources',
      assignee: 'Sarah Johnson',
      assigneeEmail: 'sarah.j@coral-group.in',
      progress: 88,
      targetMetric: '200 Employees',
      currentValue: '176 Completed',
      dueDate: '2026-09-15',
      status: 'On Track',
      weightage: 25,
    },
    {
      id: 'g-3',
      title: 'Reduce Monthly Payroll Processing Turnaround Time to < 24 Hours',
      category: 'Department',
      department: 'Finance',
      assignee: 'Amit Verma',
      assigneeEmail: 'amit.v@coral-group.in',
      progress: 60,
      targetMetric: '< 24 Hours',
      currentValue: '36 Hours',
      dueDate: '2026-10-15',
      status: 'At Risk',
      weightage: 20,
    },
    {
      id: 'g-4',
      title: 'Migrate Core Frontend Dashboards to TailwindCSS 4 & Next.js 16 Turbo',
      category: 'Individual',
      department: 'Engineering',
      assignee: 'Priya Sharma',
      assigneeEmail: 'priya.s@coral-group.in',
      progress: 85,
      targetMetric: '100% Migration',
      currentValue: '85% Converted',
      dueDate: '2026-09-20',
      status: 'On Track',
      weightage: 25,
    },
  ]);

  // Appraisal Cycles
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([
    {
      id: 'ac-1',
      title: 'Q3 2026 Appraisal Cycle',
      period: 'Jul 2026 - Sep 2026',
      startDate: '2026-08-01',
      endDate: '2026-09-30',
      completionRate: 88,
      status: 'Active',
      totalParticipants: 50,
    },
    {
      id: 'ac-2',
      title: 'Mid-Year 2026 Performance Review',
      period: 'Jan 2026 - Jun 2026',
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      completionRate: 100,
      status: 'Closed',
      totalParticipants: 48,
    },
  ]);

  const showNotification = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleCreateCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCycleTitle) return;

    const cycle: AppraisalCycle = {
      id: `ac-${Date.now()}`,
      title: newCycleTitle,
      period: newCyclePeriod,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newCycleDueDate || '2026-12-31',
      completionRate: 0,
      status: 'Active',
      totalParticipants: 50,
    };

    setAppraisalCycles([cycle, ...appraisalCycles]);
    setCreateCycleModal(false);
    setNewCycleTitle('');
    showNotification('New Appraisal Cycle initiated successfully!', 'success');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle) return;

    const goal: OKRGoal = {
      id: `g-${Date.now()}`,
      title: newGoalTitle,
      category: newGoalCategory,
      department: departmentFilter === 'All' ? 'Engineering' : departmentFilter,
      assignee: newGoalAssignee || 'Team Lead',
      assigneeEmail: 'assignee@company.com',
      progress: 10,
      targetMetric: newGoalTarget || '100%',
      currentValue: '10%',
      dueDate: '2026-12-31',
      status: 'On Track',
      weightage: 20,
    };

    setGoals([goal, ...goals]);
    setCreateGoalModal(false);
    setNewGoalTitle('');
    setNewGoalAssignee('');
    showNotification('New OKR Goal assigned successfully!', 'success');
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, departmentFilter]);

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      const matchesSearch =
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = departmentFilter === 'All' || g.department === departmentFilter;
      return matchesSearch && matchesDept;
    });
  }, [goals, searchTerm, departmentFilter]);

  // Overall Statistics
  const avgRating = (employees.reduce((acc, curr) => acc + curr.rating, 0) / (employees.length || 1)).toFixed(1);
  const avgOkr = Math.round(employees.reduce((acc, curr) => acc + curr.okrProgress, 0) / (employees.length || 1));
  const topPerformersCount = employees.filter((e) => e.status === 'Top Performer').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-white font-medium flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-zinc-800'
          }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm">{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Performance & Appraisal Management
            </h1>
            <Badge variant="brand" className="text-[11px] px-2.5 py-0.5">
              Q3 Review Open
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track company OKRs, conduct 360° appraisals, analyze 9-box talent matrix, and calibrate employee ratings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="All">All Departments</option>
              <option value="Executive Board">Executive Board</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="IT Operations">IT Operations</option>
            </select>
          </div>

          <Button
            onClick={() => setCreateGoalModal(true)}
            variant="outline"
            className="rounded-xl text-xs font-semibold"
          >
            <Target className="h-4 w-4 mr-1.5 text-[#94cb3d]" />
            New OKR Goal
          </Button>

          <Button
            onClick={() => setCreateCycleModal(true)}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-xl text-xs font-semibold shadow-md shadow-[#94cb3d]/20"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New Appraisal Cycle
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Average Rating</span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <Star className="h-5 w-5 fill-amber-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{avgRating}</span>
            <span className="text-xs text-zinc-400 font-medium">/ 5.0</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> +0.3 vs previous review
          </p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Review Completion</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">88%</span>
            <span className="text-xs text-zinc-400 font-medium">44/50 Done</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-500 h-full w-[88%]" />
          </div>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Top Performers</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{topPerformersCount}</span>
            <span className="text-xs text-zinc-400 font-medium">Star Performers</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">
            {Math.round((topPerformersCount / employees.length) * 100)}% of total workforce
          </p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Avg OKR Completion</span>
            <div className="p-2 bg-purple-500/10 text-purple-600 rounded-xl">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{avgOkr}%</span>
            <span className="text-xs text-zinc-400 font-medium">Active Goals</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#94cb3d] h-full" style={{ width: `${avgOkr}%` }} />
          </div>
        </Card>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'overview', label: 'Employee Overview & Ratings', icon: Users, count: filteredEmployees.length },
          { id: 'goals', label: 'OKR & Goal Tracker', icon: Target, count: filteredGoals.length },
          { id: 'appraisal', label: '360° Appraisals', icon: Award, count: appraisalCycles.length },
          { id: 'ninebox', label: '9-Box Talent Matrix', icon: Grid, count: employees.length },
          { id: 'reports', label: 'Analytics & Reports', icon: BarChart3, count: 0 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PerformanceTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                isActive
                  ? 'border-[#94cb3d] text-[#94cb3d]'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`px-2 py-0.5 text-[10px] rounded-full font-extrabold ${
                    isActive ? 'bg-[#94cb3d]/20 text-[#94cb3d]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR (For Overview, Goals, Appraisal) */}
      {(activeTab === 'overview' || activeTab === 'goals') && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder={activeTab === 'goals' ? 'Search OKRs & goals...' : 'Search employee name, ID, or email...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl text-xs font-medium"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Showing {activeTab === 'goals' ? filteredGoals.length : filteredEmployees.length} items</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & EMPLOYEE RATINGS TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <Card className="rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Employee Performance Calibration Directory
            </h3>
            <Badge variant="brand" className="text-[10px]">
              Active Cycle: Q3 2026
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Employee</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Department & Role</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Performance Rating</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">OKR Progress</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Review Stage</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#94cb3d] to-[#7ab52f] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{emp.name}</p>
                          <p className="text-[10px] text-zinc-400 font-mono">{emp.employeeId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{emp.department}</p>
                      <p className="text-[10px] text-zinc-500">{emp.designation}</p>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                        </div>
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">{emp.rating}</span>
                        <span className="text-[10px] text-zinc-400">/ 5.0</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span className="text-zinc-500">OKR Goal</span>
                          <span className="text-zinc-800 dark:text-zinc-200">{emp.okrProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              emp.okrProgress >= 80 ? 'bg-[#94cb3d]' : emp.okrProgress >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${emp.okrProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          emp.status === 'Top Performer'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : emp.status === 'On Track'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {emp.reviewStage}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedEmpProfile(emp)}
                        className="px-3 py-1.5 bg-[#94cb3d]/10 text-[#94cb3d] hover:bg-[#94cb3d] hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> Performance Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: OKR & GOAL TRACKER */}
      {/* ========================================================================= */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#94cb3d]" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Strategic OKR Goals & Key Results
                </h3>
                <p className="text-xs text-zinc-500">Track quarterly company, departmental, and personal objectives.</p>
              </div>
            </div>

            <Button
              onClick={() => setCreateGoalModal(true)}
              className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-xl text-xs font-semibold"
            >
              <Plus className="h-4 w-4 mr-1.5" /> Add Goal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGoals.map((goal) => (
              <Card key={goal.id} className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-4 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge variant={goal.category === 'Company' ? 'brand' : 'secondary'} className="text-[10px]">
                      {goal.category} OKR • {goal.department}
                    </Badge>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{goal.title}</h4>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      goal.status === 'On Track'
                        ? 'bg-emerald-500/15 text-emerald-600'
                        : goal.status === 'At Risk'
                        ? 'bg-amber-500/15 text-amber-600'
                        : 'bg-red-500/15 text-red-600'
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-2 text-xs border border-zinc-100 dark:border-zinc-800">
                  <div className="flex justify-between font-semibold">
                    <span className="text-zinc-500">Target Metric</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{goal.targetMetric}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-zinc-500">Current Progress</span>
                    <span className="text-[#94cb3d]">{goal.currentValue} ({goal.progress}%)</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#94cb3d] h-full" style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-zinc-400" /> {goal.assignee}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="h-3.5 w-3.5" /> Due: {goal.dueDate}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 360° APPRAISALS & FEEDBACK */}
      {/* ========================================================================= */}
      {activeTab === 'appraisal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  360° Appraisal Review Cycles
                </h3>
                <p className="text-xs text-zinc-500">Manage review deadlines, self-evaluations, and manager calibration.</p>
              </div>
            </div>

            <Button
              onClick={() => setCreateCycleModal(true)}
              className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-xl text-xs font-semibold"
            >
              <Plus className="h-4 w-4 mr-1.5" /> Initiate Review Cycle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appraisalCycles.map((cycle) => (
              <Card key={cycle.id} className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <Badge variant={cycle.status === 'Active' ? 'brand' : 'secondary'} className="text-[10px]">
                    {cycle.status} Cycle
                  </Badge>
                  <span className="text-xs font-mono text-zinc-400">{cycle.period}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{cycle.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{cycle.totalParticipants} Employees Enrolled</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-zinc-500">Overall Completion</span>
                    <span className="text-[#94cb3d]">{cycle.completionRate}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#94cb3d] h-full" style={{ width: `${cycle.completionRate}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="text-zinc-400">Ends: {cycle.endDate}</span>
                  <Button
                    onClick={() => showNotification(`Sending reminder alerts for ${cycle.title}...`, 'info')}
                    variant="outline"
                    className="text-xs px-3 py-1.5 rounded-lg"
                  >
                    Send Reminders <Send className="h-3 w-3 ml-1 text-[#94cb3d]" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 9-BOX TALENT MATRIX */}
      {/* ========================================================================= */}
      {activeTab === 'ninebox' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Grid className="h-5 w-5 text-purple-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  9-Box Performance vs Potential Matrix Grid
                </h3>
                <p className="text-xs text-zinc-500">Talent mapping matrix categorizing employees for leadership development.</p>
              </div>
            </div>
            <Badge variant="brand" className="text-[10px]">
              Grid Calibration 2026
            </Badge>
          </div>

          <Card className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="grid grid-cols-3 gap-3">
              {/* Row 1: High Potential */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-purple-600">
                  <span>Enigma (Low Perf / High Pot)</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <p className="text-[10px] text-zinc-500">Needs skill coaching</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-blue-600">
                  <span>High Potential</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">
                    PS
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Priya Sharma</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-extrabold text-emerald-600">
                  <span>⭐ Star Talent</span>
                  <Badge variant="brand">2</Badge>
                </div>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-100 shadow-xs">
                    Kishan K.
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-100 shadow-xs">
                    Sarah J.
                  </span>
                </div>
              </div>

              {/* Row 2: Medium Potential */}
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  <span>Dilemma</span>
                  <Badge variant="secondary">0</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-blue-600">
                  <span>Core Performer</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    AV
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Amit Verma</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-600">
                  <span>High Performer</span>
                  <Badge variant="secondary">0</Badge>
                </div>
              </div>

              {/* Row 3: Low Potential */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-red-600">
                  <span>Underperformer</span>
                  <Badge variant="destructive">1</Badge>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center">
                    VM
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Vikram M.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  <span>Effective Contributor</span>
                  <Badge variant="secondary">0</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-2 min-h-[110px]">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  <span>Solid Professional</span>
                  <Badge variant="secondary">0</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: REPORTS & ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Performance & Competency Analytics
                </h3>
                <p className="text-xs text-zinc-500">Departmental rating distribution and skill development reports.</p>
              </div>
            </div>

            <Button
              onClick={() => showNotification('Performance Analytics report exported to PDF', 'success')}
              className="bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-semibold rounded-xl"
            >
              Export PDF Report <Download className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Rating Distribution (5-Star Scale)</h4>
              <div className="space-y-3">
                {[
                  { star: '5 Stars (Outstanding)', pct: 40, count: 2, color: 'bg-emerald-500' },
                  { star: '4 Stars (Exceeds)', pct: 40, count: 2, color: 'bg-[#94cb3d]' },
                  { star: '3 Stars (Meets)', pct: 20, count: 1, color: 'bg-blue-500' },
                  { star: '2 Stars (Below)', pct: 0, count: 0, color: 'bg-amber-500' },
                  { star: '1 Star (Unsatisfactory)', pct: 0, count: 0, color: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.star} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span>{item.star}</span>
                      <span>{item.count} staff ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Departmental Score Benchmarks</h4>
              <div className="space-y-3 text-xs">
                {[
                  { dept: 'Executive Board', score: '4.9 / 5.0', pct: 98 },
                  { dept: 'Human Resources', score: '4.6 / 5.0', pct: 92 },
                  { dept: 'Engineering', score: '4.4 / 5.0', pct: 88 },
                  { dept: 'Finance', score: '4.1 / 5.0', pct: 82 },
                  { dept: 'IT Operations', score: '3.2 / 5.0', pct: 64 },
                ].map((d) => (
                  <div key={d.dept} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>{d.dept}</span>
                      <span className="text-[#94cb3d]">{d.score}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="bg-[#94cb3d] h-full" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Employee Profile Modal */}
      {selectedEmpProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#94cb3d] to-[#7ab52f] text-white font-bold text-sm flex items-center justify-center">
                  {selectedEmpProfile.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{selectedEmpProfile.name}</h3>
                  <p className="text-xs text-zinc-500">{selectedEmpProfile.designation} • {selectedEmpProfile.department}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEmpProfile(null)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Self Rating</span>
                <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{selectedEmpProfile.selfScore} / 5.0</span>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Manager Rating</span>
                <span className="font-bold text-sm text-[#94cb3d]">{selectedEmpProfile.managerScore} / 5.0</span>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Peer Rating</span>
                <span className="font-bold text-sm text-blue-500">{selectedEmpProfile.peerScore} / 5.0</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                <span className="text-zinc-500">OKR Progress:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{selectedEmpProfile.okrProgress}% Completed</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                <span className="text-zinc-500">Talent Box Classification:</span>
                <span className="font-bold text-purple-600">{selectedEmpProfile.potentialScore} Potential / {selectedEmpProfile.performanceScore} Performance</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button size="sm" variant="outline" onClick={() => setSelectedEmpProfile(null)}>
                Close
              </Button>
              <Button size="sm" className="bg-[#94cb3d] text-white" onClick={() => {
                showNotification(`Performance record updated for ${selectedEmpProfile.name}`, 'success');
                setSelectedEmpProfile(null);
              }}>
                Save Calibration
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Cycle Modal */}
      {createCycleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Initiate New Appraisal Cycle</h3>
              <button onClick={() => setCreateCycleModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCycle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Cycle Title *</label>
                <Input
                  required
                  placeholder="e.g. Q4 2026 Annual Appraisal"
                  value={newCycleTitle}
                  onChange={(e) => setNewCycleTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Review Period *</label>
                <input
                  type="text"
                  value={newCyclePeriod}
                  onChange={(e) => setNewCyclePeriod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Deadline Date</label>
                <input
                  type="date"
                  value={newCycleDueDate}
                  onChange={(e) => setNewCycleDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateCycleModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Initiate Cycle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {createGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Add Strategic OKR Goal</h3>
              <button onClick={() => setCreateGoalModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Goal Objective Title *</label>
                <Input
                  required
                  placeholder="e.g. Increase product deployment speed by 30%"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">OKR Category</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="Company">Company OKR</option>
                  <option value="Department">Department Goal</option>
                  <option value="Individual">Individual Objective</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Assignee Name</label>
                <Input
                  placeholder="e.g. Priya Sharma"
                  value={newGoalAssignee}
                  onChange={(e) => setNewGoalAssignee(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Target Key Result Metric</label>
                <Input
                  placeholder="e.g. 100% Migration or < 24 Hours"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateGoalModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Assign OKR
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
