import { useQuery } from '@tanstack/react-query';

import { User } from '@/types/index';

const fetchParticipants = async (eventId: string): Promise<User[]> => {
  const response = await fetch(`/api/participants?eventId=${eventId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch participants: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook to fetch participants for a specific user or the current user
 * @param eventId - event ID, required to fetch participants for that event
 * @returns Query result containing participants data, loading state, and error state
 */
export const useParticipants = (eventId: string) => {
  const queryKey = ['participants', eventId];

  return useQuery({
    queryKey,
    queryFn: () => fetchParticipants(eventId),
  });
};

export default useParticipants;
