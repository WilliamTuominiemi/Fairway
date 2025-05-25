import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Icon from '@/components/common/svgIcon';

describe('Icon Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the icon with the correct src', () => {
    render(<Icon iconName="test-icon" />);
    const iconElement = screen.getByTestId('svgIcon');
    expect(iconElement).toBeDefined();

    expect(iconElement).toHaveProperty(
      'src',
      expect.stringContaining('inlinesvg/test-icon.svg'),
    );
  });

  it('renders the icon with default size', () => {
    render(<Icon iconName="test-icon" />);

    const iconElement = screen.getByTestId('svgIcon');
    expect(iconElement).toHaveProperty('width', 20);
    expect(iconElement).toHaveProperty('height', 20);
  });

  it('renders the icon with specified size', () => {
    render(<Icon iconName="test-icon" size={30} />);

    const iconElement = screen.getByTestId('svgIcon');
    expect(iconElement).toHaveProperty('width', 30);
    expect(iconElement).toHaveProperty('height', 30);
  });

  it('has correct alt text', () => {
    render(<Icon iconName="test-icon" />);

    const iconElement = screen.getByTestId('svgIcon');
    expect(iconElement).toHaveProperty(
      'alt',
      expect.stringContaining('test-icon'),
    );
  });
});
