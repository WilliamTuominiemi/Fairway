import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/components/error/ErrorMessage';

describe('Error message', () => {
  it('renders errormessage', () => {
    const errorMessage = 'This is an error message';

    render(<ErrorMessage message={errorMessage} />);

    expect(screen.getByTestId('error-message')).toBeDefined();
  });
});
