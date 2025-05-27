import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import AddFriendButton from '@/components/friends/AddFriendButton';

const mockMutate = vi.fn();
vi.mock('@/hooks/useFriendRequestMutation', () => ({
  useFriendRequestMutation: () => ({
    mutate: mockMutate,
  }),
}));

const useFriendRequestButtonMock = vi.fn();
vi.mock('@/hooks/useFriendRequests', () => ({
  useFriendRequestButton: () => useFriendRequestButtonMock(),
}));

describe('AddFriendButton', () => {
  const userId = '123';

  it('renders loading state', () => {
    useFriendRequestButtonMock.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
      refetch: vi.fn(),
    });
    render(<AddFriendButton userId={userId} />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useFriendRequestButtonMock.mockReturnValue({
      data: null,
      isPending: false,
      error: new Error('Failed to load button state'),
      refetch: vi.fn(),
    });
    render(<AddFriendButton userId={userId} />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders the Add Friend button', () => {
    useFriendRequestButtonMock.mockReturnValue({
      data: 'add',
      isPending: false,
      error: null,
      refetch: vi.fn(),
    });
    render(<AddFriendButton userId={userId} />);
    const addButton = screen.getByText('Add Friend');
    expect(addButton).toBeDefined();
  });

  it('calls mutate on button click', () => {
    useFriendRequestButtonMock.mockReturnValue({
      data: 'add',
      isPending: false,
      error: null,
      refetch: vi.fn(),
    });
    render(<AddFriendButton userId={userId} />);
    const addButton = screen.getByText('Add Friend');
    fireEvent.click(addButton);
    expect(mockMutate).toHaveBeenCalledWith(userId, expect.anything());
  });
});
