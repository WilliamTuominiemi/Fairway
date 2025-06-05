import { useQuery } from '@tanstack/react-query';
import { Friendship } from '@/types/index';

const fetchUserFriends = async (userId: string): Promise<Friendship[]> => {
  const response = await fetch(`/api/friends?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch friends: ${response.status}`);
  }

  const data = await response.json();
  return data.friends;
};

/**
 * Custom hook to fetch friends for a specific user or the current user
 * @param userId - Optional user ID. If not provided, fetches current user's friends
 * @returns Query result containing friends data, loading state, and error state
 */
export const useUserFriends = (userId: string) => {
  const queryKey = ['friends', userId];

  return useQuery({
    queryKey,
    queryFn: () => fetchUserFriends(userId),
  });
};
