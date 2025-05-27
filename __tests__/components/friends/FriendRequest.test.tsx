import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import FriendRequestItem from '@/components/friends/FriendRequest';

const useUserByIdMock = vi.fn();
vi.mock('@/hooks/useUsers', () => ({
  useUserById: () => useUserByIdMock(),
}));

const mockAcceptFriendRequestMutation = vi.fn();
const mockCancelFriendRequestMutation = vi.fn();

vi.mock('@/hooks/useFriendRequestMutation', () => ({
  useAcceptFriendRequestMutation: () => ({
    mutate: mockAcceptFriendRequestMutation,
  }),
  useCancelFriendRequestMutation: () => ({
    mutate: mockCancelFriendRequestMutation,
  }),
}));

describe('FriendRequestItem', () => {
  const userId = '123';

  it('renders loading state', () => {
    useUserByIdMock.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    });
    render(<FriendRequestItem userId={userId} type="incoming" />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useUserByIdMock.mockReturnValue({
      data: null,
      isPending: false,
      error: new Error('Failed to load user'),
    });
    render(<FriendRequestItem userId={userId} type="incoming" />);
    const errorMessage = screen.getByText(
      'Error loading user: Failed to load user',
    );
    expect(errorMessage).toBeDefined();
  });

  it('renders the FriendRequestItem component for incoming request', () => {
    useUserByIdMock.mockReturnValue({
      data: {
        id: userId,
        name: 'John Doe',
        image: 'https://example.com/image.jpg',
      },
      isPending: false,
      error: null,
    });
    render(<FriendRequestItem userId={userId} type="incoming" />);

    const friendName = screen.getByText('John Doe');
    expect(friendName).toBeDefined();

    const acceptButton = screen.getByText('Accept');
    expect(acceptButton).toBeDefined();

    fireEvent.click(acceptButton);
    expect(mockAcceptFriendRequestMutation).toHaveBeenCalledWith(userId, {
      onSuccess: expect.any(Function),
    });
  });

  it('renders the FriendRequestItem component for outgoing request', () => {
    useUserByIdMock.mockReturnValue({
      data: {
        id: userId,
        name: 'Jane Doe',
        image: 'https://example.com/image.jpg',
      },
      isPending: false,
      error: null,
    });
    render(<FriendRequestItem userId={userId} type="outgoing" />);

    const friendName = screen.getByText('Jane Doe');
    expect(friendName).toBeDefined();

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeDefined();

    fireEvent.click(cancelButton);
    expect(mockCancelFriendRequestMutation).toHaveBeenCalledWith(userId, {
      onSuccess: expect.any(Function),
    });
  });
});
