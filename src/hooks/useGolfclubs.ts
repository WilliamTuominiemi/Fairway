import { useQuery } from '@tanstack/react-query';

import { Golfclub } from '@/types/index';

/**
 * Fetches golf clubs for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's golf clubs
 * @returns Promise resolving to an array of Golfclub objects
 */
export const fetchGolfclubs = async (userId?: string): Promise<Golfclub[]> => {
  const response = await fetch(`/api/golfbag/club?userId=${userId ?? ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch golf clubs: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook to fetch golf clubs for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's golf clubs
 * @returns Query result containing golf clubs data, loading state, and error state
 */
export const useGolfclubs = (userId?: string) => {
  const queryKey = ['golfclubs', userId ?? 'self'];

  return useQuery({
    queryKey,
    queryFn: () => fetchGolfclubs(userId),
  });
};
