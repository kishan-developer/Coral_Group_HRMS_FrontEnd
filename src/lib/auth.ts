import { STORAGE_KEYS } from './constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function removeUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function logout(): Promise<void> {
  const user = getUser();
  
  try {
    if (user?.id) {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
      const logoutUrl = BACKEND_URL.endsWith('/api/v1') ? `${BACKEND_URL}/auth/logout` : `${BACKEND_URL}/api/v1/auth/logout`;
      await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
    }
  } catch (error) {
    console.error('Logout API call failed:', error);
  }
  
  removeToken();
  removeUser();
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
}
