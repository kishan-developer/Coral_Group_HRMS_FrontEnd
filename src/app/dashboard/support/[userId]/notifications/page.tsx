import NotificationsPage from '@/components/Notifications/NotificationsPage';

export default function SupportNotificationsPage({
  params,
}: {
  params: { userId: string };
}) {
  return <NotificationsPage userId={params.userId} />;
}
