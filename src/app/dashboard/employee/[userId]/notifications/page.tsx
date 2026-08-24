import NotificationsPage from '@/components/Notifications/NotificationsPage';
import { use } from 'react';

export default function EmployeeNotificationsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  return <NotificationsPage userId={resolvedParams.userId} />;
}
