'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AVAILABLE_PERMISSIONS = [
  { category: 'Users', permissions: ['create_user', 'read_user', 'update_user', 'delete_user', 'manage_user_roles'] },
  { category: 'Employees', permissions: ['create_employee', 'read_employee', 'update_employee', 'delete_employee'] },
  { category: 'Companies', permissions: ['create_company', 'read_company', 'update_company', 'delete_company'] },
  { category: 'Roles', permissions: ['create_role', 'read_role', 'update_role', 'delete_role', 'assign_permissions'] },
  { category: 'Attendance', permissions: ['view_attendance', 'manage_attendance', 'approve_attendance'] },
  { category: 'Leave', permissions: ['request_leave', 'view_leave', 'approve_leave', 'manage_leave'] },
  { category: 'Payroll', permissions: ['view_payroll', 'manage_payroll', 'approve_payroll'] },
  { category: 'Reports', permissions: ['view_reports', 'export_reports', 'manage_reports'] },
  { category: 'Settings', permissions: ['view_settings', 'manage_settings'] },
  { category: 'Audit', permissions: ['view_audit_logs'] },
];

export default function CreateRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleCategoryToggle = (permissions: string[]) => {
    const allSelected = permissions.every((p) => selectedPermissions.includes(p));
    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !permissions.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...permissions])]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/super-admin/roles');
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/super-admin/roles"
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Roles
        </Link>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Create New Role
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Define a new role with specific permissions
        </p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Role Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                placeholder="e.g., HR Manager"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Role Code *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                placeholder="e.g., hr_manager"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                placeholder="Describe the role's purpose"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Permissions
            </h2>
            <div className="space-y-4">
              {AVAILABLE_PERMISSIONS.map((category) => (
                <div
                  key={category.category}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                      {category.category}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(category.permissions)}
                      className="text-sm text-[#94cb3d] hover:text-[#7ab52f]"
                    >
                      {category.permissions.every((p) => selectedPermissions.includes(p))
                        ? 'Deselect All'
                        : 'Select All'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {category.permissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center gap-2 p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          {permission.replace(/_/g, ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {selectedPermissions.length} permissions selected
            </span>
            <div className="flex gap-4">
              <Link
                href="/dashboard/super-admin/roles"
                className="px-6 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || selectedPermissions.length === 0}
                className="px-6 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Role'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
