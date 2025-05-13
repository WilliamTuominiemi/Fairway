// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';

// API function inside the same file as the hook
export const fetchUsers = async () => {
  const response = await fetch('/api/users/');
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
};

// Combined hook that includes the API call
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
