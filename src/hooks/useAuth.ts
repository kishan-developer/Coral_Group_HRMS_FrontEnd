'use client';

import { useEffect, useState } from 'react';
import { getUser, isAuthenticated, type User } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  return { user, loading, authenticated };
}
