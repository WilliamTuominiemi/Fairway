import { useQuery } from '@tanstack/react-query';
import { Friendship } from '@/types/index';

const fetchFriendships = async (): Promise<Friendship[]> => {
  const response = await fetch('/api/friends');
  if (!response.ok) {
    throw new Error(`Failed to fetch friendships: ${response.status}`);
  }
  const data = await response.json();
  return data.friends;
};

/**
 * Custom hook to fetch friendships for the current user
 * @returns Query result containing friendships data, loading state, and error state
 */
export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriendships,
  });
};
