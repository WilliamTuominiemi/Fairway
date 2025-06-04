import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import FeedSelector from '@/components/common/FeedSelector';

describe('FeedSelector Component', () => {
  it('renders with default props', () => {
    render(<FeedSelector activeTab="users" setActiveTab={() => {}} />);
    const feedSelectorElement = screen.getByTestId('feed-selector');
    expect(feedSelectorElement).toBeDefined();
  });

  it('changes active tab to "events" when events button is clicked', () => {
    const setActiveTabMock = vi.fn();
    render(<FeedSelector activeTab="users" setActiveTab={setActiveTabMock} />);
    const eventsButton = screen.getByText('Events');
    eventsButton.click();
    expect(setActiveTabMock).toHaveBeenCalledWith('events');
  });

  it('changes active tab to "users" when users button is clicked', () => {
    const setActiveTabMock = vi.fn();
    render(<FeedSelector activeTab="events" setActiveTab={setActiveTabMock} />);

    const usersButton = screen.getByText('Users');
    usersButton.click();

    expect(setActiveTabMock).toHaveBeenCalledWith('users');
  });
});
