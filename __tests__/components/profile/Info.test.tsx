import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Info from '@/components/profile/Info';

const useInfoMock = vi.fn();
vi.mock('@/hooks/useInfo', () => ({
  useInfo: () => useInfoMock(),
}));

vi.mock('@/hooks/useActivityMutation', () => ({
  useActivityMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isError: false,
    isSuccess: false,
  })),
}));

describe('Info', () => {
  it('renders loading state', () => {
    useInfoMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });
    render(<Info userId="123" />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders error state', () => {
    useInfoMock.mockReturnValue({
      isPending: false,
      error: new Error('Failed to load user info'),
      data: null,
    });
    render(<Info userId="123" />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('When userId is provided renders user information', () => {
    useInfoMock.mockReturnValue({
      isPending: false,
      error: null,
      data: {
        name: 'John Doe',
        image: 'https://example.com/image.jpg',
        createdAt: '2023-01-01T00:00:00Z',
      },
    });

    render(<Info userId="123" />);
    const nameElement = screen.getByText('John Doe');
    const imageElement = screen.getByAltText('User Image');
    const daysSinceElement = screen.getByText(/Member for \d+ days/);

    expect(nameElement).toBeDefined();
    expect(imageElement).toBeDefined();
    expect(daysSinceElement).toBeDefined();
  });

  it('Days since is calculated correctly', () => {
    const { getByText } = render(<Info userId="123" />);
    const daysSinceElement = getByText(/Member for \d+ days/);
    const daysSinceValue = parseInt(
      daysSinceElement.textContent?.match(/\d+/)?.[0] || '0',
      10,
    );
    const today = new Date();
    const createdDate = new Date('2023-01-01T00:00:00Z');
    const expectedDaysDiff = Math.floor(
      (today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24),
    );

    expect(daysSinceValue).toBe(expectedDaysDiff);
  });
});
