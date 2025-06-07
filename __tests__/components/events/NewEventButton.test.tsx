import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import NewEventButton from '@/components/events/NewEventButton';

describe('NewEventButton', () => {
  const mockHandleNewEventButtonClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <NewEventButton
        handleNewEventButtonClick={mockHandleNewEventButtonClick}
      />,
    );
  });

  it('renders the button', () => {
    const button = screen.getByTestId('add-event-button');
    expect(button).toBeDefined();
  });

  it('calls handleNewEventButtonClick when clicked', () => {
    const button = screen.getByTestId('add-event-button');
    fireEvent.click(button);
    expect(mockHandleNewEventButtonClick).toHaveBeenCalledTimes(1);
  });
});
