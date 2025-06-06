import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EventFormData {
  date: string;
  type: string;
  address: string;
  time: string;
  maxParticipants: number;
  friendsOnly?: boolean;
}

export const addEvent = async (formData: EventFormData) => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to add event: ${response.status}`);
  }

  return response.json();
};

export const useEventMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error adding event:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
