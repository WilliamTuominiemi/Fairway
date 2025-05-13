// hooks/useGolfClubMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface GolfClubFormData {
  name: string;
  type: string;
}

// API function for adding a golf club
export const addGolfClub = async (formData: GolfClubFormData) => {
  const response = await fetch('/api/golfbag/club', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to add golf club: ${response.status}`);
  }

  return response.json();
};

/**
 * Custom hook for handling golf club mutation operations
 * @param onSuccessCallback - Optional callback to run after successful mutation
 * @param onErrorCallback - Optional callback to run after failed mutation
 * @returns Mutation object with mutate method and state
 */
export const useGolfclubMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGolfClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['golfclubs'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error adding golf club:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
