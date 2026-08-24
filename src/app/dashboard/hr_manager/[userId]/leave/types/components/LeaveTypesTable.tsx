'use client';

import { Edit, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

interface LeaveTypesTableProps {
  searchQuery: string;
  onEdit: (leaveType: any) => void;
  onView: (leaveType: any) => void;
}

const leaveTypes = [
  { id: 1, name: 'Casual Leave', code: 'CL', paid: true, annualLimit: '12 Days', carryForward: false, status: 'active' },
  { id: 2, name: 'Paternity Leave', code: 'PL', paid: true, annualLimit: '15 Days', carryForward: false, status: 'active' },
];

export default function LeaveTypesTable({ searchQuery, onEdit, onView }: LeaveTypesTableProps) {
  const filteredTypes = leaveTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id: number) => {
    alert(`Toggling status for leave type ${id}`);
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Leave Type</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Code</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Paid</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Annual Limit</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Carry Forward</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTypes.map((type) => (
            <tr key={type.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{type.name}</td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400 font-mono">{type.code}</td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                {type.paid ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{type.annualLimit}</td>
              <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                {type.carryForward ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  type.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {type.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(type)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(type)}
                    className="p-2 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(type.id)}
                    className="p-2 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    title={type.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {type.status === 'active' ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-red-600" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
