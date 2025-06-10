import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteAccount = async () => {
  const response = await fetch('/api/user/', {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to delete account: ${response.status}`);
  }

  return response.json();
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting account:', error);
    },
  });
};

export default useDeleteAccountMutation;
