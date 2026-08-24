'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function toTitleCase(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const label = toTitleCase(segment);
    return { href, label, isLast };
  });


  return (
    <nav className="hidden md:flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-[#94cb3d] transition-colors">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {crumbs.map((crumb) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-zinc-400" />
          {crumb.isLast ? (
            <span className="font-medium text-zinc-900 dark:text-zinc-50">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-[#94cb3d] transition-colors">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}


