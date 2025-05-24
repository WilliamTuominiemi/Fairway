import { describe, it, vi, beforeEach, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithClient } from '@/utils/test-utils';

import GolfclubInBag from '@/components/profile/golfbag/GolfclubInBag';

interface GolfclubProps {
  id: string;
  type: string;
  name: string;
  myprofile?: boolean;
}

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

const mockMutate = vi.fn();
vi.mock('@/hooks/useGolfclubMutation', () => ({
  useUpdateGolfClubMutation: () => ({
    mutate: mockMutate,
  }),
}));

const mockGolfclubDatas: GolfclubProps[] = [
  {
    id: '1',
    type: 'Driver',
    name: 'TaylorMade SIM2',
    myprofile: true,
  },
  {
    id: '2',
    type: 'Iron',
    name: 'Callaway Apex',
    myprofile: false,
  },
];

const mockUpdateGolfclubData: GolfclubProps = {
  id: '1',
  type: 'Driver',
  name: 'TaylorMade SIM2 Updated',
  myprofile: true,
};

describe('GolfclubInBag', () => {
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

  it('renders the GolfclubInBag component', () => {
    renderWithClient(<GolfclubInBag {...mockGolfclubDatas[0]} />);
    const golfclubElement = screen.getByTestId('golfclub-in-bag');
    expect(golfclubElement).toBeDefined();

    const nameElement = screen.getByText(mockGolfclubDatas[0].name);
    expect(nameElement).toBeDefined();
    const typeElement = screen.getByText(mockGolfclubDatas[0].type);
    expect(typeElement).toBeDefined();
  });

  it('toggles edit mode and updates golf club on form submission', () => {
    renderWithClient(
      <GolfclubInBag {...mockGolfclubDatas[0]} myprofile={true} />,
    );
    const golfclubElement = screen.getByTestId('golfclub-in-bag');
    expect(golfclubElement).toBeDefined();

    const editButton = screen.getByText('Edit');
    expect(editButton).toBeDefined();

    fireEvent.click(editButton);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeDefined();

    const typeSelect = screen.getByTestId('type-select');
    expect(typeSelect).toBeDefined();

    fireEvent.change(typeSelect, {
      target: { value: mockUpdateGolfclubData.type },
    });
    const nameInput = screen.getByTestId('name-input');
    expect(nameInput).toBeDefined();
    fireEvent.change(nameInput, {
      target: { value: mockUpdateGolfclubData.name },
    });

    fireEvent.click(doneButton);
    expect(mockMutate).toHaveBeenCalledWith({
      id: mockUpdateGolfclubData.id,
      data: {
        type: mockUpdateGolfclubData.type,
        name: mockUpdateGolfclubData.name,
      },
    });

    const nameElement = screen.getByText(mockUpdateGolfclubData.name);
    expect(nameElement).toBeDefined();
    const typeElement = screen.getByText(mockUpdateGolfclubData.type);
    expect(typeElement).toBeDefined();
  });

  it('does not allow editing if myprofile is false', () => {
    renderWithClient(<GolfclubInBag {...mockGolfclubDatas[1]} />);
    const golfclubElement = screen.getByTestId('golfclub-in-bag');
    expect(golfclubElement).toBeDefined();

    const editButton = screen.queryByText('Edit');
    expect(editButton).toBeNull();
  });
});
