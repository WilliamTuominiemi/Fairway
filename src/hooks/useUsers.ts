import { useQuery } from '@tanstack/react-query';

export const fetchUsers = async () => {
  const response = await fetch('/api/users/');
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
};

export const fetchUserById = async (userId: string) => {
  const response = await fetch(`/api/user?userId=${userId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user with ID ${userId}: ${response.status}`,
    );
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
  });
};
