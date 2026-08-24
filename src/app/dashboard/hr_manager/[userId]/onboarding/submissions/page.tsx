'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

interface Submission {
  _id: string;
  referenceId: string;
  employeeData: {
    firstName: string;
    lastName: string;
    email: string;
    departmentId: {
      name: string;
    };
    designation: string;
  };
  status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
  createdAt: string;
}

export default function SubmissionsPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/onboarding/submissions`);
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data.submissions);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const fullName = `${sub.employeeData.firstName} ${sub.employeeData.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         sub.employeeData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Joining Submissions</h1>
        <p className="text-zinc-600 dark:text-zinc-400">View and manage employee joining form submissions</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name, email, or reference ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
            >
              <option value="">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Reference ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Employee Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Designation</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Submitted Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                    No submissions found
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="px-4 py-3 font-mono text-sm">{submission.referenceId}</td>
                    <td className="px-4 py-3 font-medium">
                      {submission.employeeData.firstName} {submission.employeeData.lastName}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{submission.employeeData.email}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {submission.employeeData.departmentId?.name || '-'}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{submission.employeeData.designation}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        submission.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
