import NotificationsPage from '@/components/Notifications/NotificationsPage';
import { use } from 'react';

export default function SuperadminNotificationsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  return <NotificationsPage userId={resolvedParams.userId} />;
}
