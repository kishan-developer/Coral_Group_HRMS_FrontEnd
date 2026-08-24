'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  registerUser,
  completeRegistration,
  resendOTP,
  clearError,
  setRegistrationStep,
} from '@/store/slices/authSlice';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    user,
    isLoading,
    error,
    message,
    registrationStep,
    registrationEmail,
  } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role;
      const userId = user.id;

      if (role === 'superadmin') {
        router.push(`/dashboard/superadmin/${userId}/overview`);
      } else if (role === 'hr_manager') {
        router.push(`/dashboard/hr_manager/${userId}/overview`);
      } else if (role === 'accounts') {
        router.push(`/dashboard/accounts/${userId}/overview`);
      } else if (role === 'support') {
        router.push(`/dashboard/support/${userId}/overview`);
      } else if (role === 'employee') {
        router.push(`/dashboard/employee/${userId}/overview`);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 'employee',
      })
    );
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToVerify = registrationEmail || formData.email;
    dispatch(
      completeRegistration({
        email: emailToVerify,
        otp: formData.otp,
      })
    );
  };

  const handleResendOTP = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    const emailToVerify = registrationEmail || formData.email;
    await dispatch(
      resendOTP({
        email: emailToVerify,
        type: 'registration',
      })
    );
    setResending(false);
    setCooldown(30);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-3 flex items-center justify-center">
            <img src="/logo.png" alt="Coral Group" className="h-12 w-auto object-contain" />
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm font-medium">HRMS Portal</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          {registrationStep === 1 && (
            <>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Create your account
              </h2>

              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a strong password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent text-sm"
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
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-xs font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#94cb3d] text-white font-bold rounded-lg hover:bg-[#82b632] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
                >
                  {isLoading ? 'Sending OTP Code...' : 'Continue to Email Verification'}
                </button>
              </form>
            </>
          )}

          {registrationStep === 2 && (
            <>
              <button
                onClick={() => dispatch(setRegistrationStep(1))}
                className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Registration
              </button>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                Verify Your Email Address
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
                Enter the 6-digit OTP code sent to{' '}
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                  {registrationEmail || formData.email}
                </span>
              </p>

              {message && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 px-4 py-2.5 rounded-lg text-xs font-medium mb-4">
                  {message}
                </div>
              )}

              <form onSubmit={handleStep2} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent text-center text-2xl tracking-widest font-mono font-bold"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-xs font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || formData.otp.length !== 6}
                  className="w-full py-2.5 bg-[#94cb3d] text-white font-bold rounded-lg hover:bg-[#82b632] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
                >
                  {isLoading ? 'Verifying OTP...' : 'Verify OTP & Activate Account'}
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
                      : 'Resend OTP Code'}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-6 text-center text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#94cb3d] hover:underline font-bold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
