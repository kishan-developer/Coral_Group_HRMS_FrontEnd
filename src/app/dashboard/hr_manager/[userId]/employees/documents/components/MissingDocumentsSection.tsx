'use client';

import { AlertTriangle, Mail, Plus } from 'lucide-react';

interface MissingDocument {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  missingDocuments: string[];
}

interface MissingDocumentsSectionProps {
  missingDocuments: MissingDocument[];
  onSendReminder: (employeeId: string) => void;
  onAddDocument: (employeeId: string) => void;
}

export default function MissingDocumentsSection({
  missingDocuments,
  onSendReminder,
  onAddDocument,
}: MissingDocumentsSectionProps) {
  if (missingDocuments.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Missing Documents ({missingDocuments.length} employees)
        </h3>
      </div>

      <div className="space-y-3">
        {missingDocuments.map((item) => (
          <div key={item.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.employeeName}</p>
                <p className="text-xs text-zinc-500">{item.employeeId} • {item.department}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {item.missingDocuments.map((doc, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs"
                >
                  {doc}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onSendReminder(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-3 w-3" />
                Send Reminder
              </button>
              <button
                onClick={() => onAddDocument(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Plus className="h-3 w-3" />
                Add Document
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
