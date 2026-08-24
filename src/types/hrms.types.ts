import { UserRole } from './auth.types';

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  joiningDate: string;
  departmentId?: string;
  departmentName?: string;
  roleId?: string;
  status: 'Active' | 'Inactive' | 'On Leave' | 'Probation';
  workType: 'Office' | 'Remote' | 'On Field';
  photoUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  managerId?: string;
  employeeCount?: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'On Leave';
  workHours?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'Casual' | 'Sick' | 'Earned' | 'Maternity' | 'Paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface StatCardItem {
  title: string;
  value: string | number;
  icon?: any;
  trend?: string;
  color?: string;
}
