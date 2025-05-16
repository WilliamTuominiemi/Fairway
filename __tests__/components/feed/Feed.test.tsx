import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { User } from '@/types/index';

import Feed from '@/components/feed/Feed';

vi.mock('@/components/calendar/Calendar', () => ({
  default: () => <div data-testid="calendar">Calendar Component</div>,
}));

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/image.jpg',
  },
  {
    id: '2',
    name: 'Another User',
    email: 'another@example.com',
    image: 'https://example.com/another.jpg',
  },
];

describe('Feed', () => {
  it('renders the Feed component', () => {
    render(<Feed users={mockUsers} />);
    const feedElement = screen.getByTestId('feed');
    expect(feedElement).toBeDefined();
  });

  it('renders the correct number of Entry components', () => {
    render(<Feed users={mockUsers} />);
    const entryElements = screen.getAllByTestId('entry');
    expect(entryElements.length).toBe(mockUsers.length);
  });
});
