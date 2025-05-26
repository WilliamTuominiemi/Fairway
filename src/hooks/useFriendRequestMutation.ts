import { useMutation, useQueryClient } from '@tanstack/react-query';

export const sendFriendRequest = async (friendId: string) => {
  const response = await fetch(`/api/friends/request/${friendId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.log('Server response:', errorData);
    throw new Error(`Failed to send friend request: ${response.status}`);
  }

  return response.json();
};

export const cancelFriendRequest = async (friendId: string) => {
  const response = await fetch(`/api/friends/request/${friendId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.log('Server response:', errorData);
    throw new Error(`Failed to cancel friend request: ${response.status}`);
  }
  return response.json();
};

export const acceptFriendRequest = async (friendId: string) => {
  const response = await fetch(`/api/friends/request/${friendId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.log('Server response:', errorData);
    throw new Error(`Failed to accept friend request: ${response.status}`);
  }
  return response.json();
};

export const useFriendRequestMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error sending friend request:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};

export const useCancelFriendRequestMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error cancelling friend request:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};

export const useAcceptFriendRequestMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Error accepting friend request:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
