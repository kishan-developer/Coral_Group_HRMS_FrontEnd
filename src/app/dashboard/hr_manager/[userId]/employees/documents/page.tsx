'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Folder, FileText } from 'lucide-react';
import DocumentSummaryWidgets from './components/DocumentSummaryWidgets';
import DocumentFilters from './components/DocumentFilters';
import DocumentsTable from './components/DocumentsTable';
import UploadDocumentModal from './components/UploadDocumentModal';
import MissingDocumentsSection from './components/MissingDocumentsSection';
import ExpiryAlertsPanel from './components/ExpiryAlertsPanel';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [department, setDepartment] = useState('');
  const [expiryStatus, setExpiryStatus] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock documents
  const mockDocuments = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      documentType: 'ID Proof',
      documentTitle: 'Aadhaar Card',
      uploadedOn: '2024-01-15',
      expiryDate: '2029-01-15',
      status: 'verified' as const,
      documentUrl: '#',
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      documentType: 'Address Proof',
      documentTitle: 'Passport',
      uploadedOn: '2024-02-20',
      expiryDate: '2024-06-15',
      status: 'verified' as const,
      documentUrl: '#',
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Real Estate',
      documentType: 'Offer Letter',
      documentTitle: 'Appointment Letter',
      uploadedOn: '2024-03-10',
      status: 'verified' as const,
      documentUrl: '#',
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP004',
      department: 'Finance',
      documentType: 'Bank Documents',
      documentTitle: 'Bank Passbook',
      uploadedOn: '2024-04-05',
      expiryDate: '2024-05-20',
      status: 'verified' as const,
      documentUrl: '#',
    },
    {
      id: '5',
      employeeName: 'Tom Brown',
      employeeId: 'EMP005',
      department: 'Hotels',
      documentType: 'ID Proof',
      documentTitle: 'Driving License',
      uploadedOn: '2024-01-20',
      expiryDate: '2024-04-30',
      status: 'expired' as const,
      documentUrl: '#',
    },
    {
      id: '6',
      employeeName: 'Alice Green',
      employeeId: 'EMP006',
      department: 'IT',
      documentType: 'Certificates',
      documentTitle: 'Degree Certificate',
      uploadedOn: '2024-05-10',
      status: 'not-verified' as const,
      documentUrl: '#',
    },
  ];

  // Mock missing documents
  const mockMissingDocuments = [
    {
      id: '7',
      employeeName: 'Robert Davis',
      employeeId: 'EMP007',
      department: 'Saree',
      missingDocuments: ['PAN Card', 'Address Proof', 'Bank Documents'],
    },
    {
      id: '8',
      employeeName: 'Emily Wilson',
      employeeId: 'EMP008',
      department: 'HO',
      missingDocuments: ['Contract', 'Offer Letter'],
    },
  ];

  // Mock expiring documents
  const mockExpiringDocuments = [
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      documentTitle: 'Passport',
      documentType: 'Address Proof',
      expiryDate: '2024-06-15',
      daysUntilExpiry: 25,
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP004',
      documentTitle: 'Bank Passbook',
      documentType: 'Bank Documents',
      expiryDate: '2024-05-20',
      daysUntilExpiry: 0,
    },
  ];

  // Mock expired documents
  const mockExpiredDocuments = [
    {
      id: '5',
      employeeName: 'Tom Brown',
      employeeId: 'EMP005',
      documentTitle: 'Driving License',
      documentType: 'ID Proof',
      expiryDate: '2024-04-30',
      daysExpired: 21,
    },
  ];

  // Mock employees for dropdown
  const mockEmployees = [
    { id: '1', name: 'John Doe', employeeId: 'EMP001' },
    { id: '2', name: 'Jane Smith', employeeId: 'EMP002' },
    { id: '3', name: 'Mike Johnson', employeeId: 'EMP003' },
    { id: '4', name: 'Sarah Williams', employeeId: 'EMP004' },
    { id: '5', name: 'Tom Brown', employeeId: 'EMP005' },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setDocumentType('');
    setDepartment('');
    setExpiryStatus('');
    setDateRange('');
  };

  const handleView = (id: string) => {
    alert(`View document ${id}`);
  };

  const handleDownload = (id: string) => {
    alert(`Download document ${id}`);
  };

  const handleReplace = (id: string) => {
    alert(`Replace document ${id}`);
  };

  const handleVerify = (id: string) => {
    alert(`Verify document ${id}`);
  };

  const handleUnverify = (id: string) => {
    alert(`Unverify document ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      alert(`Document ${id} deleted`);
    }
  };

  const handleUploadSubmit = (data: any) => {
    console.log('Upload document:', data);
    alert('Document uploaded successfully');
    setIsUploadModalOpen(false);
  };

  const handleSendReminder = (employeeId: string) => {
    alert(`Reminder sent to employee ${employeeId}`);
  };

  const handleAddDocument = (employeeId: string) => {
    alert(`Opening document upload for employee ${employeeId}`);
  };

  const handleExportList = () => {
    alert('Exporting document list...');
  };

  const handleBulkUpload = () => {
    alert('Opening bulk upload dialog...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Employee Documents</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and track all employee documents</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBulkUpload}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </button>
          <button
            onClick={handleExportList}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export List
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Document Summary Widgets */}
      <DocumentSummaryWidgets />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <DocumentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              documentType={documentType}
              onDocumentTypeChange={setDocumentType}
              department={department}
              onDepartmentChange={setDepartment}
              expiryStatus={expiryStatus}
              onExpiryStatusChange={setExpiryStatus}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Documents Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <DocumentsTable
              documents={mockDocuments}
              onView={handleView}
              onDownload={handleDownload}
              onReplace={handleReplace}
              onVerify={handleVerify}
              onUnverify={handleUnverify}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Expiry Alerts */}
          <ExpiryAlertsPanel
            expiringDocuments={mockExpiringDocuments}
            expiredDocuments={mockExpiredDocuments}
          />

          {/* Missing Documents */}
          <MissingDocumentsSection
            missingDocuments={mockMissingDocuments}
            onSendReminder={handleSendReminder}
            onAddDocument={handleAddDocument}
          />
        </div>
      </div>

      {/* Upload Document Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
        employees={mockEmployees}
      />
    </div>
  );
}
