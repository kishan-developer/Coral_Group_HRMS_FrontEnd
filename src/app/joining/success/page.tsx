'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function JoiningSuccessContent() {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get('ref');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#94cb3d]">Coral Group</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">HRMS Portal</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Thank You
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Your joining form has been submitted successfully. HR team will review your details and contact you shortly.
            </p>

            {referenceId && (
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Reference ID</p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{referenceId}</p>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#94cb3d] text-white font-medium rounded-lg hover:bg-[#7ab52f] transition-colors mb-4">
              <Download className="h-4 w-4" />
              Download Submitted Copy (PDF)
            </button>

            <Link
              href="/"
              className="block text-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#94cb3d]"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JoiningSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    }>
      <JoiningSuccessContent />
    </Suspense>
  );
}
