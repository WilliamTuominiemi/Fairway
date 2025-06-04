import { useQuery } from '@tanstack/react-query';

import { Event } from '@/types/index';

const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch('/api/events');

  if (!response.ok)
    throw new Error(`Failed to fetch events: ${response.status}`);

  return response.json();
};

/**
 * Custom hook to fetch events for the current user
 * @returns Query result containing events data, loading state, and error state
 */
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};
