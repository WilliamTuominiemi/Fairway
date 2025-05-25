import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import AddActivity from '@/components/calendar/AddActivity';

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
vi.mock('@/hooks/useActivityMutation', () => ({
  useActivityMutation: () => ({
    mutate: mockMutate,
  }),
}));

const mockActivityData = {
  date: '2023-10-01',
  type: '18-hole round',
};

describe('AddActivity', () => {
  it('renders the AddActivity component', () => {
    render(<AddActivity />);
    const addActivityElement = screen.getByTestId('add-activity');
    expect(addActivityElement).toBeDefined();
  });

  it('calls mutate on form submission', () => {
    render(<AddActivity />);
    const dateInput = screen.getByTestId('date-input');
    const typeSelect = screen.getByTestId('type-select');
    const submitButton = screen.getByTestId('add-activity-button');

    fireEvent.change(dateInput, { target: { value: mockActivityData.date } });
    fireEvent.change(typeSelect, { target: { value: mockActivityData.type } });
    fireEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledWith(mockActivityData);
  });
});
