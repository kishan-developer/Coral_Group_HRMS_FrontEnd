'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  Laptop,
  Smartphone,
  Printer,
  Wrench,
  Search,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  User,
  Barcode,
  X,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  MoreVertical,
  QrCode,
  HardDrive,
  UserCheck,
  RotateCcw,
  Calendar,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface HRAsset {
  id: string;
  assetCode: string;
  name: string;
  category: 'Laptop' | 'Mobile' | 'Monitor' | 'Office Equipment' | 'Server';
  serialNumber: string;
  status: 'Assigned' | 'Available' | 'Maintenance' | 'Retired';
  assignedTo?: string;
  assignedEmail?: string;
  assignedDepartment?: string;
  assignedDate?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  value: number; // INR ₹
  location: string;
}

export default function HRAssetsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Modals
  const [registerAssetModal, setRegisterAssetModal] = useState(false);
  const [allocateAssetModal, setAllocateAssetModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<HRAsset | null>(null);
  const [assetToAllocate, setAssetToAllocate] = useState<HRAsset | null>(null);

  // Form State - Register Asset
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState(`AST-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newCategory, setNewCategory] = useState<HRAsset['category']>('Laptop');
  const [newSerial, setNewSerial] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newLocation, setNewLocation] = useState('Coral HQ - Delhi');

  // Form State - Allocate Asset
  const [targetEmployee, setTargetEmployee] = useState('Kishan Kumar (CG-EMP-001)');
  const [targetDept, setTargetDept] = useState('Executive Board');

  // Sample Asset Dataset
  const [assets, setAssets] = useState<HRAsset[]>([
    {
      id: 'ast-101',
      assetCode: 'AST-LAP-001',
      name: 'MacBook Pro 16" M3 Max (36GB RAM / 1TB SSD)',
      category: 'Laptop',
      serialNumber: 'C02G90XXMD6M',
      status: 'Assigned',
      assignedTo: 'Kishan Kumar',
      assignedEmail: 'kishan@coral-group.in',
      assignedDepartment: 'Executive Board',
      assignedDate: '2026-01-15',
      purchaseDate: '2026-01-10',
      warrantyExpiry: '2029-01-10',
      value: 249900,
      location: 'Coral HQ - Delhi',
    },
    {
      id: 'ast-102',
      assetCode: 'AST-LAP-002',
      name: 'Dell XPS 15 9530 i9 32GB RTX 4060',
      category: 'Laptop',
      serialNumber: 'DLXPS-8874-99',
      status: 'Assigned',
      assignedTo: 'Sarah Johnson',
      assignedEmail: 'sarah.j@coral-group.in',
      assignedDepartment: 'Human Resources',
      assignedDate: '2026-02-01',
      purchaseDate: '2026-01-20',
      warrantyExpiry: '2028-01-20',
      value: 185000,
      location: 'Coral Tech - Mumbai',
    },
    {
      id: 'ast-103',
      assetCode: 'AST-MON-005',
      name: 'Dell UltraSharp 27" 4K USB-C Hub Monitor (U2723QE)',
      category: 'Monitor',
      serialNumber: 'CN-04491X-74261',
      status: 'Assigned',
      assignedTo: 'Priya Sharma',
      assignedEmail: 'priya.s@coral-group.in',
      assignedDepartment: 'Engineering',
      assignedDate: '2026-03-10',
      purchaseDate: '2026-03-01',
      warrantyExpiry: '2027-03-01',
      value: 48000,
      location: 'Coral Tech - Bangalore',
    },
    {
      id: 'ast-104',
      assetCode: 'AST-MOB-012',
      name: 'iPhone 15 Pro Max 256GB Natural Titanium',
      category: 'Mobile',
      serialNumber: 'F2LFX001992M',
      status: 'Assigned',
      assignedTo: 'Amit Verma',
      assignedEmail: 'amit.v@coral-group.in',
      assignedDepartment: 'Finance',
      assignedDate: '2026-04-05',
      purchaseDate: '2026-04-01',
      warrantyExpiry: '2027-04-01',
      value: 134900,
      location: 'Coral HQ - Delhi',
    },
    {
      id: 'ast-105',
      assetCode: 'AST-LAP-009',
      name: 'ThinkPad X1 Carbon Gen 11 i7 16GB',
      category: 'Laptop',
      serialNumber: 'LNV-TPX1-8849',
      status: 'Available',
      purchaseDate: '2026-05-15',
      warrantyExpiry: '2028-05-15',
      value: 142000,
      location: 'Coral HQ - Delhi',
    },
    {
      id: 'ast-106',
      assetCode: 'AST-EQU-022',
      name: 'HP LaserJet Enterprise Color MFP Printer',
      category: 'Office Equipment',
      serialNumber: 'HP-MFP-9921',
      status: 'Maintenance',
      purchaseDate: '2025-08-10',
      warrantyExpiry: '2026-08-10',
      value: 89000,
      location: 'Coral Tech - Mumbai',
    },
  ]);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const asset: HRAsset = {
      id: `ast-${Date.now()}`,
      assetCode: newCode || `AST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      category: newCategory,
      serialNumber: newSerial || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Available',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: '2028-12-31',
      value: Number(newValue) || 50000,
      location: newLocation,
    };

    setAssets([asset, ...assets]);
    setRegisterAssetModal(false);
    setNewName('');
    setNewValue('');
    setNewSerial('');
    showNotification(`New asset ${asset.assetCode} registered in inventory!`, 'success');
  };

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetToAllocate) return;

    const [empName, empCode] = targetEmployee.split(' (');

    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetToAllocate.id
          ? {
            ...a,
            status: 'Assigned',
            assignedTo: empName,
            assignedDepartment: targetDept,
            assignedDate: new Date().toISOString().split('T')[0],
          }
          : a
      )
    );

    setAssetToAllocate(null);
    setAllocateAssetModal(false);
    showNotification(`Asset ${assetToAllocate.assetCode} allocated to ${empName}!`, 'success');
  };

  const handleReturnAsset = (asset: HRAsset) => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === asset.id
          ? {
            ...a,
            status: 'Available',
            assignedTo: undefined,
            assignedEmail: undefined,
            assignedDepartment: undefined,
            assignedDate: undefined,
          }
          : a
      )
    );
    showNotification(`Asset ${asset.assetCode} returned to available inventory.`, 'info');
  };

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.assignedTo && a.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
      const matchesLocation = locationFilter === 'All' || a.location === locationFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
    });
  }, [assets, searchTerm, statusFilter, categoryFilter, locationFilter]);

  // Statistics
  const totalAssets = assets.length;
  const assignedCount = assets.filter((a) => a.status === 'Assigned').length;
  const availableCount = assets.filter((a) => a.status === 'Available').length;
  const maintenanceCount = assets.filter((a) => a.status === 'Maintenance').length;
  const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-white font-medium flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success'
            ? 'bg-[#94cb3d]'
            : toast.type === 'warning'
              ? 'bg-amber-500'
              : 'bg-blue-600'
            }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm">{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Company Asset & Hardware Directory
            </h1>
            <Badge variant="brand" className="text-[11px] px-2.5 py-0.5">
              HR Inventory Desk
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track laptops, mobile devices, hardware allocation, warranty expiration, and employee custody logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => showNotification('Exporting complete asset inventory to CSV...', 'info')}
            variant="outline"
            className="rounded-xl text-xs font-semibold"
          >
            <Download className="h-4 w-4 mr-1.5" /> Export Register
          </Button>

          <Button
            onClick={() => setRegisterAssetModal(true)}
            className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-xl text-xs font-semibold shadow-md shadow-[#94cb3d]/20"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Register New Asset
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Assets</span>
            <div className="p-2 bg-[#94cb3d]/10 text-[#94cb3d] rounded-xl">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{totalAssets}</span>
            <span className="text-xs text-zinc-400 font-medium">₹{(totalValue / 100000).toFixed(1)}L Valuation</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">100% Verified in Audit</p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Assigned to Staff</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{assignedCount}</span>
            <span className="text-xs text-zinc-400 font-medium">In Active Custody</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(assignedCount / totalAssets) * 100}%` }} />
          </div>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Available in Stock</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{availableCount}</span>
            <span className="text-xs text-zinc-400 font-medium">Ready for Onboarding</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">Stocked for immediate allocation</p>
        </Card>

        <Card className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Under Maintenance</span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">{maintenanceCount}</span>
            <span className="text-xs text-zinc-400 font-medium">Service Tickets</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-amber-500">Service SLA: 48 Hours</p>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search code, device, serial number, employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl text-xs font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Statuses</option>
            <option value="Assigned">Assigned</option>
            <option value="Available">Available in Stock</option>
            <option value="Maintenance">Under Maintenance</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Categories</option>
            <option value="Laptop">Laptops</option>
            <option value="Mobile">Mobile Devices</option>
            <option value="Monitor">Monitors</option>
            <option value="Office Equipment">Office Equipment</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value="All">All Locations</option>
            <option value="Coral HQ - Delhi">Coral HQ - Delhi</option>
            <option value="Coral Tech - Mumbai">Coral Tech - Mumbai</option>
            <option value="Coral Tech - Bangalore">Coral Tech - Bangalore</option>
          </select>
        </div>
      </div>

      {/* Asset Register Table */}
      <Card className="rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Hardware & Asset Directory</h3>
          <span className="text-xs text-zinc-400 font-semibold">Showing {filteredAssets.length} assets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Asset Code & Item</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Category</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Assigned Employee</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Value</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase">Warranty Expiry</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl">
                        {asset.category === 'Laptop' ? (
                          <Laptop className="h-4 w-4 text-[#94cb3d]" />
                        ) : asset.category === 'Mobile' ? (
                          <Smartphone className="h-4 w-4 text-blue-500" />
                        ) : (
                          <HardDrive className="h-4 w-4 text-purple-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{asset.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          {asset.assetCode} • S/N: {asset.serialNumber}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {asset.category}
                    </Badge>
                  </td>

                  <td className="px-4 py-3.5">
                    {asset.assignedTo ? (
                      <div>
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{asset.assignedTo}</p>
                        <p className="text-[10px] text-zinc-400">{asset.assignedDepartment}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400 font-italic">Unassigned (In Stock)</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${asset.status === 'Assigned'
                        ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : asset.status === 'Available'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                    >
                      {asset.status === 'Assigned' ? 'In Custody' : asset.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
                    ₹{asset.value.toLocaleString('en-IN')}
                  </td>

                  <td className="px-4 py-3.5 text-xs font-mono text-zinc-500">
                    {asset.warrantyExpiry}
                  </td>

                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200  rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> Spec Card
                    </button>

                    {asset.status === 'Available' && (
                      <button
                        onClick={() => {
                          setAssetToAllocate(asset);
                          setAllocateAssetModal(true);
                        }}
                        className="px-2.5 py-1.5 bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <UserCheck className="h-3.5 w-3.5" /> Allocate
                      </button>
                    )}

                    {asset.status === 'Assigned' && (
                      <button
                        onClick={() => handleReturnAsset(asset)}
                        className="px-2.5 py-1.5 bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Asset Spec Card Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{selectedAsset.name}</h3>
                <p className="text-xs text-zinc-500 font-mono">Asset Code: {selectedAsset.assetCode}</p>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Serial Number</span>
                <p className="font-bold font-mono text-zinc-800 dark:text-zinc-200">{selectedAsset.serialNumber}</p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Purchase Value</span>
                <p className="font-extrabold text-[#94cb3d]">₹{selectedAsset.value.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Office Location</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedAsset.location}</p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Warranty Expiry</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedAsset.warrantyExpiry}</p>
              </div>
            </div>

            {selectedAsset.assignedTo && (
              <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400">Custody Allocation Details:</span>
                <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                  Assigned to <strong>{selectedAsset.assignedTo}</strong> ({selectedAsset.assignedDepartment}) on{' '}
                  {selectedAsset.assignedDate}.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button size="sm" variant="outline" onClick={() => setSelectedAsset(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Allocate Asset Modal */}
      {allocateAssetModal && assetToAllocate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                Allocate Asset: {assetToAllocate.assetCode}
              </h3>
              <button onClick={() => setAllocateAssetModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAllocation} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Employee *</label>
                <select
                  value={targetEmployee}
                  onChange={(e) => setTargetEmployee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="Kishan Kumar (CG-EMP-001)">Kishan Kumar (CG-EMP-001)</option>
                  <option value="Sarah Johnson (CG-EMP-002)">Sarah Johnson (CG-EMP-002)</option>
                  <option value="Amit Verma (CG-EMP-003)">Amit Verma (CG-EMP-003)</option>
                  <option value="Priya Sharma (CG-EMP-004)">Priya Sharma (CG-EMP-004)</option>
                  <option value="Vikram Malhotra (CG-EMP-005)">Vikram Malhotra (CG-EMP-005)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Department</label>
                <input
                  type="text"
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setAllocateAssetModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Confirm Allocation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Asset Modal */}
      {registerAssetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Register New Hardware Asset</h3>
              <button onClick={() => setRegisterAssetModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterAsset} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Asset Name / Model *</label>
                <Input
                  required
                  placeholder="e.g. MacBook Pro 14 M3 Pro"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="Laptop">Laptop & Workstation</option>
                  <option value="Mobile">Mobile Device</option>
                  <option value="Monitor">Monitor & Display</option>
                  <option value="Office Equipment">Office Equipment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Serial Number</label>
                <Input
                  placeholder="e.g. SN-88392019"
                  value={newSerial}
                  onChange={(e) => setNewSerial(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Purchase Value (₹ INR)</label>
                <Input
                  type="number"
                  placeholder="e.g. 120000"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setRegisterAssetModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Register Asset
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
