import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import AddGolfclub from '@/components/profile/golfbag/AddGolfclub';

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

vi.mock('@/hooks/useGolfclubMutation', () => ({
  useAddGolfClubMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isError: false,
    isSuccess: false,
  })),
}));

describe('AddGolfclub', () => {
  it('renders the AddGolfclub component', () => {
    render(<AddGolfclub />);
    const addGolfclubElement = screen.getByTestId('add-golfclub');
    expect(addGolfclubElement).toBeDefined();
  });
});
