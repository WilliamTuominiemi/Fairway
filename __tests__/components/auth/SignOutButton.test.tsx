import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignOutButton from '@/components/auth/SignOutButton';

const mockSignOut = vi.hoisted(() => vi.fn());

vi.mock('next-auth/react', () => ({
  signOut: mockSignOut,
}));

describe('SignOutButton', () => {
  it('renders SignOutButton', () => {
    render(<SignOutButton />);

    expect(screen.getByTestId('sign-out-button')).toBeDefined();
  });

  it('renders SignOutButton with correct text', () => {
    render(<SignOutButton />);

    expect(screen.getByText('Sign out')).toBeDefined();
  });

  it('calls signOut function on click', async () => {
    render(<SignOutButton />);

    const button = screen.getByTestId('sign-out-button');
    button.click();

    expect(mockSignOut).toHaveBeenCalled();
  });
});
