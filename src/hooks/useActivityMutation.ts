import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ActivityFormData {
  date: string;
  type: string;
}

export const addActivity = async (formData: ActivityFormData) => {
  const response = await fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to add activity: ${response.status}`);
  }

  return response.json();
};

export const useActivityMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error adding activity:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
