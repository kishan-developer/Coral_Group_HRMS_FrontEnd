'use client';

import { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, Eye, Download, RefreshCw, CheckCircle, XCircle, Trash2, FileText } from 'lucide-react';

interface Document {
  id: string;
  employeePhoto?: string;
  employeeName: string;
  employeeId: string;
  department: string;
  documentType: string;
  documentTitle: string;
  uploadedOn: string;
  expiryDate?: string;
  status: 'verified' | 'not-verified' | 'expired';
  documentUrl: string;
}

interface DocumentsTableProps {
  documents: Document[];
  onView: (id: string) => void;
  onDownload: (id: string) => void;
  onReplace: (id: string) => void;
  onVerify: (id: string) => void;
  onUnverify: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortField = 'employeeName' | 'uploadedOn' | 'documentType' | 'expiryDate';
type SortOrder = 'asc' | 'desc';

export default function DocumentsTable({
  documents,
  onView,
  onDownload,
  onReplace,
  onVerify,
  onUnverify,
  onDelete,
}: DocumentsTableProps) {
  const [sortField, setSortField] = useState<SortField>('uploadedOn');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = sortedDocuments.slice(startIndex, endIndex);

  const getStatusBadge = (status: string, expiryDate?: string) => {
    if (status === 'expired') {
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          Expired
        </span>
      );
    }
    if (expiryDate) {
      const expiry = new Date(expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            Expiring Soon
          </span>
        );
      }
    }
    const styles = {
      'verified': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'not-verified': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status === 'verified' ? 'Verified' : 'Not Verified'}
      </span>
    );
  };

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return '-';
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return <span className="text-xs text-red-600 dark:text-red-400">Expired</span>;
    }
    if (daysUntilExpiry <= 30) {
      return <span className="text-xs text-orange-600 dark:text-orange-400">{daysUntilExpiry} days</span>;
    }
    return <span className="text-xs text-zinc-600 dark:text-zinc-400">{expiryDate}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('employeeName')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Employee
                  {sortField === 'employeeName' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Employee ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Department
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('documentType')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Document Type
                  {sortField === 'documentType' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Document Title
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('uploadedOn')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Uploaded On
                  {sortField === 'uploadedOn' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('expiryDate')}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Expiry Date
                  {sortField === 'expiryDate' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {doc.employeePhoto ? (
                      <img
                        src={doc.employeePhoto}
                        alt={doc.employeeName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {doc.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{doc.employeeName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{doc.employeeId}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{doc.department}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{doc.documentType}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{doc.documentTitle}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{doc.uploadedOn}</td>
                <td className="px-4 py-3">{getExpiryStatus(doc.expiryDate)}</td>
                <td className="px-4 py-3">{getStatusBadge(doc.status, doc.expiryDate)}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === doc.id ? null : doc.id)}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </button>
                    {actionMenuId === doc.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { onView(doc.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Eye className="h-3 w-3" />
                            View Document
                          </button>
                          <button
                            onClick={() => { onDownload(doc.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                          <button
                            onClick={() => { onReplace(doc.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Replace
                          </button>
                          {doc.status === 'not-verified' ? (
                            <button
                              onClick={() => { onVerify(doc.id); setActionMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-xs text-green-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Verify
                            </button>
                          ) : (
                            <button
                              onClick={() => { onUnverify(doc.id); setActionMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-xs text-yellow-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <XCircle className="h-3 w-3" />
                              Unverify
                            </button>
                          )}
                          <button
                            onClick={() => { onDelete(doc.id); setActionMenuId(null); }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">
            {startIndex + 1}-{Math.min(endIndex, sortedDocuments.length)} of {sortedDocuments.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border text-xs ${
                  currentPage === pageNum
                    ? 'bg-[#94cb3d] text-white border-[#94cb3d]'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
