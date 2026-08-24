import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SupportUserIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="support">{children}</DashboardLayout>;
}
