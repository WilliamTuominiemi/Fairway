import { useQuery } from '@tanstack/react-query';

import { Stats } from '@/types/index';

export const fetchStats = async (userId?: string): Promise<Stats> => {
  const response = await fetch(`/api/stats?userId=${userId ?? ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook to fetch stats for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's stats
 * @returns Query result containing stats data, loading state, and error state
 */
export const useStats = (userId?: string) => {
  const queryKey = ['stats', userId ?? 'self'];

  return useQuery({
    queryKey,
    queryFn: () => fetchStats(userId),
  });
};
