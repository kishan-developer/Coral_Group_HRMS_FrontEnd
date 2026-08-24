'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

interface Role {
  _id: string;
  name: string;
  code: string;
  userCount: number;
}

interface User {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  employeeDetails?: {
    firstName?: string;
    lastName?: string;
    employeeId?: string;
    department?: string;
  };
}

interface Page {
  _id: string;
  pageName: string;
  route: string;
  category?: string;
}

interface Permission {
  _id: string;
  module: string;
  action: string;
  category: 'page' | 'action' | 'api' | 'special';
}

interface RolePermission {
  roleId: string;
  pageIds: string[];
  permissionIds: string[];
}

interface UserPermissionOverride {
  userId: string;
  grantedPermissionIds: string[];
  revokedPermissionIds: string[];
}

export default function AccessControlPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const BACKEND_URL = API_BASE_URL.replace('/api', '');

  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles with counts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${BACKEND_URL}/api/v1/access-control/ui/roles-with-counts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setRoles(data.data);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [BACKEND_URL]);

  // Fetch users when role is selected
  useEffect(() => {
    if (selectedRole) {
      const fetchUsers = async () => {
        try {
          const token = getToken();
          const response = await fetch(`${BACKEND_URL}/api/v1/access-control/ui/users-by-role/${selectedRole.code}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setUsers(data.data);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [selectedRole, BACKEND_URL]);

  const handleManagePermissions = (user: User) => {
  router.push(`/dashboard/superadmin/${userId}/manage-role-pages-actions/${user._id}`);
};

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
            Loading access control...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Access Control
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manage user permissions and access levels
        </p>
      </div>

      {/* Role Buttons Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Select Role
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <button
              key={role._id}
              onClick={() => setSelectedRole(role)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedRole?._id === role._id
                  ? 'border-[#94cb3d] bg-[#94cb3d]/10'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {role.name}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  ({role.userCount} users)
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User List Section */}
      {selectedRole && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {selectedRole.name} Users
            </h2>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Users: {users.length}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50 font-mono">
                      {user.employeeDetails?.employeeId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50">
                      {user.employeeDetails?.firstName && user.employeeDetails?.lastName
                        ? `${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      {user.employeeDetails?.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleManagePermissions(user)}
                        className="text-[#94cb3d] hover:text-[#7ab52f]"
                      >
                        Manage Permissions
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                      No users found for this role
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
