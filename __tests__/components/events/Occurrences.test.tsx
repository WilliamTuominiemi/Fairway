import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithClient } from '@/utils/test-utils';

import Occurrences from '@/components/events/Occurrences';
const useEventsMock = vi.fn();
vi.mock('@/hooks/useEvents', () => ({
  useEvents: () => useEventsMock(),
}));

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

const mockEvents = [
  {
    id: '1',
    userId: '1',
    type: 'Golf Tournament',
    address: '123 Golf St, Golf City',
    date: new Date('2023-10-01'),
    time: '10:00 AM',
    maxParticipants: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '2',
    type: 'Charity Event',
    address: '456 Fairway Ave, Golf Town',
    date: new Date('2023-11-01'),
    time: '2:00 PM',
    maxParticipants: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('Occurrences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSessionMock.mockReturnValue({
      data: {
        user: {
          id: '1',
          name: 'Peter Griffin',
        },
      },
      status: 'authenticated',
    });
  });

  it('renders the occurrences component with events', () => {
    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockEvents,
    });

    renderWithClient(<Occurrences />);

    const eventType1 = screen.getByText(mockEvents[0].type);
    const eventAddress1 = screen.getByText(mockEvents[0].address);
    const eventDate1 = screen.getByText(
      `${new Date(mockEvents[0].date).toLocaleDateString()} at ${mockEvents[0].time}`,
    );

    const eventType2 = screen.getByText(mockEvents[1].type);
    const eventAddress2 = screen.getByText(mockEvents[1].address);
    const eventDate2 = screen.getByText(
      `${new Date(mockEvents[1].date).toLocaleDateString()} at ${mockEvents[1].time}`,
    );

    expect(eventType1).toBeDefined();
    expect(eventAddress1).toBeDefined();
    expect(eventDate1).toBeDefined();

    expect(eventType2).toBeDefined();
    expect(eventAddress2).toBeDefined();
    expect(eventDate2).toBeDefined();
  });

  it('renders text when no events are available', () => {
    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    });

    renderWithClient(<Occurrences />);

    const noEventsText = screen.getByText('No events found.');
    expect(noEventsText).toBeDefined();
  });

  it('renders loading state when events are pending', () => {
    useEventsMock.mockReturnValue({
      isPending: true,
      error: null,
      data: [],
    });

    renderWithClient(<Occurrences />);

    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error message when there is an error', () => {
    const mockError = new Error('Failed to fetch events');
    useEventsMock.mockReturnValue({
      isPending: false,
      error: mockError,
      data: [],
    });

    renderWithClient(<Occurrences />);

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders AddEvent component when session is available', () => {
    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockEvents,
    });

    renderWithClient(<Occurrences />);
    const addEventElement = screen.getByTestId('add-event');
    expect(addEventElement).toBeDefined();
  });

  it('does not render AddEvent component when session is not available', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockEvents,
    });

    renderWithClient(<Occurrences />);
    const addEventElement = screen.queryByTestId('add-event');
    expect(addEventElement).toBeNull();
  });
});
