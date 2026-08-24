'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { getToken } from '@/lib/auth';

interface User {
  _id: string;
  email: string;
  employeeId?: string;
  role: 'superadmin' | 'hr_manager' | 'accounts' | 'employee' | 'support';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  employeeDetails?: {
    firstName?: string;
    lastName?: string;
    department?: string;
    company?: string;
  };
}

export default function UserEdit() {
  const params = useParams();
  const router = useRouter();
  const adminUserId = params.userId as string;
  const userId = params.id as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    employeeId: '',
    role: 'employee' as User['role'],
    isActive: true,
    firstName: '',
    lastName: '',
    company: '',
    department: '',
    avatar: '👨‍💼',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.success) {
          setUser(data.data);
          setFormData({
            email: data.data.email,
            employeeId: data.data.employeeId || '',
            role: data.data.role,
            isActive: data.data.isActive,
            firstName: data.data.employeeDetails?.firstName || '',
            lastName: data.data.employeeDetails?.lastName || '',
            company: data.data.employeeDetails?.company || '',
            department: data.data.employeeDetails?.department || '',
            avatar: data.data.avatar || '👨‍💼',
          });
        } else {
          console.error('Failed to fetch user:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, BACKEND_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      const response = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          employeeId: formData.employeeId,
          role: formData.role,
          isActive: formData.isActive,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/dashboard/superadmin/${adminUserId}/users/${userId}`);
      } else {
        console.error('Failed to update user:', data.message);
        alert(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-sm font-medium">Loading edit form...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 font-sans">
        <Card className="max-w-md mx-auto text-center p-8 rounded-lg">
          <p className="text-sm font-medium text-zinc-500 mb-4">Employee record not found</p>
          <Button variant="primary" onClick={() => router.push(`/dashboard/superadmin/${adminUserId}/users`)}>
            Back to Employee Directory
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      {/* Back Link Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/superadmin/${adminUserId}/users/${userId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#94cb3d] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Employee Details</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Edit Employee Information</CardTitle>
              <Badge variant="brand">Dedicated Edit Page</Badge>
            </div>
            <CardDescription>
              Update employee details, role assignments, and active account status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AvatarPicker
              selectedAvatar={formData.avatar}
              onSelectAvatar={(emoji) => setFormData({ ...formData, avatar: emoji })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Employee ID
                </label>
                <Input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="e.g. EMP-1002"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  First Name
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Last Name
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Company
                </label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Department
                </label>
                <Input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Assigned System Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                  className="flex h-11 w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-[#94cb3d] focus:ring-2 focus:ring-[#94cb3d]/30"
                >
                  <option value="superadmin">Super Admin</option>
                  <option value="hr_manager">HR Manager</option>
                  <option value="accounts">Accounts</option>
                  <option value="employee">Employee</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Account Status
                </label>
                <select
                  value={formData.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                  className="flex h-11 w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-[#94cb3d] focus:ring-2 focus:ring-[#94cb3d]/30"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/superadmin/${adminUserId}/users/${userId}`)}
              className="rounded-lg"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
              className="rounded-lg shadow-md shadow-[#94cb3d]/20"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
