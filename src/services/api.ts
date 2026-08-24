import { API_BASE_URL } from '@/lib/constants';
import { getToken } from '@/lib/auth';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  del: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

export interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: {
    items: Notification[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
    unreadCount: number;
  };
  message: string;
}

export const notificationsApi = {
  getAll: (params?: { unreadOnly?: boolean; page?: number; pageSize?: number }) =>
    api.get<NotificationsResponse>(`/v1/notifications?${new URLSearchParams(params as any).toString()}`),
  getById: (id: string) => api.get<{ success: boolean; data: Notification; message: string }>(`/v1/notifications/${id}`),
  markAsRead: (id: string) => api.put<{ success: boolean; data: Notification; message: string }>(`/v1/notifications/${id}/mark-read`, {}),
  markAllAsRead: () => api.put<{ success: boolean; message: string }>(`/v1/notifications/mark-all-read`, {}),
  delete: (id: string) => api.del<{ success: boolean; message: string }>(`/v1/notifications/${id}`),
};
