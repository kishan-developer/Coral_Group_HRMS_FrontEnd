'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';
import { superadminNavigation, hrManagerNavigation, accountsNavigation, supportNavigation, employeeNavigation, type NavItem } from '@/components/layout/Sidebar/sidebar.config';

interface User {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  employeeDetails?: {
    firstName?: string;
    lastName?: string;
    department?: string;
  };
}

interface Page {
  _id: string;
  pageName: string;
  route: string;
  category?: string;
}

// Extract all pages from navigation
const getAllPagesFromNavigation = (navItems: NavItem[]): Page[] => {
  const pages: Page[] = [];
  
  const extractPages = (items: NavItem[]) => {
    items.forEach(item => {
      if (item.children) {
        extractPages(item.children);
      } else {
        pages.push({
          _id: item.href.replace(/:userId/g, ''),
          pageName: item.name,
          route: item.href.replace(/:userId/g, ''),
          category: item.name,
        });
      }
    });
  };
  
  extractPages(navItems);
  return pages;
};

// Group pages by role
const pagesByRole = {
  superadmin: getAllPagesFromNavigation(superadminNavigation),
  hr_manager: getAllPagesFromNavigation(hrManagerNavigation),
  accounts: getAllPagesFromNavigation(accountsNavigation),
  support: getAllPagesFromNavigation(supportNavigation),
  employee: getAllPagesFromNavigation(employeeNavigation),
};

export default function ManageRolePagesActions() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const targetUserId = params.targetUserId as string;
  const BACKEND_URL = API_BASE_URL.replace('/api', '');

  const [activeTab, setActiveTab] = useState<'pages' | 'actions' | 'api' | 'special'>('pages');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${BACKEND_URL}/api/v1/users/${targetUserId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const userData = await response.json();
        if (userData.success) setUser(userData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_URL, targetUserId]);

  const handleSave = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/access-control/user-permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: targetUserId,
          grantedPageIds: Array.from(selectedPages),
          revokedPageIds: [],
          grantedPermissionIds: [],
          revokedPermissionIds: [],
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Permissions saved successfully');
        router.back();
      } else {
        alert('Failed to save permissions');
      }
    } catch (error) {
      console.error('Error saving permissions:', error);
      alert('Failed to save permissions');
    }
  };

  const handleReset = async () => {
    // TODO: Implement reset to role defaults
    alert('Reset to role defaults');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-zinc-500 dark:text-zinc-400">Loading permissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-[#94cb3d] hover:text-[#7ab52f] mb-4 inline-flex items-center gap-2"
        >
          ← Back to Access Control
        </button>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Manage Role Pages & Actions
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manage pages, actions, and permissions for {user?.employeeDetails?.firstName && user?.employeeDetails?.lastName
            ? `${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`
            : 'this user'}
        </p>
      </div>

      {/* User Info */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-zinc-600 dark:text-zinc-400">Name:</span>
            <span className="ml-2 text-zinc-900 dark:text-zinc-50 font-medium">
              {user?.employeeDetails?.firstName && user?.employeeDetails?.lastName
                ? `${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`
                : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600 dark:text-zinc-400">Role:</span>
            <span className="ml-2 text-zinc-900 dark:text-zinc-50 font-medium">{user?.role}</span>
          </div>
          <div>
            <span className="text-zinc-600 dark:text-zinc-400">Department:</span>
            <span className="ml-2 text-zinc-900 dark:text-zinc-50 font-medium">
              {user?.employeeDetails?.department || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600 dark:text-zinc-400">Email:</span>
            <span className="ml-2 text-zinc-900 dark:text-zinc-50 font-medium">{user?.email}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="border-b border-zinc-200 dark:border-zinc-700">
          <nav className="flex gap-4 px-6">
            {[
              { id: 'pages' as const, label: 'Pages' },
              { id: 'actions' as const, label: 'Actions' },
              { id: 'api' as const, label: 'API Access' },
              { id: 'special' as const, label: 'Special Permissions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#94cb3d] text-[#94cb3d]'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'pages' && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Page Access</h3>
              <div className="space-y-6">
                {Object.entries(pagesByRole).map(([role, pages]) => (
                  <div key={role}>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3 capitalize">
                      {role.replace('_', ' ')}
                    </h4>
                    <div className="space-y-2 pl-4">
                      {pages.map((page) => (
                        <label key={page._id} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedPages.has(page._id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedPages);
                              if (e.target.checked) {
                                newSelected.add(page._id);
                              } else {
                                newSelected.delete(page._id);
                              }
                              setSelectedPages(newSelected);
                            }}
                            className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                          />
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-zinc-50">{page.pageName}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.route}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Actions Access</h3>
              <div className="space-y-4">
                {['Employees', 'Attendance', 'Payroll', 'Reports'].map((module) => (
                  <div key={module} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-3">{module}</h4>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      {['View', 'Create', 'Edit', 'Delete', 'Export'].map((action) => (
                        <label key={action} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                          />
                          <span className="text-zinc-700 dark:text-zinc-300">{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">API Access</h3>
              <div className="space-y-2">
                {['GET /employees', 'POST /employees', 'PUT /employees/:id', 'DELETE /employees/:id'].map((api) => (
                  <label key={api} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]" />
                    <code className="text-sm text-zinc-900 dark:text-zinc-50">{api}</code>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'special' && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Special Permissions</h3>
              <div className="space-y-2">
                {['Approve Leave', 'Approve Payroll', 'Export Reports', 'Change Settings', 'Delete Users', 'Assign Roles'].map((perm) => (
                  <label key={perm} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]" />
                    <span className="text-sm text-zinc-900 dark:text-zinc-50">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 p-6 flex gap-3 justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            Reset to Role Default
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
