'use client';

import { Mail, Eye, Download } from 'lucide-react';

export default function PayslipDeliveryTracking() {
  const tracking = [
    { employee: 'Rahul Sharma', emailSent: true, opened: true, downloaded: true },
    { employee: 'Amit Kumar', emailSent: true, opened: false, downloaded: false },
    { employee: 'Priya Singh', emailSent: true, opened: true, downloaded: true },
    { employee: 'John Doe', emailSent: true, opened: true, downloaded: false },
    { employee: 'Sarah Williams', emailSent: true, opened: false, downloaded: false },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Payslip Delivery Tracking</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Employee</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Mail className="h-4 w-4 inline" />
                Email Sent
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Eye className="h-4 w-4 inline" />
                Opened
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Download className="h-4 w-4 inline" />
                Downloaded
              </th>
            </tr>
          </thead>
          <tbody>
            {tracking.map((track, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{track.employee}</td>
                <td className="py-3 px-4 text-center">
                  {track.emailSent ? (
                    <span className="text-green-600 text-sm font-medium">Yes</span>
                  ) : (
                    <span className="text-zinc-400 text-sm">No</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {track.opened ? (
                    <span className="text-green-600 text-sm font-medium">Yes</span>
                  ) : (
                    <span className="text-zinc-400 text-sm">No</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {track.downloaded ? (
                    <span className="text-green-600 text-sm font-medium">Yes</span>
                  ) : (
                    <span className="text-zinc-400 text-sm">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
