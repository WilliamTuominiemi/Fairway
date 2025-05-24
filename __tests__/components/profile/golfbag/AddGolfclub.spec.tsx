import { render, screen, fireEvent } from '@testing-library/react';
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

const mockMutate = vi.fn();
vi.mock('@/hooks/useGolfclubMutation', () => ({
  useAddGolfClubMutation: () => ({
    mutate: mockMutate,
  }),
}));

const mockAddGolfclubData = {
  name: 'Test Golf Club',
  type: 'Driver',
};

describe('AddGolfclub', () => {
  it('renders the AddGolfclub component', () => {
    render(<AddGolfclub />);
    const addGolfclubElement = screen.getByTestId('add-golfclub');
    expect(addGolfclubElement).toBeDefined();
  });

  it('calls mutate on form submission', () => {
    render(<AddGolfclub />);
    const nameInput = screen.getByTestId('name-input');
    const typeSelect = screen.getByTestId('type-select');
    const addButton = screen.getByTestId('add-golfclub-button');

    fireEvent.change(nameInput, {
      target: { value: mockAddGolfclubData.name },
    });
    fireEvent.change(typeSelect, {
      target: { value: mockAddGolfclubData.type },
    });
    fireEvent.click(addButton);

    expect(mockMutate).toHaveBeenCalledWith(mockAddGolfclubData);
  });
});
