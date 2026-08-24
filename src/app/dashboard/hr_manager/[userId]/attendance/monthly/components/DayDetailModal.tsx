'use client';

import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { Clock, FileText, Edit } from 'lucide-react';

type AttendanceStatus = 'present' | 'absent' | 'leave' | 'late' | 'early-out' | 'weekly-off' | 'holiday';

interface EmployeeDayRecord {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  inTime?: string;
  outTime?: string;
  hours?: string;
  status: AttendanceStatus;
  notes?: string;
  regularization?: string;
}

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: number;
  month: string;
  year: number;
}

const statusColors: Record<AttendanceStatus, string> = {
  present: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  absent: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  leave: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  late: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  'early-out': 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  'weekly-off': 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  holiday: 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300',
};

const statusLabels: Record<AttendanceStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  leave: 'Leave',
  late: 'Late',
  'early-out': 'Early Out',
  'weekly-off': 'Weekly Off',
  holiday: 'Holiday',
};

export default function DayDetailModal({ isOpen, onClose, date, month, year }: DayDetailModalProps) {
  // Generate mock data for the selected day
  const generateDayRecords = (): EmployeeDayRecord[] => {
    const records: EmployeeDayRecord[] = [
      {
        id: '1',
        name: 'John Doe',
        employeeId: 'EMP001',
        department: 'Engineering',
        inTime: '09:15',
        outTime: '18:00',
        hours: '8h 45m',
        status: 'present',
      },
      {
        id: '2',
        name: 'Jane Smith',
        employeeId: 'EMP002',
        department: 'Sales',
        inTime: '09:30',
        outTime: '18:15',
        hours: '8h 45m',
        status: 'late',
        regularization: 'Late due to traffic',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        employeeId: 'EMP003',
        department: 'Marketing',
        status: 'leave',
        notes: 'Sick leave approved',
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        employeeId: 'EMP004',
        department: 'HR',
        inTime: '09:00',
        outTime: '17:00',
        hours: '8h 00m',
        status: 'early-out',
        regularization: 'Medical appointment',
      },
      {
        id: '5',
        name: 'Tom Brown',
        employeeId: 'EMP005',
        department: 'Finance',
        status: 'absent',
        notes: 'No intimation received',
      },
    ];
    return records;
  };

  const dayRecords = generateDayRecords();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Attendance Details - ${month} ${date}, ${year}`} className="max-w-4xl">
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {dayRecords.filter(r => r.status === 'present').length}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Present</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {dayRecords.filter(r => r.status === 'absent').length}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Absent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {dayRecords.filter(r => r.status === 'leave').length}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">On Leave</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {dayRecords.filter(r => r.status === 'late' || r.status === 'early-out').length}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Late/Early Out</div>
          </div>
        </div>

        {/* Employee List */}
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800 sticky top-0">
              <tr>
                <th className="text-left p-3 font-medium text-zinc-700 dark:text-zinc-300">Employee</th>
                <th className="text-left p-3 font-medium text-zinc-700 dark:text-zinc-300">Department</th>
                <th className="text-center p-3 font-medium text-zinc-700 dark:text-zinc-300">In/Out</th>
                <th className="text-center p-3 font-medium text-zinc-700 dark:text-zinc-300">Hours</th>
                <th className="text-center p-3 font-medium text-zinc-700 dark:text-zinc-300">Status</th>
                <th className="text-left p-3 font-medium text-zinc-700 dark:text-zinc-300">Notes</th>
                <th className="text-center p-3 font-medium text-zinc-700 dark:text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dayRecords.map((record) => (
                <tr key={record.id} className="border-t border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-50">{record.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{record.employeeId}</div>
                    </div>
                  </td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">{record.department}</td>
                  <td className="p-3 text-center">
                    {record.inTime && record.outTime ? (
                      <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <Clock className="h-3 w-3" />
                        <span>{record.inTime} - {record.outTime}</span>
                      </div>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </td>
                  <td className="p-3 text-center text-zinc-600 dark:text-zinc-400">
                    {record.hours || '-'}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${statusColors[record.status]}`}>
                      {statusLabels[record.status]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="max-w-[200px]">
                      {record.notes && (
                        <div className="flex items-start gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                          <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{record.notes}</span>
                        </div>
                      )}
                      {record.regularization && (
                        <div className="flex items-start gap-1 text-xs text-amber-600 dark:text-amber-400 mt-1">
                          <Clock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{record.regularization}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" size="sm">
            View Logs
          </Button>
          <Button variant="primary" size="sm">
            Export Day Report
          </Button>
        </div>
      </div>
    </Modal>
  );
}
