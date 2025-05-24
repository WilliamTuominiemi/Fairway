import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '@/components/Navbar';

vi.mock('@/components/auth/SignInButton', () => ({
  __esModule: true,
  default: () => <button data-testid="sign-in-button">Sign In</button>,
}));

vi.mock('@/components/auth/SignOutButton', () => ({
  __esModule: true,
  default: () => <button data-testid="sign-out-button">Sign Out</button>,
}));

const useSessionMock = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => useSessionMock(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'loading',
    });
    render(<Navbar />);
    const loadingElement = screen.getAllByTestId('loading-skeleton');
    expect(loadingElement).toBeDefined();
  });

  it('renders the Navbar component', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeDefined();
  });

  it('renders the SignInButton when not authenticated', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<Navbar />);
    const signInButton = screen.getByTestId('sign-in-button');
    expect(signInButton).toBeDefined();
  });

  it('renders the SignOutButton when authenticated', () => {
    useSessionMock.mockReturnValue({
      data: {
        user: {
          id: '1',
          name: 'Peter Griffin',
        },
      },
      status: 'authenticated',
    });

    render(<Navbar />);
    const signOutButton = screen.getByTestId('sign-out-button');
    expect(signOutButton).toBeDefined();
  });
});
