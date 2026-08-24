'use client';

import { Eye, Edit, X, Plus } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  openingsCount: number;
  status: 'open' | 'closed';
  totalApplicants: number;
  lastUpdated: string;
}

interface JobOpeningsSectionProps {
  jobOpenings: JobOpening[];
  onViewApplicants: (id: string) => void;
  onEditJob: (id: string) => void;
  onClosePosition: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function JobOpeningsSection({
  jobOpenings,
  onViewApplicants,
  onEditJob,
  onClosePosition,
  onDelete,
}: JobOpeningsSectionProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      closed: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Active Job Openings</h3>
        <button className="text-xs text-[#94cb3d] hover:text-[#7ab32e] font-medium flex items-center gap-1">
          <Plus className="h-3 w-3" />
          Create Job
        </button>
      </div>

      <div className="space-y-3">
        {jobOpenings.map((job) => (
          <div key={job.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{job.title}</p>
                <p className="text-xs text-zinc-500">{job.department} • {job.openingsCount} position(s)</p>
              </div>
              {getStatusBadge(job.status)}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{job.totalApplicants} applicants</span>
                <span>Updated: {job.lastUpdated}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewApplicants(job.id)}
                  className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  title="View Applicants"
                >
                  <Eye className="h-3 w-3 text-zinc-500" />
                </button>
                <button
                  onClick={() => onEditJob(job.id)}
                  className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  title="Edit Job"
                >
                  <Edit className="h-3 w-3 text-zinc-500" />
                </button>
                {job.status === 'open' && (
                  <button
                    onClick={() => onClosePosition(job.id)}
                    className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    title="Close Position"
                  >
                    <X className="h-3 w-3 text-orange-500" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(job.id)}
                  className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  title="Delete"
                >
                  <X className="h-3 w-3 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
