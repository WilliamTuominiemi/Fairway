import { useQuery } from '@tanstack/react-query';

import { UserInfo } from '@/types/index';

const fetchInfo = async (userId?: string): Promise<UserInfo> => {
  const response = await fetch(`/api/user?userId=${userId ?? ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch info: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook to fetch info for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's info
 * @returns Query result containing info data, loading state, and error state
 */
export const useInfo = (userId?: string) => {
  const queryKey = ['info', userId ?? 'self'];

  return useQuery({
    queryKey,
    queryFn: () => fetchInfo(userId),
  });
};
