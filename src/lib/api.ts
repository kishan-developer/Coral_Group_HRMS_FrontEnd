import { getApiBaseUrl } from './constants';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Ensure endpoint doesn't duplicate /api/v1 prefix
  const cleanEndpoint = endpoint.startsWith('/api/v1') ? endpoint.replace('/api/v1', '') : endpoint;

  let response = await fetch(`${getApiBaseUrl()}${cleanEndpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  // If 401, try to refresh token
  if (response.status === 401 && accessToken) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${getApiBaseUrl()}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.data.accessToken;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', newAccessToken);
          }
          onRefreshed(newAccessToken);

          // Retry original request with new token
          response = await fetch(`${getApiBaseUrl()}${cleanEndpoint}`, {
            ...options,
            headers: {
              ...headers,
              'Authorization': `Bearer ${newAccessToken}`,
            },
            credentials: 'include',
          });
        } else {
          // Refresh failed, redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
          }
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        }
      } finally {
        isRefreshing = false;
      }
    } else {
      // Wait for token refresh to complete
      await new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          resolve(token);
        });
      });

      // Retry original request with new token
      const newAccessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      response = await fetch(`${getApiBaseUrl()}${cleanEndpoint}`, {
        ...options,
        headers: {
          ...headers,
          'Authorization': `Bearer ${newAccessToken}`,
        },
        credentials: 'include',
      });
    }
  }

  return response;
};

export default apiCall;
