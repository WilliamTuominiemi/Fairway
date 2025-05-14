import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Square from '@/components/calendar/Square';

import { Activity } from '@/types/index';

const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'Simulator',
    details: 'test',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    type: 'Range',
    details: 'test',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    type: 'Minigolf',
    details: 'test',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('Square Component', () => {
  it('renders with default props', () => {
    render(<Square />);
    const squareElement = screen.getByTestId('square');
    expect(squareElement).toBeDefined();
    expect(squareElement.className).toContain('bg-red-50');
  });

  it('renders with one activity', () => {
    render(<Square activities={[mockActivities[0]]} />);
    const squareElement = screen.getByTitle('Simulator');
    expect(squareElement).toBeDefined();
    expect(squareElement.className).toContain('bg-emerald-300');
  });

  it('renders with two activities', () => {
    render(<Square activities={mockActivities.slice(0, 2)} />);
    const squareElement = screen.getByTitle('Simulator, Range');
    expect(squareElement).toBeDefined();
    expect(squareElement.className).toContain('bg-emerald-600');
  });

  it('renders with more than two activities', () => {
    render(<Square activities={mockActivities} />);
    const squareElement = screen.getByTitle('Simulator, Range, Minigolf');
    expect(squareElement).toBeDefined();
    expect(squareElement.className).toContain('bg-emerald-900');
  });

  it('renders with isFeed prop', () => {
    render(<Square isFeed activities={mockActivities} />);
    const squareElement = screen.getByTitle('Simulator, Range, Minigolf');
    expect(squareElement).toBeDefined();
    expect(squareElement.className).toContain('h-5 w-5 md:h-7 md:w-7');
  });
});
