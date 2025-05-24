import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { User } from '@/types/index';

import Entry from '@/components/feed/Entry';

const useActivitiesMock = vi.fn();
vi.mock('@/hooks/useActivities', () => ({
  useActivities: () => useActivitiesMock(),
}));

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  image: 'https://example.com/image.jpg',
};

describe('Entry', () => {
  it('renders loading state', () => {
    useActivitiesMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });
    render(<Entry user={mockUser} />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders the entry component', () => {
    useActivitiesMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [
        {
          id: '1',
          userId: '1',
          type: 'Simulator',
          details: 'test',
          date: '2023-10-01',
          createdAt: '2023-10-01',
          updatedAt: '2023-10-01',
        },
        {
          id: '2',
          userId: '1',
          type: 'Range',
          details: 'test',
          date: '2023-10-02',
          createdAt: '2023-10-02',
          updatedAt: '2023-10-02',
        },
      ],
    });

    render(<Entry user={mockUser} />);

    const entryUsername = screen.getByText(mockUser.name);
    const entryImage = screen.getByAltText('User Image');
    const entryCalendar = screen.getByTestId('calendar');
    const entrySquare = screen.getAllByTestId('square');

    expect(entryUsername).toBeDefined();
    expect(entryImage).toBeDefined();
    expect(entryCalendar).toBeDefined();
    expect(entrySquare.length).toBeGreaterThan(0);
  });
});
