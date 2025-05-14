import { render, screen } from '@testing-library/react';
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

vi.mock('@/hooks/useActivityMutation', () => ({
  useActivityMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isError: false,
    isSuccess: false,
  })),
}));

describe('AddActivity', () => {
  it('renders the AddActivity component', () => {
    render(<AddActivity />);
    const addActivityElement = screen.getByTestId('add-activity');
    expect(addActivityElement).toBeDefined();
  });
});
