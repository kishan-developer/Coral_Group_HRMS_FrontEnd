'use client';

import { X, Mail, Phone, MapPin, Calendar, Briefcase, Building, User, Clock, FileText } from 'lucide-react';

interface Employee {
  id: string;
  photo?: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  phone: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'probation' | 'on-leave' | 'terminated';
  dateOfJoining: string;
  address?: string;
  reportingManager?: string;
  attendanceSummary?: {
    present: number;
    absent: number;
    late: number;
    totalDays: number;
  };
  leaveBalance?: {
    casual: number;
    sick: number;
    earned: number;
  };
}

interface EmployeeProfileModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeProfileModal({ employee, isOpen, onClose }: EmployeeProfileModalProps) {
  if (!isOpen || !employee) return null;

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      probation: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'on-leave': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      terminated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
      <div className="h-full w-full max-w-lg bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Employee Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-4">
            {employee.photo ? (
              <img
                src={employee.photo}
                alt={employee.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-2xl font-medium text-zinc-600 dark:text-zinc-400">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{employee.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{employee.designation}</p>
              <div className="mt-2">{getStatusBadge(employee.status)}</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Employee ID</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{employee.employeeId}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Date of Joining</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{employee.dateOfJoining}</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-400" />
                <span className="text-zinc-900 dark:text-zinc-100">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-zinc-400" />
                <span className="text-zinc-900 dark:text-zinc-100">{employee.phone}</span>
              </div>
              {employee.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-zinc-400 mt-0.5" />
                  <span className="text-zinc-900 dark:text-zinc-100">{employee.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Employment Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Employment Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Department</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{employee.department}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Role</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{employee.role}</p>
              </div>
              {employee.reportingManager && (
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400">Reporting Manager</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{employee.reportingManager}</p>
                </div>
              )}
            </div>
          </div>

          {/* Attendance Summary */}
          {employee.attendanceSummary && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Attendance Summary (Last 30 Days)
              </h4>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#94cb3d]">{employee.attendanceSummary.present}</p>
                  <p className="text-xs text-zinc-500">Present</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-500">{employee.attendanceSummary.absent}</p>
                  <p className="text-xs text-zinc-500">Absent</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-500">{employee.attendanceSummary.late}</p>
                  <p className="text-xs text-zinc-500">Late</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-zinc-600 dark:text-zinc-400">{employee.attendanceSummary.totalDays}</p>
                  <p className="text-xs text-zinc-500">Total</p>
                </div>
              </div>
            </div>
          )}

          {/* Leave Balance */}
          {employee.leaveBalance && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Leave Balance
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{employee.leaveBalance.casual}</p>
                  <p className="text-xs text-zinc-500">Casual</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{employee.leaveBalance.sick}</p>
                  <p className="text-xs text-zinc-500">Sick</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{employee.leaveBalance.earned}</p>
                  <p className="text-xs text-zinc-500">Earned</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
