'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, UserCheck, Save } from 'lucide-react';
import {
  type Permission,
  type ManagerPermissionConfig,
  getAllPermissions,
  getPermissionLabel,
  loadAllPermissionConfigs,
  saveManagerPermissions,
} from '@/lib/permissions';
import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import Alert from '@/components/ui/Alerts/Alert';

interface Manager {
  id: string;
  name: string;
  email: string;
  department: string;
}

const mockManagers: Manager[] = [
  { id: 'mgr-001', name: 'Rahul Sharma', email: 'rahul.sharma@coralgroup.com', department: 'Real Estate' },
  { id: 'mgr-002', name: 'Priya Patel', email: 'priya.patel@coralgroup.com', department: 'Hotels' },
  { id: 'mgr-003', name: 'Amit Kumar', email: 'amit.kumar@coralgroup.com', department: 'Saree Manufacturing' },
  { id: 'mgr-004', name: 'Sneha Gupta', email: 'sneha.gupta@coralgroup.com', department: 'Corporate HO' },
];

const allPermissions = getAllPermissions();

export default function PermissionsPage() {
  const [selectedManager, setSelectedManager] = useState<string>('');
  const [configs, setConfigs] = useState<ManagerPermissionConfig[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfigs(loadAllPermissionConfigs());
  }, []);

  const activeConfig = configs.find((c) => c.managerId === selectedManager);

  const isAllowed = (permission: Permission) => {
    if (!activeConfig) return true; // default = all allowed
    return activeConfig.permissions.includes(permission);
  };

  const togglePermission = (permission: Permission) => {
    if (!selectedManager) return;
    setConfigs((prev) => {
      const next = [...prev];
      const idx = next.findIndex((c) => c.managerId === selectedManager);
      if (idx >= 0) {
        const perms = next[idx].permissions.includes(permission)
          ? next[idx].permissions.filter((p) => p !== permission)
          : [...next[idx].permissions, permission];
        next[idx] = { managerId: selectedManager, permissions: perms };
      } else {
        next.push({ managerId: selectedManager, permissions: [permission] });
      }
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    if (!selectedManager) return;
    const cfg = configs.find((c) => c.managerId === selectedManager);
    if (cfg) {
      saveManagerPermissions(cfg.managerId, cfg.permissions);
    } else {
      saveManagerPermissions(selectedManager, allPermissions);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const allowAll = () => {
    if (!selectedManager) return;
    setConfigs((prev) => {
      const next = [...prev];
      const idx = next.findIndex((c) => c.managerId === selectedManager);
      if (idx >= 0) {
        next[idx] = { managerId: selectedManager, permissions: [...allPermissions] };
      } else {
        next.push({ managerId: selectedManager, permissions: [...allPermissions] });
      }
      return next;
    });
    setSaved(false);
  };

  const denyAll = () => {
    if (!selectedManager) return;
    setConfigs((prev) => {
      const next = [...prev];
      const idx = next.findIndex((c) => c.managerId === selectedManager);
      if (idx >= 0) {
        next[idx] = { managerId: selectedManager, permissions: [] };
      } else {
        next.push({ managerId: selectedManager, permissions: [] });
      }
      return next;
    });
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Manager Permissions</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Control which pages and features each manager can access.
        </p>
      </div>

      {saved && (
        <Alert type="success" message="Permissions saved successfully. The manager will see only allowed modules on next login." dismissible />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manager List */}
        <Card className="lg:col-span-1 p-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#94cb3d]" />
            Select Manager
          </h2>
          <div className="space-y-2">
            {mockManagers.map((m) => {
              const cfg = configs.find((c) => c.managerId === m.id);
              const allowedCount = cfg ? cfg.permissions.length : allPermissions.length;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setSelectedManager(m.id); setSaved(false); }}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                    selectedManager === m.id
                      ? 'border-[#94cb3d] bg-[#94cb3d]/5 dark:bg-[#94cb3d]/10'
                      : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{m.name}</p>
                    <span className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                      {allowedCount}/{allPermissions.length}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{m.email}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{m.department}</p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Permission Toggles */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#94cb3d]" />
              Module Access
            </h2>
            {selectedManager && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={allowAll}
                  className="text-xs font-medium text-[#94cb3d] hover:underline"
                >
                  Allow All
                </button>
                <span className="text-zinc-300">|</span>
                <button
                  type="button"
                  onClick={denyAll}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Deny All
                </button>
              </div>
            )}
          </div>

          {!selectedManager ? (
            <div className="text-center py-12 text-sm text-zinc-500">
              Select a manager from the left panel to configure permissions.
            </div>
          ) : (
            <>
              <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {mockManagers.find((m) => m.id === selectedManager)?.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {mockManagers.find((m) => m.id === selectedManager)?.department}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allPermissions.map((perm) => (
                  <label
                    key={perm}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                      isAllowed(perm)
                        ? 'border-[#94cb3d]/30 bg-[#94cb3d]/5 dark:bg-[#94cb3d]/10'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {getPermissionLabel(perm)}
                      </p>
                      <p className="text-xs text-zinc-500">/dashboard/manager/{perm}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAllowed(perm)}
                      onChange={() => togglePermission(perm)}
                      className="h-5 w-5 rounded border-zinc-300 text-[#94cb3d] focus:ring-[#94cb3d]/50 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="primary" size="md" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Save Permissions
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
