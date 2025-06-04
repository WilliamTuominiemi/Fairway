import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import EventForm from '@/components/events/EventForm';

describe('EventForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    render(
      <EventForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={false}
        isSuccess={false}
      />,
    );
  });

  it('submits the form with correct data', () => {
    const typeSelect = screen.getByTestId('type-select') as HTMLSelectElement;
    const addressInput = screen.getByTestId(
      'address-input',
    ) as HTMLInputElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    const timeInput = screen.getByTestId('time-input') as HTMLInputElement;
    const maxParticipantsInput = screen.getByTestId(
      'max-participants-input',
    ) as HTMLInputElement;

    fireEvent.change(typeSelect, { target: { value: '18-hole round' } });
    fireEvent.change(addressInput, { target: { value: '123 Golf St' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-01' } });
    fireEvent.change(timeInput, { target: { value: '10:00' } });
    fireEvent.change(maxParticipantsInput, { target: { value: '4' } });

    expect(typeSelect.value).toBe('18-hole round');
    expect(addressInput.value).toBe('123 Golf St');
    expect(dateInput.value).toBe('2023-10-01');

    const form = screen.getByTestId('event-form');
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      type: '18-hole round',
      address: '123 Golf St',
      date: '2023-10-01',
      time: '10:00',
      maxParticipants: '4',
    });
  });

  it('renders error message when isError is true', () => {
    render(
      <EventForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={true}
        isSuccess={false}
      />,
    );

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders success message when isSuccess is true', () => {
    render(
      <EventForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={false}
        isSuccess={true}
      />,
    );

    const successMessage = screen.getByTestId('success-message');
    expect(successMessage).toBeDefined();
  });

  it('disables submit button when isSubmitting is true', () => {
    render(
      <EventForm
        onSubmit={mockOnSubmit}
        isSubmitting={true}
        isError={false}
        isSuccess={false}
      />,
    );

    const submitButton = screen.getByText('Creating...') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});
