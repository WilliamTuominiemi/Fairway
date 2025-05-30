import { useQuery } from '@tanstack/react-query';
import { FriendRequest } from '@/types/index';

const fetchFriendRequests = async (
  type: 'incoming' | 'outgoing',
): Promise<FriendRequest[]> => {
  const response = await fetch(`/api/friends/request?type=${type}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${type} friend requests: ${response.status}`,
    );
  }
  return response.json();
};

const fetchButtonState = async (
  userId: string,
): Promise<
  'add' | 'cancel' | 'accept' | 'own profile' | 'friends' | 'unauthorized'
> => {
  const response = await fetch(`/api/friends/request/button?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch button state: ${response.status}`);
  }
  return response.json();
};

/**
 * Custom hook to fetch friend requests for the current user
 * @returns Query result containing friend requests data, loading state, and error state
 */
export const useFriendRequests = () => {
  const incoming = useQuery({
    queryKey: ['friendRequests', 'incoming'],
    queryFn: () => fetchFriendRequests('incoming'),
  });

  const outgoing = useQuery({
    queryKey: ['friendRequests', 'outgoing'],
    queryFn: () => fetchFriendRequests('outgoing'),
  });

  return { incoming, outgoing };
};

/**
 * Custom hook to fetch the state of the friend request button for a specific user
 * @returns Query result containing the button state, loading state, and error state
 */
export const useFriendRequestButton = (userId: string) => {
  const query = useQuery({
    queryKey: ['friendRequestButton'],
    queryFn: () => fetchButtonState(userId),
  });
  return query;
};
