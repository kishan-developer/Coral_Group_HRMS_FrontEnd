import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AccountsUserIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  return <DashboardLayout role="accounts">{children}</DashboardLayout>;
}
