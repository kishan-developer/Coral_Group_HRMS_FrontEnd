'use client';

import { useState } from 'react';
import { Building2, User, MapPin, Clock, Calendar, FileText, Plus } from 'lucide-react';

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('departments');

  const tabs = [
    { id: 'departments', name: 'Departments', icon: Building2 },
    { id: 'designations', name: 'Designations', icon: User },
    { id: 'locations', name: 'Locations', icon: MapPin },
    { id: 'shift-types', name: 'Shift Types', icon: Clock },
    { id: 'leave-types', name: 'Leave Types', icon: Calendar },
    { id: 'holiday-calendar', name: 'Holiday Calendar', icon: FileText },
  ];

  const masterData = {
    departments: [
      { id: 1, name: 'Engineering', code: 'ENG', description: 'Software development team' },
      { id: 2, name: 'Marketing', code: 'MKT', description: 'Marketing and sales team' },
      { id: 3, name: 'HR', code: 'HR', description: 'Human resources' },
      { id: 4, name: 'Finance', code: 'FIN', description: 'Finance department' },
    ],
    designations: [
      { id: 1, name: 'Software Engineer', level: 'L3' },
      { id: 2, name: 'Senior Software Engineer', level: 'L4' },
      { id: 3, name: 'Tech Lead', level: 'L5' },
      { id: 4, name: 'Engineering Manager', level: 'L6' },
    ],
    locations: [
      { id: 1, name: 'New York HQ', address: '123 Main St, New York', type: 'Headquarters' },
      { id: 2, name: 'London Office', address: '456 Baker St, London', type: 'Branch' },
      { id: 3, name: 'Singapore Hub', address: '789 Orchard Rd, Singapore', type: 'Branch' },
    ],
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Master Data</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Configure global master data across the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Departments</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                  <Plus className="h-3 w-3" />
                  Add Department
                </button>
              </div>
              <div className="space-y-3">
                {masterData.departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{dept.name}</h3>
                        <span className="text-xs px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-full">
                          {dept.code}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'designations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Designations</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                  <Plus className="h-3 w-3" />
                  Add Designation
                </button>
              </div>
              <div className="space-y-3">
                {masterData.designations.map((desig) => (
                  <div key={desig.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{desig.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Level: {desig.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Locations</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                  <Plus className="h-3 w-3" />
                  Add Location
                </button>
              </div>
              <div className="space-y-3">
                {masterData.locations.map((loc) => (
                  <div key={loc.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{loc.name}</h3>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {loc.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shift-types' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Shift Types</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure shift types and timings</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Shift types configuration would be rendered here
              </div>
            </div>
          )}

          {activeTab === 'leave-types' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Leave Types</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure leave types and policies</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Leave types configuration would be rendered here
              </div>
            </div>
          )}

          {activeTab === 'holiday-calendar' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Holiday Calendar</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure global holidays</p>
              <div className="h-64 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                Holiday calendar would be rendered here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
