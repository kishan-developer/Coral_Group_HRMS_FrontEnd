'use client';

import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import { ArrowRight, Building2, ShieldCheck, Users, Clock, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#94cb3d]/30 relative overflow-hidden">
      {/* Ambient Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] bg-[#94cb3d]/10 dark:bg-[#94cb3d]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full z-20 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Coral Group Logo" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50 block leading-none">
                Coral HRMS
              </span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                Enterprise Suite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcher />
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 rounded-xl text-xs font-medium bg-[#94cb3d] text-[#ffffff] hover:bg-[#82b632] shadow-md shadow-[#94cb3d]/20 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Single Section Main Hero Body */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 my-auto">
        <div className="max-w-3xl w-full text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
            <Building2 className="h-3.5 w-3.5 text-[#94cb3d]" />
            <span>Human Resource Management System</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#94cb3d] animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 leading-relaxed max-w-2xl mx-auto">
            Streamline your HR operations & workforce management
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            All-in-one corporate portal for attendance tracking, leave management, automated payroll, digital onboarding, and role-based workspace controls.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#94cb3d] text-white hover:bg-[#82b632] text-xs font-medium shadow-lg shadow-[#94cb3d]/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <span>Create Account</span>
            </Link>
          </div>

          {/* Quick Pillar Cards */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-center space-y-0.5">
              <Clock className="h-4 w-4 text-[#94cb3d] mx-auto mb-1" />
              <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Attendance</div>
              <div className="text-[10px] font-medium text-zinc-500">Live Check-in</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-center space-y-0.5">
              <CreditCard className="h-4 w-4 text-[#94cb3d] mx-auto mb-1" />
              <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Payroll</div>
              <div className="text-[10px] font-medium text-zinc-500">Automated Slips</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-center space-y-0.5">
              <Users className="h-4 w-4 text-[#94cb3d] mx-auto mb-1" />
              <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Onboarding</div>
              <div className="text-[10px] font-medium text-zinc-500">Digital Flow</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-center space-y-0.5">
              <ShieldCheck className="h-4 w-4 text-[#94cb3d] mx-auto mb-1" />
              <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Security</div>
              <div className="text-[10px] font-medium text-zinc-500">RBAC Controls</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimal Bar */}
      <footer className="w-full z-20 py-4 px-6 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Coral Group HRMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
