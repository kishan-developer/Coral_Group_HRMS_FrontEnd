import NotificationsPage from '@/components/Notifications/NotificationsPage';

export default function AccountsNotificationsPage({
  params,
}: {
  params: { userId: string };
}) {
  return <NotificationsPage userId={params.userId} />;
}
