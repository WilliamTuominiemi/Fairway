import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithClient } from '@/utils/test-utils';

import Occurrence from '@/components/events/Occurrence';
import { Event } from '@/types/index';

const useEventsMock = vi.fn();
vi.mock('@/hooks/useEvents', () => ({
  useEvents: () => useEventsMock(),
}));

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

const mockEvent: Event = {
  id: '1',
  userId: '1',
  type: 'Golf Tournament',
  address: '123 Golf St, Golf City',
  date: new Date('2023-10-01'),
  time: '10:00 AM',
  maxParticipants: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
};
describe('Occurrence', () => {
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

  it('renders the occurrence component', () => {
    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [mockEvent],
    });

    renderWithClient(<Occurrence {...mockEvent} />);

    const eventType = screen.getByText(mockEvent.type);
    const eventAddress = screen.getByText(mockEvent.address);
    const eventDate = screen.getByText(
      `${new Date(mockEvent.date).toLocaleDateString()} at ${mockEvent.time}`,
    );
    const eventTime = eventDate;

    expect(eventType).toBeDefined();
    expect(eventAddress).toBeDefined();
    expect(eventDate).toBeDefined();
    expect(eventTime).toBeDefined();
  });
});
