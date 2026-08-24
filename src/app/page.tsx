import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 w-full max-w-7xl mx-auto flex-col items-center justify-center py-32 px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
            HRMS
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Human Resource Management System - Streamline your HR operations
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#94cb3d] px-8 text-white font-medium transition-colors hover:bg-[#7ab52f]"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-8 text-zinc-700 dark:text-zinc-300 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Get Started
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}
