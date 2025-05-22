import { describe, it, vi, beforeEach, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Statistics from '@/components/profile/Statistics';
import { renderWithClient } from '@/utils/test-utils';

const useStatsMock = vi.fn();
vi.mock('@/hooks/useStats', () => ({
  useStats: () => useStatsMock(),
}));

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

const mockMutate = vi.fn();
vi.mock('@/hooks/useStatsMutation', () => ({
  useStatsMutation: () => ({
    mutate: mockMutate,
  }),
}));

const mockStatsData = {
  handicap: 10,
  averageScore: 80,
  drivingAccuracy: 60,
  greensInRegulation: 55,
  puttsPerRound: 30,
};

describe('Statistics', () => {
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

  it('renders error message on fetch failure', () => {
    useStatsMock.mockReturnValue({
      isPednding: false,
      error: new Error('Failed to fetch stats'),
      data: mockStatsData,
    });

    renderWithClient(<Statistics userId="1" />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders loading state', () => {
    useStatsMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });

    renderWithClient(<Statistics userId="1" />);
    const loadingSkeleton = screen.getAllByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeDefined();
  });

  it('renders statistics data', () => {
    useStatsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockStatsData,
    });

    renderWithClient(<Statistics userId="1" />);
    const statsElement = screen.getByTestId('statistics');
    expect(statsElement).toBeDefined();
    screen.getByText('Handicap');

    const handicapValue = screen.getByText(mockStatsData.handicap.toString());

    const handicapLabel = screen.getByText('Handicap');
    expect(handicapLabel.parentElement).toBe(handicapValue.parentElement);
  });

  it('toggles edit mode and updates stats', () => {
    useStatsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockStatsData,
    });

    renderWithClient(<Statistics />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeDefined();

    fireEvent.click(editButton);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeDefined();

    const newValues = {
      handicap: 12,
      averageScore: 85,
      drivingAccuracy: 65,
      greensInRegulation: 60,
      puttsPerRound: 28,
    };

    Object.keys(newValues).forEach((key) => {
      const inputField = screen.getByDisplayValue(
        mockStatsData[key as keyof typeof mockStatsData],
      );
      fireEvent.change(inputField, {
        target: { value: newValues[key as keyof typeof newValues] },
      });
    });

    fireEvent.click(doneButton);

    const updatedInputField = screen.getByText('12');
    expect(updatedInputField).toBeDefined();

    expect(mockMutate).toHaveBeenCalledWith({
      handicap: newValues.handicap,
      averageScore: newValues.averageScore,
      drivingAccuracy: newValues.drivingAccuracy,
      greensInRegulation: newValues.greensInRegulation,
      puttsPerRound: newValues.puttsPerRound,
    });
  });
});
