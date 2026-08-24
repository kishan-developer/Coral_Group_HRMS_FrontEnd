import DashboardLayout from '@/components/layout/DashboardLayout';

export default function HRManagerUserIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  return <DashboardLayout role="hr_manager">{children}</DashboardLayout>;
}
