'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setToast({ message: 'Login successful! Redirecting...', type: 'success' });
      const timer = setTimeout(() => {
        const intendedUrl = localStorage.getItem('intendedUrl');
        if (intendedUrl) {
          localStorage.removeItem('intendedUrl');
          router.push(intendedUrl);
          return;
        }

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
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    dispatch(loginUser({ email, password, rememberMe }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b] px-4 py-8 relative overflow-hidden font-sans">
      {/* Floating Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl text-white font-medium flex items-center gap-2 max-w-md animate-in slide-in-from-top-2 text-xs sm:text-sm ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#94cb3d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-1 flex items-center justify-center">
            <img src="/logo.png" alt="Coral Group" className="h-10 sm:h-12 w-auto object-contain" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="brand">Coral HRMS Portal</Badge>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-black/5 dark:shadow-black/40">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-bold">Sign in to your account</CardTitle>
            <CardDescription className="text-xs">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-xs font-medium flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication Failed</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-[#94cb3d] focus:ring-2 focus:ring-[#94cb3d]/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-[#94cb3d] focus:ring-2 focus:ring-[#94cb3d]/30 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-zinc-300 dark:border-zinc-700 text-[#94cb3d] focus:ring-[#94cb3d]"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link
                  href="/auth/reset-password"
                  className="text-xs font-bold text-[#94cb3d] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold shadow-md shadow-[#94cb3d]/25 mt-2 bg-[#94cb3d] text-white hover:bg-[#82b632]"
              >
                Sign in to Dashboard
              </Button>
            </form>

            <div className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-[#94cb3d] hover:underline font-bold">
                Create Account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
