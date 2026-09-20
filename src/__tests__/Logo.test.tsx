/**
 * Tests for the Logo brand component.
 * Verifies rendering, accessibility, and variant behavior.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Logo } from '../components/brand/Logo';

describe('Logo component', () => {
  it('renders without crashing', () => {
    render(<Logo />);
    // Brand text must be present
    expect(screen.getByText('LIFE')).toBeInTheDocument();
  });

  it('renders the RECEIPTS brand word', () => {
    render(<Logo />);
    expect(screen.getByText('RECEIPTS')).toBeInTheDocument();
  });

  it('renders as a button when onClick is provided with aria-label', () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /LIFE\/\/RECEIPTS/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders static (no button role) without onClick', () => {
    render(<Logo />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('compact variant still renders brand mark SVG', () => {
    const { container } = render(<Logo variant="compact" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('dark theme applies dark text color class', () => {
    const { container } = render(<Logo theme="dark" />);
    // Should contain dark theme text class
    const textEl = container.querySelector('.text-\\[\\#F7F4EE\\]');
    expect(textEl).not.toBeNull();
  });
});
