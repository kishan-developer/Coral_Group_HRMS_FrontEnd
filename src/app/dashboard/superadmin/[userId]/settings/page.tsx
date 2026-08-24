'use client';

import { useState } from 'react';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'backup', label: 'Backup & Restore' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          System Settings
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Configure system-wide settings
        </p>
      </div>

      <div className="flex gap-6">
        <div className="w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#94cb3d] text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  General Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      System Name
                    </label>
                    <input
                      type="text"
                      defaultValue="HRMS System"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Default Timezone
                    </label>
                    <select className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]">
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Los_Angeles">America/Los_Angeles</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Default Date Format
                    </label>
                    <select className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        Enable Maintenance Mode
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                  <button className="px-6 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Security Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      min={5}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Password Policy
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Minimum 8 characters
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Require uppercase letter
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Require number
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Require special character
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Two-Factor Authentication
                    </label>
                    <select className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]">
                      <option value="disabled">Disabled</option>
                      <option value="optional">Optional</option>
                      <option value="required">Required for Admins</option>
                      <option value="all">Required for All</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                  <button className="px-6 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Email Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Leave requests
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Attendance alerts
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Payroll notifications
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      SMTP Configuration
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="SMTP Host"
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                      />
                      <input
                        type="number"
                        placeholder="SMTP Port"
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                  <button className="px-6 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Third-Party Integrations
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Slack Integration
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      Send notifications to Slack channels
                    </p>
                    <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                      Configure
                    </button>
                  </div>

                  <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Microsoft Teams
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      Integrate with Microsoft Teams for collaboration
                    </p>
                    <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                      Configure
                    </button>
                  </div>

                  <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Google Workspace
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      Sync with Google Calendar and Drive
                    </p>
                    <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Backup & Restore
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Automatic Backups
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Enable daily backups
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-[#94cb3d] border-zinc-300 rounded focus:ring-[#94cb3d]"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Keep backups for 30 days
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Manual Backup
                    </h3>
                    <button className="px-6 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors">
                      Create Backup Now
                    </button>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                      Restore from Backup
                    </h3>
                    <input
                      type="file"
                      accept=".sql,.json"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <button className="mt-2 px-6 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                      Restore
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
