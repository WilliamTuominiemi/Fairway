import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Calendar from '@/components/calendar/Calendar';

const useActivitiesMock = vi.fn();
vi.mock('@/hooks/useActivities', () => ({
  useActivities: () => useActivitiesMock(),
}));

vi.mock('@/components/calendar/Square', () => ({
  default: vi.fn(() => <div data-testid="square"></div>),
}));

vi.mock('@/components/calendar/AddActivity', () => ({
  default: vi.fn(() => <div data-testid="add-activity"></div>),
}));

describe('Calendar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
  });

  it('renders loading state', () => {
    useActivitiesMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });

    render(<Calendar />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error message on error', () => {
    useActivitiesMock.mockReturnValue({
      isPending: false,
      error: new Error('Failed to load calendar'),
      data: null,
    });

    render(<Calendar />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders the Calendar component with AddActivity and Squares', () => {
    render(<Calendar />);

    expect(screen.getByTestId('calendar')).toBeDefined();
    expect(screen.getByTestId('add-activity')).toBeDefined();
    expect(screen.getAllByTestId('square').length).toBeGreaterThan(0);
  });

  it('renders only Squares when isFeed is true', () => {
    render(<Calendar isFeed={true} />);

    expect(screen.queryByTestId('add-activity')).toBeNull();
    expect(screen.getAllByTestId('square').length).toBeGreaterThan(0);
  });

  it('renders only Squares when myProfile is false', () => {
    render(<Calendar userId="2" />);

    expect(screen.queryByTestId('add-activity')).toBeNull();
    expect(screen.getAllByTestId('square').length).toBeGreaterThan(0);
  });
});
