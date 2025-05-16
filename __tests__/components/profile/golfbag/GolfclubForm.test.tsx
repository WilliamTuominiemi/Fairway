import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import GolfclubForm from '@/components/profile/golfbag/GolfclubForm';

describe('GolfclubForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    render(<GolfclubForm onSubmit={mockOnSubmit} />);
  });

  it('renders the form with name and type inputs', () => {
    const nameInput = screen.getByTestId('name-input');
    const typeSelect = screen.getByTestId('type-select');

    expect(nameInput).toBeDefined();
    expect(typeSelect).toBeDefined();
  });

  it('submits the form with correct data', () => {
    const nameInput = screen.getByTestId('name-input');
    const typeSelect = screen.getByTestId('type-select');
    const submitButton = screen.getByTestId('add-golfclub-button');

    fireEvent.change(nameInput, { target: { value: 'Test golfclub' } });
    fireEvent.change(typeSelect, { target: { value: 'Driver' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test golfclub',
      type: 'Driver',
    });
  });
});
