'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  Plus,
  Users,
  Search,
  Check,
  X,
  Lock,
  Edit2,
  Trash2,
  Eye,
  FileCheck,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface SystemRole {
  id: string;
  name: string;
  code: string;
  description: string;
  userCount: number;
  isSystem: boolean;
  permissions: {
    module: string;
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    canExport: boolean;
  }[];
}

export default function RolesManagementPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix'>('cards');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SystemRole | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleCode, setNewRoleCode] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');

  const initialModules = [
    'Employees Directory',
    'Leave Management',
    'Attendance & Shifts',
    'Indian Payroll & Taxes',
    'Approvals Command Center',
    'Asset Inventory',
    'Company Settings',
    'Workforce Analytics & Reports',
  ];

  const [roles, setRoles] = useState<SystemRole[]>([
    {
      id: 'role-1',
      name: 'Super Admin',
      code: 'superadmin',
      description: 'Full un-restricted system access across all 36 HRMS modules & company settings.',
      userCount: 2,
      isSystem: true,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: true,
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canApprove: true,
        canExport: true,
      })),
    },
    {
      id: 'role-2',
      name: 'HR Manager',
      code: 'hr_manager',
      description: 'Full employee lifecycle management, attendance, leave approvals, and onboarding.',
      userCount: 8,
      isSystem: false,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: true,
        canCreate: true,
        canEdit: true,
        canDelete: m !== 'Company Settings',
        canApprove: true,
        canExport: true,
      })),
    },
    {
      id: 'role-3',
      name: 'Accounts & Payroll Officer',
      code: 'accounts',
      description: 'Access to salary structures, monthly payroll runs, LWP calculations, and tax reports.',
      userCount: 4,
      isSystem: false,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: m.includes('Payroll') || m.includes('Reports') || m.includes('Approvals'),
        canCreate: m.includes('Payroll'),
        canEdit: m.includes('Payroll'),
        canDelete: false,
        canApprove: m.includes('Payroll') || m.includes('Expenses'),
        canExport: true,
      })),
    },
    {
      id: 'role-4',
      name: 'Employee Self-Service',
      code: 'employee',
      description: 'Standard employee portal access for check-in/out, leave requests, and payslip downloads.',
      userCount: 142,
      isSystem: true,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: m.includes('Leave') || m.includes('Attendance') || m.includes('Payroll'),
        canCreate: m.includes('Leave'),
        canEdit: false,
        canDelete: false,
        canApprove: false,
        canExport: false,
      })),
    },
    {
      id: 'role-5',
      name: 'Recruitment & Talent Specialist',
      code: 'recruitment_lead',
      description: 'Custom role for applicant tracking, interviews, job postings, and offer letter generation.',
      userCount: 3,
      isSystem: false,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: m.includes('Employees') || m.includes('Reports'),
        canCreate: m.includes('Employees'),
        canEdit: m.includes('Employees'),
        canDelete: false,
        canApprove: false,
        canExport: true,
      })),
    },
  ]);

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName || !newRoleCode) return;

    const newRole: SystemRole = {
      id: `role-${Date.now()}`,
      name: newRoleName,
      code: newRoleCode.toLowerCase().replace(/\s+/g, '_'),
      description: newRoleDesc || 'Custom enterprise access role.',
      userCount: 0,
      isSystem: false,
      permissions: initialModules.map((m) => ({
        module: m,
        canView: true,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canApprove: false,
        canExport: false,
      })),
    };

    setRoles([...roles, newRole]);
    setCreateModalOpen(false);
    setNewRoleName('');
    setNewRoleCode('');
    setNewRoleDesc('');
    showToast('Custom Role created successfully!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const togglePermission = (roleId: string, moduleName: string, field: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canApprove' | 'canExport') => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== roleId) return role;
        if (role.isSystem && role.code === 'superadmin') return role; // Prevent locking superadmin

        const updatedPermissions = role.permissions.map((p) => {
          if (p.module !== moduleName) return p;
          return { ...p, [field]: !p[field] };
        });

        return { ...role, permissions: updatedPermissions };
      })
    );
    showToast('Permission matrix updated!', 'success');
  };

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              Roles & Granular Permissions Command Center
            </h1>
            <Badge variant="brand">{roles.length} System & Custom Roles</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Configure system roles, custom enterprise designations, and granular View/Create/Edit/Delete/Approve rights per module.
          </p>
        </div>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Custom Role
        </Button>
      </div>

      {/* View Switcher & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search role name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'cards'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Role Cards View
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'matrix'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Permission Matrix Grid
          </button>
        </div>
      </div>

      {/* Role Cards View */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="rounded-xl hover:shadow-md transition-all border-zinc-200/80 dark:border-zinc-800">
              <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-[#94cb3d]/15 border border-[#94cb3d]/30 text-[#94cb3d] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {role.name}
                      </CardTitle>
                      <span className="text-[10px] font-mono text-zinc-500">code: {role.code}</span>
                    </div>
                  </div>

                  {role.isSystem ? (
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                      System Locked
                    </Badge>
                  ) : (
                    <Badge variant="brand" className="text-[10px] uppercase font-bold">
                      Custom Role
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-3 space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {role.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Users className="h-3.5 w-3.5 text-[#94cb3d]" />
                    <strong className="text-zinc-900 dark:text-zinc-100">{role.userCount}</strong> Assigned Users
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRole(role);
                      setEditRoleModalOpen(true);
                    }}
                    className="h-8 rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800"
                  >
                    <Sliders className="h-3.5 w-3.5 mr-1 text-[#94cb3d]" />
                    Edit Rights
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Permission Matrix Grid View */}
      {activeTab === 'matrix' && (
        <Card className="rounded-xl border-zinc-200/80 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase">HRMS Module</th>
                    {filteredRoles.map((r) => (
                      <th key={r.id} className="px-4 py-3.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 uppercase text-center">
                        {r.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {initialModules.map((moduleName) => (
                    <tr key={moduleName} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-950/40 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {moduleName}
                      </td>
                      {filteredRoles.map((role) => {
                        const perm = role.permissions.find((p) => p.module === moduleName);
                        return (
                          <td key={role.id} className="px-4 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => togglePermission(role.id, moduleName, 'canView')}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  perm?.canView ? 'bg-emerald-500/15 text-emerald-600' : 'bg-zinc-100 text-zinc-400'
                                }`}
                                title="View Right"
                              >
                                View
                              </button>
                              <button
                                onClick={() => togglePermission(role.id, moduleName, 'canCreate')}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  perm?.canCreate ? 'bg-blue-500/15 text-blue-600' : 'bg-zinc-100 text-zinc-400'
                                }`}
                                title="Create Right"
                              >
                                Create
                              </button>
                              <button
                                onClick={() => togglePermission(role.id, moduleName, 'canEdit')}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  perm?.canEdit ? 'bg-amber-500/15 text-amber-600' : 'bg-zinc-100 text-zinc-400'
                                }`}
                                title="Edit Right"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Custom Role Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Create New Custom Role</h2>
              <button onClick={() => setCreateModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Role Title Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Regional HR Manager, Payroll Officer"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  System Code Identifier *
                </label>
                <Input
                  required
                  placeholder="e.g. regional_hr_lead"
                  value={newRoleCode}
                  onChange={(e) => setNewRoleCode(e.target.value)}
                  className="rounded-lg text-xs font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Role Description & Scope
                </label>
                <Input
                  placeholder="Operational scope for this custom role..."
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  className="rounded-lg text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white hover:bg-[#82b632]">
                  Create Role
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Granular Rights Modal */}
      {editRoleModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Edit Rights: {selectedRole.name} ({selectedRole.code})
                </h2>
                <p className="text-[11px] text-zinc-500">Configure View, Create, Edit, Delete, Approve, Export permissions per module.</p>
              </div>
              <button onClick={() => setEditRoleModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedRole.permissions.map((p) => (
                <div key={p.module} className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{p.module}</span>
                  <div className="flex items-center gap-1.5">
                    {(['canView', 'canCreate', 'canEdit', 'canDelete', 'canApprove', 'canExport'] as const).map((field) => {
                      const labels = {
                        canView: 'View',
                        canCreate: 'Create',
                        canEdit: 'Edit',
                        canDelete: 'Delete',
                        canApprove: 'Approve',
                        canExport: 'Export',
                      };
                      return (
                        <button
                          key={field}
                          onClick={() => togglePermission(selectedRole.id, p.module, field)}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                            p[field]
                              ? 'bg-[#94cb3d] text-white shadow-xs'
                              : 'bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          {labels[field]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Button size="sm" className="bg-[#94cb3d] text-white" onClick={() => setEditRoleModalOpen(false)}>
                Done & Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
