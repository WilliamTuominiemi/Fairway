import { screen } from '@testing-library/react';
import { renderWithClient } from '@/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';

import { User } from '@/types/index';

import UserFriends from '@/components/friends/UserFriends';

const useUserFriendsMock = vi.fn();
vi.mock('@/hooks/useUserFriends', () => ({
  useUserFriends: () => useUserFriendsMock(),
}));

const useUserByIdMock = vi.fn();
vi.mock('@/hooks/useUsers', () => ({
  useUserById: () => useUserByIdMock(),
}));

describe('UserFriends', () => {
  it('renders loading state', () => {
    useUserFriendsMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });
    renderWithClient(<UserFriends userId="1" />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useUserFriendsMock.mockReturnValue({
      isPending: false,
      error: new Error('Failed to load friends'),
      data: null,
    });
    renderWithClient(<UserFriends userId="1" />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders no friends found message', () => {
    useUserFriendsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    });
    renderWithClient(<UserFriends userId="1" />);
    const noFriendsMessage = screen.getByText('No friends found.');
    expect(noFriendsMessage).toBeDefined();
  });

  it('renders list of friends', () => {
    useUserFriendsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [{ id: '1', name: 'Peter Griffin' }],
    });

    const mockUser: User = {
      id: '1',
      name: 'Peter Griffin',
      email: 'peter.griffin@email.com',
      image: 'https://example.com/image.jpg',
    };

    useUserByIdMock.mockReturnValue({
      data: mockUser,
      isPending: false,
      error: null,
    });

    renderWithClient(<UserFriends userId="1" />);
    const friend1 = screen.getByText('Peter Griffin');
    expect(friend1).toBeDefined();
  });
});
