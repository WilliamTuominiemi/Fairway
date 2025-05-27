import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithClient } from '@/utils/test-utils';

import { User } from '@/types/index';

import Friend from '@/components/friends/Friend';

const useUserByIdMock = vi.fn();
vi.mock('@/hooks/useUsers', () => ({
  useUserById: () => useUserByIdMock(),
}));

describe('Friend', () => {
  const userId = '123';

  it('renders loading state', () => {
    useUserByIdMock.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    });
    renderWithClient(<Friend userId={userId} />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useUserByIdMock.mockReturnValue({
      data: null,
      isPending: false,
      error: new Error('Failed to load user'),
    });
    renderWithClient(<Friend userId={userId} />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders the Friend component', () => {
    const mockUser: User = {
      id: userId,
      name: 'Peter Griffin',
      email: 'peter.griffin@email.com',
      image: 'https://example.com/image.jpg',
    };

    useUserByIdMock.mockReturnValue({
      data: mockUser,
      isPending: false,
      error: null,
    });
    renderWithClient(<Friend userId={userId} />);
    const friendElement = screen.getByText('Peter Griffin');
    expect(friendElement).toBeDefined();
    const friendImage = screen.getByAltText('Peter Griffin');
    expect(friendImage).toBeDefined();
  });
});
