import { screen } from '@testing-library/react';
import { renderWithClient } from '@/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';

import Golfbag from '@/components/profile/golfbag/Golfbag';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: {
        id: '1',
        name: 'Peter Griffin',
      },
    },
  })),
}));

const useGolfclubsMock = vi.fn();
vi.mock('@/hooks/useGolfclubs', () => ({
  useGolfclubs: () => useGolfclubsMock(),
}));

describe('Golfbag', () => {
  it('renders loading state', () => {
    useGolfclubsMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });
    renderWithClient(<Golfbag />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useGolfclubsMock.mockReturnValue({
      isPending: false,
      error: new Error('Failed to load golf clubs'),
      data: null,
    });
    renderWithClient(<Golfbag />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders the Golfbag component', () => {
    useGolfclubsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [
        {
          id: '1',
          type: 'Driver',
          name: 'TaylorMade SIM2',
        },
        {
          id: '2',
          type: 'Iron',
          name: 'Callaway Apex',
        },
      ],
    });

    renderWithClient(<Golfbag />);
    const golfbagElement = screen.getByTestId('golfbag');
    expect(golfbagElement).toBeDefined();
  });

  it('renders empty bag message when no clubs are present', () => {
    useGolfclubsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    });

    renderWithClient(<Golfbag />);
    const emptyBagMessage = screen.getByText('Empty bag');
    expect(emptyBagMessage).toBeDefined();
  });
});
