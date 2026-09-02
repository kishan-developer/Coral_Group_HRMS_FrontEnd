'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, User, Mail, Phone, Building2, Calendar, Shield } from 'lucide-react';

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  company: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  joiningDate: string;
}

export default function EmployeeDetailView() {
  const params = useParams();
  const router = useRouter();
  const { id, userId } = params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${BACKEND_URL}/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setEmployee(data.data);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'terminated':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading employee details...
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500 dark:text-zinc-400">
          Employee not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">{employee.employeeId}</p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/dashboard/superadmin/${userId}/employees/${id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Full Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {employee.firstName} {employee.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Email</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Phone</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Work Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Employee ID</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.employeeId}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.department}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Designation</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.designation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Company</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{employee.company}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Joining Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Status</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                  {employee.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
