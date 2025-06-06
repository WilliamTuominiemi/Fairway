import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithClient } from '@/utils/test-utils';

import AddEvent from '@/components/events/AddEvent';

const mockMutate = vi.fn();
vi.mock('@/hooks/useEventMutation', () => ({
  useEventMutation: () => ({
    mutate: mockMutate,
  }),
}));

const mockEventData = {
  date: '2023-10-01',
  type: '18-hole round',
  address: '123 Golf Course Rd',
  time: '10:00',
  maxParticipants: '10',
  friendsOnly: false,
};

describe('AddEvent', () => {
  it('renders the AddEvent component', () => {
    renderWithClient(<AddEvent />);
    const addEventElement = screen.getByTestId('add-event');
    expect(addEventElement).toBeDefined();
  });

  it('calls mutate on form submission', () => {
    renderWithClient(<AddEvent />);
    const dateInput = screen.getByTestId('date-input');
    const typeInput = screen.getByTestId('type-select');
    const addressInput = screen.getByTestId('address-input');
    const timeInput = screen.getByTestId('time-input');
    const maxParticipantsInput = screen.getByTestId('max-participants-input');

    fireEvent.change(dateInput, { target: { value: mockEventData.date } });
    fireEvent.change(typeInput, { target: { value: mockEventData.type } });
    fireEvent.change(addressInput, {
      target: { value: mockEventData.address },
    });
    fireEvent.change(timeInput, { target: { value: mockEventData.time } });
    fireEvent.change(maxParticipantsInput, {
      target: { value: mockEventData.maxParticipants },
    });

    const form = screen.getByTestId('event-form');
    fireEvent.submit(form);

    expect(mockMutate).toHaveBeenCalledWith(mockEventData);
  });
});
