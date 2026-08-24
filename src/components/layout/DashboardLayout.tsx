import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { type Role } from './Sidebar/sidebar.config';

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 overflow-x-scroll dark:bg-black font-sans antialiased">
      <main className="flex-1 p-0 sm:p-0 lg:p-6  lg:max-w-8xl mx-full space-y-4">
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}
