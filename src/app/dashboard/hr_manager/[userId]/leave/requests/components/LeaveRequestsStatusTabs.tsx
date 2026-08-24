'use client';

interface LeaveRequestsStatusTabsProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function LeaveRequestsStatusTabs({ selectedStatus, onStatusChange }: LeaveRequestsStatusTabsProps) {
  const tabs = [
    { id: 'all', label: 'All Requests', count: 245 },
    { id: 'pending', label: 'Pending', count: 32 },
    { id: 'approved', label: 'Approved', count: 180 },
    { id: 'rejected', label: 'Rejected', count: 20 },
    { id: 'cancelled', label: 'Cancelled', count: 13 },
  ];

  return (
    <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onStatusChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            selectedStatus === tab.id
              ? 'border-[#94cb3d] text-[#94cb3d]'
              : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          {tab.label}
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
