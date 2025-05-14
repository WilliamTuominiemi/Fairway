import { useMutation, useQueryClient } from '@tanstack/react-query';

interface StatsFormData {
  handicap: number;
  averageScore: number;
  drivingAccuracy: number;
  greensInRegulation: number;
  puttsPerRound: number;
}

export const addStats = async (formData: StatsFormData) => {
  const response = await fetch('/api/stats', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Server response:', errorData);
    throw new Error(`Failed to add stats: ${response.status}`);
  }

  return response.json();
};

export const useStatsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: (error: Error) => {
      console.error('Error adding stats:', error);
    },
  });
};
