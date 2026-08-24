import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SuperAdminUserIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  return <DashboardLayout role="superadmin">{children}</DashboardLayout>;
}
