'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { forgotPassword, clearError, clearMessage } from '@/store/slices/authSlice';

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(result)) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-3 flex items-center justify-center">
            <img src="/logo.png" alt="Coral Group" className="h-12 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Coral Group</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">HRMS Portal</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="mb-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Forgot password?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Enter your email address and we&apos;ll send you an OTP to reset your password.
          </p>

          {submitted && message ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Check your email
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                We sent an OTP to {email}
              </p>
              <Link
                href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
                className="inline-block w-full py-2.5 bg-[#94cb3d] text-white font-medium rounded-lg hover:bg-[#7ab52f] text-center transition-colors"
              >
                Proceed to Reset Password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#94cb3d] text-white font-medium rounded-lg hover:bg-[#7ab52f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-[#94cb3d] hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
