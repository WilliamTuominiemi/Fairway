import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignInButton from '@/components/auth/SignInButton';

const mockSignIn = vi.hoisted(() => vi.fn());

vi.mock('next-auth/react', () => ({
  signIn: mockSignIn,
}));

describe('SignInButton', () => {
  it('renders SignInButton', () => {
    render(<SignInButton />);

    expect(screen.getByTestId('sign-in-button')).toBeDefined();
  });

  it('renders SignInButton with correct text', () => {
    render(<SignInButton />);

    expect(screen.getByText('Sign in with Google')).toBeDefined();
  });

  it('calls signIn function on click', async () => {
    render(<SignInButton />);

    const button = screen.getByTestId('sign-in-button');
    button.click();

    expect(mockSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
  });
});
