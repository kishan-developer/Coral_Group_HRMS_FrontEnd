'use client';

import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export default function NotificationSettings() {
  const notificationTriggers = [
    { id: 1, event: 'Leave Submitted', email: true, sms: true, push: true, whatsapp: false },
    { id: 2, event: 'Leave Approved', email: true, sms: true, push: true, whatsapp: false },
    { id: 3, event: 'Leave Rejected', email: true, sms: true, push: true, whatsapp: false },
    { id: 4, event: 'Leave Cancelled', email: true, sms: false, push: true, whatsapp: false },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Bell className="h-5 w-5 text-orange-500" />
        Notifications
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Trigger notifications on the following events:</p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Event</th>
              <th className="text-center py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Mail className="h-4 w-4 inline" />
              </th>
              <th className="text-center py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <MessageSquare className="h-4 w-4 inline" />
              </th>
              <th className="text-center py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Bell className="h-4 w-4 inline" />
              </th>
              <th className="text-center py-2 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <Smartphone className="h-4 w-4 inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {notificationTriggers.map((trigger) => (
              <tr key={trigger.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100">{trigger.event}</td>
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" checked={trigger.email} className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]" />
                </td>
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" checked={trigger.sms} className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]" />
                </td>
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" checked={trigger.push} className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]" />
                </td>
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" checked={trigger.whatsapp} className="rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 text-center">
        Send Via: Email • SMS • Push Notification • WhatsApp (Optional)
      </p>
    </div>
  );
}
