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

vi.mock('@/hooks/useGolfclubs', () => ({
  useGolfclubs: vi.fn(() => ({
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
  })),
}));

describe('Golfbag', () => {
  it('renders the Golfbag component', () => {
    renderWithClient(<Golfbag />);
    const golfbagElement = screen.getByTestId('golfbag');
    expect(golfbagElement).toBeDefined();
  });
});
