import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithClient } from '@/utils/test-utils';

import Participants from '@/components/events/Participants';
import { User } from '@/types/index';

const useParticipantsMock = vi.fn();
vi.mock('@/hooks/useParticipants', () => ({
  useParticipants: () => useParticipantsMock(),
}));

const mockMutate = vi.fn();
vi.mock('@/hooks/useJoinMutation', () => ({
  useJoinMutation: () => ({
    mutate: mockMutate,
  }),
}));

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

const mockParticipants: User[] = [
  {
    id: '1',
    name: 'John Doe',
    image: '/images/john-doe.jpg',
    email: 'john.doe@test.com',
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: '/images/jane-smith.jpg',
    email: 'jane.smith@test.com',
  },
];

describe('Participants', () => {
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

  it('renders loading state', () => {
    useParticipantsMock.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    });

    renderWithClient(<Participants maxParticipants={10} eventId="1" />);

    const loadingElement = screen.getAllByTestId('loading-skeleton');
    expect(loadingElement).toBeDefined();
  });

  it('renders error message', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: new Error('Failed to load participants'),
      data: null,
    });
    renderWithClient(<Participants maxParticipants={10} eventId="1" />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('renders participants component', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={10} eventId="1" />);

    const participantsElement = screen.getByTestId('participants');
    expect(participantsElement).toBeDefined();
  });

  it('displays participants', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={10} eventId="1" />);

    mockParticipants.forEach((participant) => {
      const participantImage = screen.getByTestId(
        `participant-${participant.id}`,
      );
      expect(participantImage).toBeDefined();
    });
  });

  it('shows empty participant slots when spots are left', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={5} eventId="1" />);

    const emptyParticipant = screen.getAllByTestId('empty-participant');
    expect(emptyParticipant.length).toBe(3); // 5 max - 2 participants = 3 empty slots
  });

  it('shows add participant button when authenticated', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={5} eventId="1" />);

    const addButton = screen.getByTestId('add-participant-button');
    expect(addButton).toBeDefined();
  });

  it('does not show add participant button when not authenticated', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={5} eventId="1" />);

    const addButton = screen.queryByTestId('add-participant-button');
    expect(addButton).toBeNull();
  });

  it('calls mutate when add participant button is clicked', () => {
    useParticipantsMock.mockReturnValue({
      isPending: false,
      error: null,
      data: mockParticipants,
    });

    renderWithClient(<Participants maxParticipants={5} eventId="1" />);

    const addButton = screen.getByTestId('add-participant-button');
    fireEvent.click(addButton);

    expect(mockMutate).toHaveBeenCalled();
  });
});
