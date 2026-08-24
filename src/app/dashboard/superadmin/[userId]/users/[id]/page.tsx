'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit3, User as UserIcon, Mail, Shield, Building, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default function UserView() {
  const params = useParams();
  const router = useRouter();
  const adminUserId = params.userId as string;
  const userId = params.id as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-sm font-medium">Loading employee details...</p>
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

  const fullName = user.employeeDetails?.firstName && user.employeeDetails?.lastName
    ? `${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`
    : user.email.split('@')[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/superadmin/${adminUserId}/users`}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#94cb3d] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Employee Directory</span>
        </Link>
      </div>

      {/* User Header Profile Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 flex items-center justify-center text-[#94cb3d] text-lg font-medium shrink-0">
            {fullName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
                {fullName}
              </h1>
              <Badge variant={user.isActive ? 'success' : 'destructive'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <Badge variant="brand" className="capitalize">
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => router.push(`/dashboard/superadmin/${adminUserId}/users/${userId}/edit`)}
          className="shrink-0 shadow-md shadow-[#94cb3d]/20 rounded-lg"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit User Account</span>
        </Button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserIcon className="h-4 w-4 text-[#94cb3d]" />
              Account & Profile Information
            </CardTitle>
            <CardDescription>Primary identity parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">User ID</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 font-mono">{user._id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">Employee ID</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{user.employeeId || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">Assigned Role</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 capitalize">{user.role.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs font-medium text-zinc-500">Last Login Date</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building className="h-4 w-4 text-[#94cb3d]" />
              Organizational Details
            </CardTitle>
            <CardDescription>Company and department assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">Company Name</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{user.employeeDetails?.company || 'Coral Group'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">Department</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{user.employeeDetails?.department || 'General'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">Account Created</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {new Date(user.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs font-medium text-zinc-500">Last Modified</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {new Date(user.updatedAt).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
