import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Occurrence from '@/components/events/Occurrence';
import { Event } from '@/types/index';

const useEventsMock = vi.fn();
vi.mock('@/hooks/useEvents', () => ({
  useEvents: () => useEventsMock(),
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
  it('renders the occurrence component', () => {
    useEventsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: [mockEvent],
    });

    render(<Occurrence {...mockEvent} />);

    const eventType = screen.getByText(mockEvent.type);
    const eventAddress = screen.getByText(mockEvent.address);
    const eventDate = screen.getByText(
      `${new Date(mockEvent.date).toLocaleDateString()} at ${mockEvent.time}`,
    );
    const eventTime = eventDate;
    const maxParticipants = screen.getByText(
      `Max Participants: ${mockEvent.maxParticipants}`,
    );

    expect(eventType).toBeDefined();
    expect(eventAddress).toBeDefined();
    expect(eventDate).toBeDefined();
    expect(eventTime).toBeDefined();
    expect(maxParticipants).toBeDefined();
  });
});
