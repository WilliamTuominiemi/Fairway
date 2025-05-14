import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import ActivityForm from '@/components/calendar/ActivityForm';

describe('ActivityForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    render(
      <ActivityForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={false}
        isSuccess={false}
      />,
    );
  });

  it('renders the form with date and type inputs', () => {
    const dateInput = screen.getByTestId('date-input');
    const typeSelect = screen.getByTestId('type-select');

    expect(dateInput).toBeDefined();
    expect(typeSelect).toBeDefined();
  });

  it('activity cannot be added if date is empty', () => {
    const typeSelect = screen.getByTestId('type-select');
    const submitButton = screen.getByTestId('add-activity-button');
    fireEvent.change(typeSelect, { target: { value: '18-hole round' } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('activity cannot be added if type is empty', () => {
    const dateInput = screen.getByTestId('date-input');
    const submitButton = screen.getByTestId('add-activity-button');

    fireEvent.change(dateInput, { target: { value: '2025-05-01' } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('activity cannot be added if date is in the future', () => {
    const dateInput = screen.getByTestId('date-input');
    const typeSelect = screen.getByTestId('type-select');
    const submitButton = screen.getByTestId('add-activity-button');

    fireEvent.change(dateInput, { target: { value: '2025-05-15' } });
    fireEvent.change(typeSelect, { target: { value: '18-hole round' } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits the form with correct data', () => {
    const dateInput = screen.getByTestId('date-input');
    const typeSelect = screen.getByTestId('type-select');
    const submitButton = screen.getByTestId('add-activity-button');

    fireEvent.change(dateInput, { target: { value: '2025-05-01' } });
    fireEvent.change(typeSelect, { target: { value: '18-hole round' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      date: '2025-05-01',
      type: '18-hole round',
    });
  });

  it('shows error message when isError is true', () => {
    render(
      <ActivityForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={true}
        isSuccess={false}
      />,
    );

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('shows success message when isSuccess is true', () => {
    render(
      <ActivityForm
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        isError={false}
        isSuccess={true}
      />,
    );

    const successMessage = screen.getByTestId('success-message');
    expect(successMessage).toBeDefined();
  });
});
