import { useQuery } from '@tanstack/react-query';

interface Activity {
  id: string;
  userId: string;
  type: string | null;
  details: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchActivities = async (userId?: string): Promise<Activity[]> => {
  const response = await fetch(`/api/activities?userId=${userId ?? ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch activities: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook to fetch activities for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's activities
 * @returns Query result containing activities data, loading state, and error state
 */
export const useActivities = (userId?: string) => {
  const queryKey = ['activities', userId ?? 'self'];

  return useQuery({
    queryKey,
    queryFn: () => fetchActivities(userId),
  });
};
