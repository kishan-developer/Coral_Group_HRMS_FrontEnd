/**
 * Replace :userId placeholder in navigation URLs with actual user ID
 */
export const replaceUserIdInUrl = (url: string, userId: string): string => {
  if (!userId) return url.replace(/\/:userId/g, '');
  return url.replace(/:userId/g, userId);
};

/**
 * Get current user ID from localStorage
 */
export const getCurrentUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  const user = JSON.parse(userStr);
  return user?.id || null;
};

/**
 * Replace all :userId placeholders in navigation items
 */
export const replaceUserIdInNavigation = (
  navigation: any[],
  userId: string
): any[] => {
  return navigation.map((item) => ({
    ...item,
    href: replaceUserIdInUrl(item.href, userId),
    children: item.children ? replaceUserIdInNavigation(item.children, userId) : undefined,
  }));
};
