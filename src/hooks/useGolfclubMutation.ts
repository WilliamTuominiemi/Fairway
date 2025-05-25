import { useMutation, useQueryClient } from '@tanstack/react-query';

interface GolfClubFormData {
  name: string;
  type: string;
}

interface UpdateGolfClubParams {
  id: string;
  data: GolfClubFormData;
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

// API function for updating a golf club
export const updateGolfClub = async ({ id, data }: UpdateGolfClubParams) => {
  const response = await fetch(`/api/golfbag/club/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to update golf club: ${response.status}`);
  }

  return response.json();
};

// API function for deleting a golf club
export const deleteGolfClub = async (id: string) => {
  const response = await fetch(`/api/golfbag/club/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to delete golf club: ${response.status}`);
  }
  return response.json();
};

/**
 * Custom hook for handling golf club creation
 * @param onSuccessCallback - Optional callback to run after successful mutation
 * @param onErrorCallback - Optional callback to run after failed mutation
 * @returns Mutation object with mutate method and state
 */
export const useAddGolfClubMutation = (
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

/**
 * Custom hook for handling golf club updates
 * @param onSuccessCallback - Optional callback to run after successful mutation
 * @param onErrorCallback - Optional callback to run after failed mutation
 * @returns Mutation object with mutate method and state
 */
export const useUpdateGolfClubMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGolfClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['golfclubs'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error updating golf club:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};

/**
 * Custom hook for handling golf club deletion
 * @param onSuccessCallback - Optional callback to run after successful mutation
 * @param onErrorCallback - Optional callback to run after failed mutation
 * @returns Mutation object with mutate method and state
 */
export const useDeleteGolfClubMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGolfClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['golfclubs'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error deleting golf club:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
