'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Package,
  Laptop,
  Smartphone,
  Printer,
  Car,
  Wrench,
  Search,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Building2,
  User,
  Barcode,
  X,
  Zap,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  MoreVertical,
  QrCode,
  HardDrive,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Asset {
  id: string;
  name: string;
  assetCode: string;
  serialNumber: string;
  category: 'Laptop' | 'Mobile' | 'Office Equipment' | 'Furniture' | 'Vehicle' | 'Server';
  company: string;
  status: 'available' | 'assigned' | 'in_maintenance' | 'retired';
  assignedTo?: string;
  assignedUserEmail?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  value: number;
  location: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'available' | 'maintenance' | 'retired'>('all');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Form State
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCode, setNewAssetCode] = useState(`AST-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newCategory, setNewCategory] = useState<Asset['category']>('Laptop');
  const [newCompany, setNewCompany] = useState('Acme Enterprise');
  const [newValue, setNewValue] = useState<number>(1500);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssets([
        {
          id: '1',
          name: 'Apple MacBook Pro 16" M3 Max',
          assetCode: 'AST-1001',
          serialNumber: 'C02GX991Q05D',
          category: 'Laptop',
          company: 'Acme Enterprise',
          status: 'assigned',
          assignedTo: 'Kishan Admin',
          assignedUserEmail: 'admin@acme.com',
          purchaseDate: '2025-01-15',
          warrantyExpiry: '2028-01-15',
          value: 3499,
          location: 'HQ Floor 4, Desk 42',
        },
        {
          id: '2',
          name: 'Dell XPS 15 OLED Developer Edition',
          assetCode: 'AST-1002',
          serialNumber: 'DL-99120-XPS',
          category: 'Laptop',
          company: 'Tech Solutions Ltd',
          status: 'available',
          purchaseDate: '2025-02-20',
          warrantyExpiry: '2027-02-20',
          value: 2100,
          location: 'IT Storage Hub B',
        },
        {
          id: '3',
          name: 'Apple iPhone 15 Pro Max 256GB',
          assetCode: 'AST-1003',
          serialNumber: 'DN6FN911K22P',
          category: 'Mobile',
          company: 'Tech Solutions Ltd',
          status: 'assigned',
          assignedTo: 'Priya Sharma',
          assignedUserEmail: 'priya@techsolutions.com',
          purchaseDate: '2024-11-10',
          warrantyExpiry: '2026-11-10',
          value: 1199,
          location: 'Remote Work Unit',
        },
        {
          id: '4',
          name: 'HP Enterprise LaserJet Color Printer',
          assetCode: 'AST-1004',
          serialNumber: 'HP-PRNT-8821',
          category: 'Office Equipment',
          company: 'Global Industries',
          status: 'in_maintenance',
          purchaseDate: '2023-11-05',
          warrantyExpiry: '2025-11-05',
          value: 850,
          location: 'HQ Floor 2 Print Room',
        },
        {
          id: '5',
          name: 'Dell PowerEdge R750 Rack Server',
          assetCode: 'AST-1005',
          serialNumber: 'DELL-SRV-9900',
          category: 'Server',
          company: 'Global Industries',
          status: 'assigned',
          assignedTo: 'IT Infrastructure Ops',
          assignedUserEmail: 'devops@global.com',
          purchaseDate: '2024-05-12',
          warrantyExpiry: '2029-05-12',
          value: 8400,
          location: 'Data Center Rack 04',
        },
        {
          id: '6',
          name: 'Herman Miller Ergonomic Task Chair',
          assetCode: 'AST-1006',
          serialNumber: 'HM-CHAIR-4421',
          category: 'Furniture',
          company: 'Acme Enterprise',
          status: 'available',
          purchaseDate: '2024-08-01',
          warrantyExpiry: '2034-08-01',
          value: 1400,
          location: 'Executive Suite Office',
        },
      ]);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        asset.name.toLowerCase().includes(query) ||
        asset.assetCode.toLowerCase().includes(query) ||
        asset.serialNumber.toLowerCase().includes(query) ||
        asset.company.toLowerCase().includes(query) ||
        (asset.assignedTo && asset.assignedTo.toLowerCase().includes(query));

      const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
      const matchesCompany = filterCompany === 'all' || asset.company === filterCompany;

      let matchesTab = true;
      if (activeTab === 'assigned') matchesTab = asset.status === 'assigned';
      else if (activeTab === 'available') matchesTab = asset.status === 'available';
      else if (activeTab === 'maintenance') matchesTab = asset.status === 'in_maintenance';
      else if (activeTab === 'retired') matchesTab = asset.status === 'retired';

      return matchesSearch && matchesCategory && matchesStatus && matchesCompany && matchesTab;
    });
  }, [assets, searchTerm, filterCategory, filterStatus, filterCompany, activeTab]);

  const totalValue = useMemo(() => {
    return assets.reduce((sum, a) => sum + a.value, 0);
  }, [assets]);

  const handleCreateAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) {
      showToast('Please enter a valid asset name', 'warning');
      return;
    }

    const created: Asset = {
      id: String(Date.now()),
      name: newAssetName,
      assetCode: newAssetCode,
      serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      category: newCategory,
      company: newCompany,
      status: 'available',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: '2028-01-01',
      value: newValue,
      location: 'Central IT Warehouse',
    };

    setAssets([created, ...assets]);
    setShowAddModal(false);
    setNewAssetName('');
    setNewAssetCode(`AST-${Math.floor(1000 + Math.random() * 9000)}`);
    showToast(`Asset "${created.name}" registered into global inventory!`, 'success');
  };

  const handleExportCSV = () => {
    showToast('Exporting enterprise asset ledger to CSV file...', 'success');
  };

  const getCategoryIcon = (category: Asset['category']) => {
    switch (category) {
      case 'Laptop':
        return <Laptop className="h-4 w-4 text-blue-500" />;
      case 'Mobile':
        return <Smartphone className="h-4 w-4 text-purple-500" />;
      case 'Office Equipment':
        return <Printer className="h-4 w-4 text-amber-500" />;
      case 'Server':
        return <HardDrive className="h-4 w-4 text-indigo-500" />;
      case 'Vehicle':
        return <Car className="h-4 w-4 text-emerald-500" />;
      default:
        return <Package className="h-4 w-4 text-teal-500" />;
    }
  };

  const getStatusBadge = (status: Asset['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            In Stock
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <User className="h-3 w-3" />
            Assigned
          </span>
        );
      case 'in_maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Wrench className="h-3 w-3" />
            Maintenance
          </span>
        );
      case 'retired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
            Retired
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
            toast.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 shadow-emerald-900/20'
              : toast.type === 'warning'
              ? 'bg-amber-600/95 border-amber-500 shadow-amber-900/20'
              : 'bg-zinc-900/95 border-zinc-700 shadow-zinc-900/40'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-white animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94cb3d]/20 border border-[#94cb3d]/40 text-[#94cb3d] text-xs font-bold tracking-wide uppercase">
                <Package className="h-3.5 w-3.5" />
                <span>Enterprise Asset Management</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Total Valuation: ₹{totalValue.toLocaleString('en-IN')}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              IT Hardware & Asset Inventory
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed">
              Centralized lifecycle control across laptops, mobile devices, servers, office machinery, assignment logs, and warranty tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-4 py-2.5 shadow-lg shadow-[#94cb3d]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Register New Asset
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold px-3 py-2.5"
            >
              <Download className="h-4 w-4 mr-1.5 text-emerald-400" />
              Export Asset CSV
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Total Hardware Inventory
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {assets.length} Assets
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              ₹{totalValue.toLocaleString('en-IN')} Asset Valuation
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Assigned to Employees
            </span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {assets.filter((a) => a.status === 'assigned').length} Allocated
            </h3>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 block">
              Active Employee Licenses
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              In Stock & Ready
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {assets.filter((a) => a.status === 'available').length} In Stock
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              Ready for Onboarding
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              In Maintenance
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {assets.filter((a) => a.status === 'in_maintenance').length} Under Service
            </h3>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 block">
              Vendor Repairs Pending
            </span>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'all', label: 'All Assets', icon: Package, count: assets.length },
          { id: 'assigned', label: 'Assigned Assets', icon: User, count: assets.filter((a) => a.status === 'assigned').length },
          { id: 'available', label: 'Available in Stock', icon: CheckCircle2, count: assets.filter((a) => a.status === 'available').length },
          { id: 'maintenance', label: 'In Maintenance', icon: Wrench, count: assets.filter((a) => a.status === 'in_maintenance').length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wide transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/5 rounded-t-xl'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-850 rounded-t-xl'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#94cb3d]' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-[#94cb3d] text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#94cb3d]" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Filter Inventory Assets
            </span>
          </div>
          {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all' || filterCompany !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterStatus('all');
                setFilterCompany('all');
              }}
              className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Search Bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search asset name, barcode code, serial, or user..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Categories</option>
              <option value="Laptop">Laptops</option>
              <option value="Mobile">Mobile Devices</option>
              <option value="Office Equipment">Office Equipment</option>
              <option value="Server">Servers & IT</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available in Stock</option>
              <option value="assigned">Assigned</option>
              <option value="in_maintenance">In Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          {/* Company Filter */}
          <div>
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="all">All Companies</option>
              <option value="Acme Enterprise">Acme Enterprise</option>
              <option value="Tech Solutions Ltd">Tech Solutions Ltd</option>
              <option value="Global Industries">Global Industries</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Asset Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Corporate Hardware & Equipment Inventory
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Showing {filteredAssets.length} of {assets.length} tracked items
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-bold border-[#94cb3d] text-[#94cb3d] bg-[#94cb3d]/10">
            Automated Barcode Tracking
          </Badge>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <RefreshCw className="h-7 w-7 animate-spin text-[#94cb3d]" />
            <p className="text-xs font-semibold">Loading asset records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium border-collapse">
              <thead className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Asset Item & Tag</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Assigned To</th>
                  <th className="py-3.5 px-4">Valuation</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-6 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Info className="h-8 w-8 text-zinc-400" />
                        <p className="font-semibold">No assets found matching your current filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => (
                    <tr
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-850/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                            {getCategoryIcon(asset.category)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#94cb3d] transition-colors">
                              {asset.name}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                              <span className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                                {asset.assetCode}
                              </span>
                              <span>SN: {asset.serialNumber}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap font-semibold text-zinc-700 dark:text-zinc-300">
                        {asset.category}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                        {asset.company}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">{getStatusBadge(asset.status)}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {asset.assignedTo ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">{asset.assignedTo}</span>
                            <span className="text-[10px] text-zinc-400">{asset.assignedUserEmail}</span>
                          </div>
                        ) : (
                          <span className="text-zinc-400 font-mono">- Unassigned -</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        ₹{asset.value.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-zinc-500 text-[11px] whitespace-nowrap">
                        {asset.location}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAsset(asset);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#94cb3d]" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Register New Hardware Asset
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssetSubmit} className="p-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                  Asset Title / Model Name
                </label>
                <input
                  type="text"
                  required
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  placeholder="e.g. Apple MacBook Pro 14 M3 Pro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Asset Code Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={newAssetCode}
                    onChange={(e) => setNewAssetCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Asset['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Office Equipment">Office Equipment</option>
                    <option value="Server">Server</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Assigned Organization
                  </label>
                  <select
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  >
                    <option value="Acme Enterprise">Acme Enterprise</option>
                    <option value="Tech Solutions Ltd">Tech Solutions Ltd</option>
                    <option value="Global Industries">Global Industries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1.5">
                    Valuation (₹ INR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newValue}
                    onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                >
                  Save & Add Asset
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Asset Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#94cb3d]" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedAsset.name}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">Tag: {selectedAsset.assetCode} • Serial: {selectedAsset.serialNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Status</span>
                  <div className="mt-1">{getStatusBadge(selectedAsset.status)}</div>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Valuation</span>
                  <p className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">₹{selectedAsset.value.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Assigned Employee</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedAsset.assignedTo || 'Unassigned Stock'}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Physical Location</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedAsset.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-400">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold">Purchase Date:</span>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedAsset.purchaseDate}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold">Warranty Expiry:</span>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedAsset.warrantyExpiry}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  onClick={() => setSelectedAsset(null)}
                  className="bg-[#94cb3d] text-zinc-950 hover:bg-[#83b733] font-bold rounded-xl text-xs px-5 shadow-md shadow-[#94cb3d]/20"
                >
                  Close Inspection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
