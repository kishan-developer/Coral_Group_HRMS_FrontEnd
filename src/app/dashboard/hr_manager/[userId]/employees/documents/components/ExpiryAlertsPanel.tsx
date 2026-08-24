'use client';

import { AlertTriangle, AlertCircle, Clock, XCircle } from 'lucide-react';

interface ExpiringDocument {
  id: string;
  employeeName: string;
  employeeId: string;
  documentTitle: string;
  documentType: string;
  expiryDate: string;
  daysUntilExpiry: number;
}

interface ExpiredDocument {
  id: string;
  employeeName: string;
  employeeId: string;
  documentTitle: string;
  documentType: string;
  expiryDate: string;
  daysExpired: number;
}

interface ExpiryAlertsPanelProps {
  expiringDocuments: ExpiringDocument[];
  expiredDocuments: ExpiredDocument[];
}

export default function ExpiryAlertsPanel({
  expiringDocuments,
  expiredDocuments,
}: ExpiryAlertsPanelProps) {
  if (expiringDocuments.length === 0 && expiredDocuments.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
        Expiry Alerts & Compliance
      </h3>

      <div className="space-y-4">
        {/* Expiring Soon */}
        {expiringDocuments.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Expiring Soon ({expiringDocuments.length})
              </h4>
            </div>
            <div className="space-y-2">
              {expiringDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{doc.employeeName}</p>
                    <p className="text-xs text-zinc-500">{doc.documentTitle} ({doc.documentType})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      {doc.daysUntilExpiry} days
                    </p>
                    <p className="text-xs text-zinc-500">{doc.expiryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expired */}
        {expiredDocuments.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Expired ({expiredDocuments.length})
              </h4>
            </div>
            <div className="space-y-2">
              {expiredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{doc.employeeName}</p>
                    <p className="text-xs text-zinc-500">{doc.documentTitle} ({doc.documentType})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {doc.daysExpired} days ago
                    </p>
                    <p className="text-xs text-zinc-500">{doc.expiryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Alerts */}
        {expiringDocuments.length === 0 && expiredDocuments.length === 0 && (
          <div className="flex items-center justify-center p-4 text-sm text-zinc-500 dark:text-zinc-400">
            <Clock className="h-4 w-4 mr-2" />
            No expiry alerts at this time
          </div>
        )}
      </div>
    </div>
  );
}
