export type AttendanceStatus = 'Present' | 'Absent' | 'Leave' | 'Late' | 'Early Out' | 'Not Marked';
export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Intern';

export interface DailyAttendanceRow {
  id: string;
  empId: string;
  name: string;
  avatar: string;
  department: string;
  shift: string;
  shiftStart: string; // HH:mm
  shiftEnd: string;
  inTime: string | null;
  outTime: string | null;
  totalHours: string;
  status: AttendanceStatus;
  employmentType: EmploymentType;
  needsRegularization: boolean;
  regularizationReason?: string;
}

export const DEPARTMENTS = ['All Departments', 'Real Estate', 'Hotels', 'Saree Manufacturing', 'Corporate HO'];
export const EMPLOYEES = ['All Employees', 'Rahul Sharma', 'Priya Patel', 'Sneha Gupta', 'Vikram Rao', 'Amit Kumar', 'Neha Desai', 'Rajesh Mehta', 'Anita Joshi', 'Karan Singh', 'Pooja Iyer', 'Mohit Verma', 'Divya Nair'];
export const SHIFTS = ['All Shifts', 'General', 'Morning', 'Evening', 'Night'];
export const STATUSES: Array<AttendanceStatus | 'All'> = ['All', 'Present', 'Absent', 'Leave', 'Late', 'Early Out', 'Not Marked'];
export const EMPLOYMENT_TYPES = ['All Types', 'Full-Time', 'Part-Time', 'Contract', 'Intern'];

export const STATUS_COLORS: Record<AttendanceStatus, { badge: 'success' | 'warning' | 'error' | 'info' | 'default'; dot: string; text: string }> = {
  Present: { badge: 'success', dot: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
  Absent: { badge: 'error', dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
  Leave: { badge: 'info', dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  Late: { badge: 'warning', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  'Early Out': { badge: 'warning', dot: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400' },
  'Not Marked': { badge: 'default', dot: 'bg-zinc-400', text: 'text-zinc-500 dark:text-zinc-400' },
};

export const DAILY_ROWS: DailyAttendanceRow[] = [
  { id: '1', empId: 'EMP001', name: 'Rahul Sharma', avatar: 'RS', department: 'Real Estate', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:01', outTime: null, totalHours: '4h 32m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '2', empId: 'EMP002', name: 'Priya Patel', avatar: 'PP', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:55', outTime: null, totalHours: '4h 38m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '3', empId: 'EMP003', name: 'Sneha Gupta', avatar: 'SG', department: 'Corporate HO', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:18', outTime: null, totalHours: '4h 15m', status: 'Late', employmentType: 'Full-Time', needsRegularization: false },
  { id: '4', empId: 'EMP004', name: 'Vikram Rao', avatar: 'VR', department: 'Real Estate', shift: 'Morning', shiftStart: '06:00', shiftEnd: '14:00', inTime: '06:02', outTime: '13:55', totalHours: '7h 53m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '5', empId: 'EMP005', name: 'Amit Kumar', avatar: 'AK', department: 'Saree Manufacturing', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: null, outTime: null, totalHours: '0h 00m', status: 'Absent', employmentType: 'Full-Time', needsRegularization: false },
  { id: '6', empId: 'EMP006', name: 'Neha Desai', avatar: 'ND', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:48', outTime: '17:45', totalHours: '8h 57m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '7', empId: 'EMP007', name: 'Rajesh Mehta', avatar: 'RM', department: 'Saree Manufacturing', shift: 'Evening', shiftStart: '14:00', shiftEnd: '22:00', inTime: '14:22', outTime: null, totalHours: '2h 08m', status: 'Late', employmentType: 'Contract', needsRegularization: false },
  { id: '8', empId: 'EMP008', name: 'Anita Joshi', avatar: 'AJ', department: 'Corporate HO', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:58', outTime: null, totalHours: '4h 35m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '9', empId: 'EMP009', name: 'Karan Singh', avatar: 'KS', department: 'Hotels', shift: 'Night', shiftStart: '22:00', shiftEnd: '06:00', inTime: '22:05', outTime: '05:30', totalHours: '7h 25m', status: 'Early Out', employmentType: 'Full-Time', needsRegularization: false },
  { id: '10', empId: 'EMP010', name: 'Pooja Iyer', avatar: 'PI', department: 'Corporate HO', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: null, outTime: null, totalHours: '0h 00m', status: 'Leave', employmentType: 'Full-Time', needsRegularization: false },
  { id: '11', empId: 'EMP011', name: 'Mohit Verma', avatar: 'MV', department: 'Real Estate', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:04', outTime: null, totalHours: '4h 28m', status: 'Present', employmentType: 'Part-Time', needsRegularization: false },
  { id: '12', empId: 'EMP012', name: 'Divya Nair', avatar: 'DN', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:11', outTime: null, totalHours: '4h 21m', status: 'Present', employmentType: 'Full-Time', needsRegularization: true, regularizationReason: 'Forgot to punch in at 09:00, system shows 09:11' },
  { id: '13', empId: 'EMP013', name: 'Suresh Pillai', avatar: 'SP', department: 'Saree Manufacturing', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:50', outTime: '16:30', totalHours: '7h 40m', status: 'Early Out', employmentType: 'Full-Time', needsRegularization: false },
  { id: '14', empId: 'EMP014', name: 'Kavita Reddy', avatar: 'KR', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:00', outTime: null, totalHours: '4h 33m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '15', empId: 'EMP015', name: 'Arjun Bose', avatar: 'AB', department: 'Real Estate', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: null, outTime: null, totalHours: '0h 00m', status: 'Not Marked', employmentType: 'Intern', needsRegularization: false },
  { id: '16', empId: 'EMP016', name: 'Meera Shah', avatar: 'MS', department: 'Corporate HO', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:52', outTime: null, totalHours: '4h 41m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '17', empId: 'EMP017', name: 'Tarun Malik', avatar: 'TM', department: 'Saree Manufacturing', shift: 'Morning', shiftStart: '06:00', shiftEnd: '14:00', inTime: '06:15', outTime: '14:05', totalHours: '7h 50m', status: 'Late', employmentType: 'Contract', needsRegularization: false },
  { id: '18', empId: 'EMP018', name: 'Sunita Roy', avatar: 'SR', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:59', outTime: null, totalHours: '4h 34m', status: 'Present', employmentType: 'Full-Time', needsRegularization: true, regularizationReason: 'Out punch missing from May 13' },
  { id: '19', empId: 'EMP019', name: 'Ravi Kapoor', avatar: 'RK', department: 'Real Estate', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '09:02', outTime: null, totalHours: '4h 31m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '20', empId: 'EMP020', name: 'Lakshmi Menon', avatar: 'LM', department: 'Corporate HO', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: null, outTime: null, totalHours: '0h 00m', status: 'Leave', employmentType: 'Full-Time', needsRegularization: false },
  { id: '21', empId: 'EMP021', name: 'Harish Gowda', avatar: 'HG', department: 'Saree Manufacturing', shift: 'Evening', shiftStart: '14:00', shiftEnd: '22:00', inTime: '14:00', outTime: null, totalHours: '2h 30m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
  { id: '22', empId: 'EMP022', name: 'Ishita Saxena', avatar: 'IS', department: 'Hotels', shift: 'General', shiftStart: '09:00', shiftEnd: '18:00', inTime: '08:45', outTime: null, totalHours: '4h 48m', status: 'Present', employmentType: 'Full-Time', needsRegularization: false },
];
