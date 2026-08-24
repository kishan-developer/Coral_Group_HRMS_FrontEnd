export type ShiftType = 'General' | 'Night' | 'Rotational' | 'Split';
export type ShiftStatus = 'Active' | 'Inactive';
export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface Shift {
  id: string;
  name: string;
  code: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  breakMinutes: number;
  workingHours: string; // computed display
  type: ShiftType;
  assignedCount: number;
  status: ShiftStatus;
  allowedLateMinutes: number;
  allowedEarlyOutMinutes: number;
  weeklyOff: WeekDay[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface ShiftAssignment {
  id: string;
  shiftId: string;
  empId: string;
  empName: string;
  department: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface AuditLog {
  id: string;
  shiftId: string;
  shiftName: string;
  action: 'created' | 'edited' | 'deleted' | 'duplicated' | 'assigned' | 'status-changed';
  actor: string;
  timestamp: string;
  detail?: string;
}

export const DEPARTMENTS = ['All Departments', 'Real Estate', 'Hotels', 'Saree Manufacturing', 'Corporate HO'];
export const SHIFT_TYPES: Array<ShiftType | 'All Types'> = ['All Types', 'General', 'Night', 'Rotational', 'Split'];
export const STATUS_OPTIONS: Array<ShiftStatus | 'All'> = ['All', 'Active', 'Inactive'];
export const WEEK_DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const parseHM = (hm: string) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};

export function calcWorkingHours(start: string, end: string, breakMin: number): string {
  if (!start || !end) return '0h 00m';
  const s = parseHM(start);
  let e = parseHM(end);
  if (e <= s) e += 24 * 60; // overnight shift
  const total = Math.max(0, e - s - breakMin);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

export const SHIFTS_SEED: Shift[] = [
  { id: 'sh-1', name: 'General Day', code: 'GEN-D', startTime: '09:00', endTime: '18:00', breakMinutes: 60, workingHours: '8h 00m', type: 'General', assignedCount: 124, status: 'Active', allowedLateMinutes: 15, allowedEarlyOutMinutes: 10, weeklyOff: ['Sun'], notes: 'Default office shift', createdBy: 'Admin', createdAt: '2025-11-02T10:14:00', updatedBy: 'Admin', updatedAt: '2026-04-12T09:30:00' },
  { id: 'sh-2', name: 'Morning Production', code: 'MOR-P', startTime: '06:00', endTime: '14:00', breakMinutes: 30, workingHours: '7h 30m', type: 'General', assignedCount: 42, status: 'Active', allowedLateMinutes: 10, allowedEarlyOutMinutes: 5, weeklyOff: ['Sun'], createdBy: 'Admin', createdAt: '2025-11-02T10:18:00' },
  { id: 'sh-3', name: 'Evening Operations', code: 'EVE-O', startTime: '14:00', endTime: '22:00', breakMinutes: 45, workingHours: '7h 15m', type: 'General', assignedCount: 28, status: 'Active', allowedLateMinutes: 10, allowedEarlyOutMinutes: 5, weeklyOff: ['Sun'], createdBy: 'HR Lead', createdAt: '2025-12-15T08:00:00' },
  { id: 'sh-4', name: 'Night Patrol', code: 'NGT-P', startTime: '22:00', endTime: '06:00', breakMinutes: 30, workingHours: '7h 30m', type: 'Night', assignedCount: 16, status: 'Active', allowedLateMinutes: 5, allowedEarlyOutMinutes: 5, weeklyOff: ['Sat', 'Sun'], notes: 'Hotel security & front-desk', createdBy: 'Ops Manager', createdAt: '2026-01-04T18:22:00' },
  { id: 'sh-5', name: 'Hotel Rotational A', code: 'HTL-RA', startTime: '07:00', endTime: '15:00', breakMinutes: 45, workingHours: '7h 15m', type: 'Rotational', assignedCount: 22, status: 'Active', allowedLateMinutes: 10, allowedEarlyOutMinutes: 10, weeklyOff: ['Mon'], createdBy: 'HR Lead', createdAt: '2026-02-11T11:00:00' },
  { id: 'sh-6', name: 'Hotel Rotational B', code: 'HTL-RB', startTime: '15:00', endTime: '23:00', breakMinutes: 45, workingHours: '7h 15m', type: 'Rotational', assignedCount: 20, status: 'Active', allowedLateMinutes: 10, allowedEarlyOutMinutes: 10, weeklyOff: ['Tue'], createdBy: 'HR Lead', createdAt: '2026-02-11T11:02:00' },
  { id: 'sh-7', name: 'Showroom Split', code: 'SHW-S', startTime: '10:00', endTime: '20:00', breakMinutes: 120, workingHours: '8h 00m', type: 'Split', assignedCount: 18, status: 'Active', allowedLateMinutes: 15, allowedEarlyOutMinutes: 10, weeklyOff: ['Tue'], notes: 'Split: 10–13 & 16–20', createdBy: 'Admin', createdAt: '2026-03-01T09:45:00' },
  { id: 'sh-8', name: 'Weekend Coverage', code: 'WKN-C', startTime: '11:00', endTime: '19:00', breakMinutes: 45, workingHours: '7h 15m', type: 'General', assignedCount: 0, status: 'Inactive', allowedLateMinutes: 15, allowedEarlyOutMinutes: 15, weeklyOff: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], notes: 'Sat–Sun only — deprecated', createdBy: 'Admin', createdAt: '2025-09-21T14:10:00', updatedBy: 'Admin', updatedAt: '2026-03-22T16:00:00' },
];

export const ASSIGNMENTS_SEED: ShiftAssignment[] = [
  { id: 'a1', shiftId: 'sh-1', empId: 'EMP001', empName: 'Rahul Sharma', department: 'Real Estate', effectiveFrom: '2026-01-01' },
  { id: 'a2', shiftId: 'sh-1', empId: 'EMP002', empName: 'Priya Patel', department: 'Hotels', effectiveFrom: '2026-01-01' },
  { id: 'a3', shiftId: 'sh-1', empId: 'EMP003', empName: 'Sneha Gupta', department: 'Corporate HO', effectiveFrom: '2026-01-01' },
  { id: 'a4', shiftId: 'sh-2', empId: 'EMP004', empName: 'Vikram Rao', department: 'Real Estate', effectiveFrom: '2026-01-01' },
  { id: 'a5', shiftId: 'sh-2', empId: 'EMP017', empName: 'Tarun Malik', department: 'Saree Manufacturing', effectiveFrom: '2026-02-01' },
  { id: 'a6', shiftId: 'sh-3', empId: 'EMP007', empName: 'Rajesh Mehta', department: 'Saree Manufacturing', effectiveFrom: '2026-01-15' },
  { id: 'a7', shiftId: 'sh-4', empId: 'EMP009', empName: 'Karan Singh', department: 'Hotels', effectiveFrom: '2026-01-04' },
  { id: 'a8', shiftId: 'sh-5', empId: 'EMP022', empName: 'Ishita Saxena', department: 'Hotels', effectiveFrom: '2026-02-11' },
];

export const AUDIT_LOGS_SEED: AuditLog[] = [
  { id: 'lg-1', shiftId: 'sh-7', shiftName: 'Showroom Split', action: 'created', actor: 'Admin', timestamp: '2026-03-01T09:45:00', detail: 'Initial shift creation' },
  { id: 'lg-2', shiftId: 'sh-8', shiftName: 'Weekend Coverage', action: 'status-changed', actor: 'Admin', timestamp: '2026-03-22T16:00:00', detail: 'Active → Inactive' },
  { id: 'lg-3', shiftId: 'sh-1', shiftName: 'General Day', action: 'edited', actor: 'Admin', timestamp: '2026-04-12T09:30:00', detail: 'Late grace 10 → 15 mins' },
  { id: 'lg-4', shiftId: 'sh-4', shiftName: 'Night Patrol', action: 'assigned', actor: 'Ops Manager', timestamp: '2026-04-28T18:10:00', detail: '4 employees assigned' },
  { id: 'lg-5', shiftId: 'sh-5', shiftName: 'Hotel Rotational A', action: 'duplicated', actor: 'HR Lead', timestamp: '2026-02-11T11:02:00', detail: 'Duplicated as Hotel Rotational B' },
];

export const SAMPLE_EMPLOYEES = [
  { id: 'EMP001', name: 'Rahul Sharma', department: 'Real Estate' },
  { id: 'EMP002', name: 'Priya Patel', department: 'Hotels' },
  { id: 'EMP003', name: 'Sneha Gupta', department: 'Corporate HO' },
  { id: 'EMP004', name: 'Vikram Rao', department: 'Real Estate' },
  { id: 'EMP005', name: 'Amit Kumar', department: 'Saree Manufacturing' },
  { id: 'EMP006', name: 'Neha Desai', department: 'Hotels' },
  { id: 'EMP007', name: 'Rajesh Mehta', department: 'Saree Manufacturing' },
  { id: 'EMP008', name: 'Anita Joshi', department: 'Corporate HO' },
  { id: 'EMP009', name: 'Karan Singh', department: 'Hotels' },
  { id: 'EMP010', name: 'Pooja Iyer', department: 'Corporate HO' },
  { id: 'EMP011', name: 'Mohit Verma', department: 'Real Estate' },
  { id: 'EMP012', name: 'Divya Nair', department: 'Hotels' },
];
