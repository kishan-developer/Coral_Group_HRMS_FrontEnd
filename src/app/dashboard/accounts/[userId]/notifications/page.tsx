'use client';

import { useParams } from 'next/navigation';
import NotificationsPage from '@/components/Notifications/NotificationsPage';

export default function AccountsNotificationsPage() {
  const params = useParams();
  const userId = params.userId as string;
  return <NotificationsPage userId={userId} />;
}

