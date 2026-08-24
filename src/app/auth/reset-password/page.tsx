'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ShieldCheck, Eye, EyeOff, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPassword, resendOTP, clearError, clearMessage } from '@/store/slices/authSlice';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const initialEmail = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match. Please re-enter.', type: 'error' });
      return;
    }

    const result = await dispatch(resetPassword(formData));
    if (resetPassword.fulfilled.match(result)) {
      setSuccess(true);
      setToast({ message: 'Password reset successfully! Redirecting...', type: 'success' });
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  };

  const handleResendOTP = async () => {
    if (!formData.email) {
      setToast({ message: 'Please enter your email address to resend OTP', type: 'error' });
      return;
    }
    if (cooldown > 0 || resending) return;

    setResending(true);
    const result = await dispatch(resendOTP({ email: formData.email, type: 'password_reset' }));
    setResending(false);

    if (resendOTP.fulfilled.match(result)) {
      setToast({ message: `New password reset OTP sent to ${formData.email}!`, type: 'success' });
      setCooldown(30);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4 font-sans">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {message || 'Your password has been updated. Redirecting to login...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4 py-8 font-sans relative">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl text-white font-medium flex items-center gap-2 max-w-md text-xs sm:text-sm ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-2 flex items-center justify-center">
            <img src="/logo.png" alt="Coral Group" className="h-12 w-auto object-contain" />
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm font-medium">HRMS Portal</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              Reset Your Password
            </h2>
            <p className="text-xs text-zinc-500">
              Enter the 6-digit OTP code sent to your email along with your new password.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-xs font-medium flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Reset Failed</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                placeholder="123456"
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] text-center text-2xl tracking-widest font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Create new strong password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your new password"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || formData.otp.length !== 6}
              className="w-full py-3 bg-[#94cb3d] text-white font-bold rounded-lg hover:bg-[#82b632] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password & Login'}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={cooldown > 0 || resending || isLoading}
                className="text-xs font-semibold text-[#94cb3d] hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 mx-auto"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${resending ? 'animate-spin' : ''}`} />
                {resending
                  ? 'Resending OTP...'
                  : cooldown > 0
                  ? `Resend OTP in ${cooldown}s`
                  : 'Resend Password Reset OTP'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-[#94cb3d] hover:underline font-bold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
          <div className="text-zinc-500 text-xs font-medium">Loading reset portal...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
