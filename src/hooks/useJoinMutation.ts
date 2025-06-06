import { useMutation, useQueryClient } from '@tanstack/react-query';

const joinEvent = async (eventId: string) => {
  const response = await fetch('/api/events/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to join event: ${response.status}`);
  }

  return response.json();
};

export const useJoinMutation = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinEvent(eventId),
    onSuccess: () => {
      // Invalidate the participants query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['participants', eventId] });
    },
    onError: (error) => {
      console.error('Error joining event:', error);
    },
  });
};
