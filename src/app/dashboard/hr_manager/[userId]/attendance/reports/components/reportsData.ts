export type ReportStatus = 'Present' | 'Absent' | 'Leave' | 'Late' | 'Early Out';
export type RegStatus = 'None' | 'Pending' | 'Approved' | 'Rejected';
export type LeaveType = 'Sick' | 'Casual' | 'Earned' | 'Unpaid';
export type LeaveStatus = 'Approved' | 'Pending' | 'Rejected';
export type Role = 'admin' | 'hr' | 'manager';

export interface ReportRow {
  id: string;
  empId: string;
  name: string;
  department: string;
  shift: string;
  date: string; // YYYY-MM-DD
  inTime: string | null;
  outTime: string | null;
  totalHours: number; // decimal
  status: ReportStatus;
  lateMinutes: number;
  earlyOutMinutes: number;
  overtimeHours: number;
  regularization: RegStatus;
}

export interface LeaveRecord {
  id: string;
  empId: string;
  name: string;
  department: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
}

export interface RegularizationRecord {
  id: string;
  empId: string;
  name: string;
  department: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const DEPARTMENTS = ['All Departments', 'Real Estate', 'Hotels', 'Saree Manufacturing', 'Corporate HO'];
export const SHIFTS = ['All Shifts', 'General', 'Morning', 'Evening', 'Night'];
export const STATUSES: Array<ReportStatus | 'All'> = ['All', 'Present', 'Absent', 'Leave', 'Late', 'Early Out'];

const EMPLOYEES_LIST = [
  { id: 'EMP001', name: 'Rahul Sharma', department: 'Real Estate', shift: 'General' },
  { id: 'EMP002', name: 'Priya Patel', department: 'Hotels', shift: 'General' },
  { id: 'EMP003', name: 'Sneha Gupta', department: 'Corporate HO', shift: 'General' },
  { id: 'EMP004', name: 'Vikram Rao', department: 'Real Estate', shift: 'Morning' },
  { id: 'EMP005', name: 'Amit Kumar', department: 'Saree Manufacturing', shift: 'General' },
  { id: 'EMP006', name: 'Neha Desai', department: 'Hotels', shift: 'General' },
  { id: 'EMP007', name: 'Rajesh Mehta', department: 'Saree Manufacturing', shift: 'Evening' },
  { id: 'EMP008', name: 'Anita Joshi', department: 'Corporate HO', shift: 'General' },
  { id: 'EMP009', name: 'Karan Singh', department: 'Hotels', shift: 'Night' },
  { id: 'EMP010', name: 'Pooja Iyer', department: 'Corporate HO', shift: 'General' },
];

export const EMPLOYEE_NAMES = ['All Employees', ...EMPLOYEES_LIST.map((e) => e.name)];

// Generate 14 days of data ending today
const generateRows = (): ReportRow[] => {
  const rows: ReportRow[] = [];
  const today = new Date();
  let id = 1;
  for (let d = 13; d >= 0; d--) {
    const dt = new Date(today);
    dt.setDate(today.getDate() - d);
    const iso = dt.toISOString().slice(0, 10);
    const isSunday = dt.getDay() === 0;
    EMPLOYEES_LIST.forEach((e, idx) => {
      const seed = (d * 7 + idx) % 11;
      let status: ReportStatus = 'Present';
      let inTime: string | null = '09:00';
      let outTime: string | null = '18:00';
      let total = 8;
      let late = 0;
      let early = 0;
      let ot = 0;
      let reg: RegStatus = 'None';

      if (isSunday) {
        status = 'Absent'; inTime = null; outTime = null; total = 0;
      } else if (seed === 0) {
        status = 'Absent'; inTime = null; outTime = null; total = 0;
      } else if (seed === 1) {
        status = 'Leave'; inTime = null; outTime = null; total = 0;
      } else if (seed === 2) {
        status = 'Late'; inTime = '09:22'; outTime = '18:05'; total = 7.7; late = 22;
      } else if (seed === 3) {
        status = 'Early Out'; inTime = '08:55'; outTime = '16:30'; total = 6.6; early = 90;
      } else if (seed === 4) {
        status = 'Present'; inTime = '08:50'; outTime = '19:45'; total = 9.9; ot = 1.75;
      } else if (seed === 5) {
        status = 'Present'; inTime = '09:00'; outTime = '20:30'; total = 10.5; ot = 2.5;
        reg = 'Pending';
      } else if (seed === 6) {
        status = 'Late'; inTime = '09:35'; outTime = '18:30'; total = 7.9; late = 35;
        reg = idx % 2 === 0 ? 'Approved' : 'Rejected';
      }

      rows.push({
        id: `r-${id++}`,
        empId: e.id,
        name: e.name,
        department: e.department,
        shift: e.shift,
        date: iso,
        inTime,
        outTime,
        totalHours: total,
        status,
        lateMinutes: late,
        earlyOutMinutes: early,
        overtimeHours: ot,
        regularization: reg,
      });
    });
  }
  return rows;
};

export const REPORT_ROWS: ReportRow[] = generateRows();

export const LEAVE_ROWS: LeaveRecord[] = [
  { id: 'lv-1', empId: 'EMP010', name: 'Pooja Iyer', department: 'Corporate HO', type: 'Sick', from: '2026-05-12', to: '2026-05-13', days: 2, status: 'Approved' },
  { id: 'lv-2', empId: 'EMP003', name: 'Sneha Gupta', department: 'Corporate HO', type: 'Casual', from: '2026-05-09', to: '2026-05-09', days: 1, status: 'Approved' },
  { id: 'lv-3', empId: 'EMP005', name: 'Amit Kumar', department: 'Saree Manufacturing', type: 'Earned', from: '2026-05-16', to: '2026-05-20', days: 5, status: 'Pending' },
  { id: 'lv-4', empId: 'EMP007', name: 'Rajesh Mehta', department: 'Saree Manufacturing', type: 'Unpaid', from: '2026-05-08', to: '2026-05-08', days: 1, status: 'Rejected' },
  { id: 'lv-5', empId: 'EMP002', name: 'Priya Patel', department: 'Hotels', type: 'Sick', from: '2026-05-14', to: '2026-05-15', days: 2, status: 'Approved' },
  { id: 'lv-6', empId: 'EMP009', name: 'Karan Singh', department: 'Hotels', type: 'Casual', from: '2026-05-11', to: '2026-05-11', days: 1, status: 'Pending' },
  { id: 'lv-7', empId: 'EMP001', name: 'Rahul Sharma', department: 'Real Estate', type: 'Earned', from: '2026-04-20', to: '2026-04-25', days: 6, status: 'Approved' },
];

export const REGULARIZATION_ROWS: RegularizationRecord[] = [
  { id: 'rg-1', empId: 'EMP002', name: 'Priya Patel', department: 'Hotels', date: '2026-05-13', reason: 'Forgot out punch', status: 'Pending' },
  { id: 'rg-2', empId: 'EMP004', name: 'Vikram Rao', department: 'Real Estate', date: '2026-05-12', reason: 'Biometric error', status: 'Approved' },
  { id: 'rg-3', empId: 'EMP006', name: 'Neha Desai', department: 'Hotels', date: '2026-05-10', reason: 'Late punch — traffic', status: 'Approved' },
  { id: 'rg-4', empId: 'EMP007', name: 'Rajesh Mehta', department: 'Saree Manufacturing', date: '2026-05-08', reason: 'Forgot in punch', status: 'Rejected' },
  { id: 'rg-5', empId: 'EMP008', name: 'Anita Joshi', department: 'Corporate HO', date: '2026-05-09', reason: 'Outdoor meeting', status: 'Pending' },
];

export const STATUS_BADGE: Record<ReportStatus, 'success' | 'error' | 'warning' | 'info' | 'default'> = {
  Present: 'success',
  Absent: 'error',
  Leave: 'info',
  Late: 'warning',
  'Early Out': 'warning',
};
