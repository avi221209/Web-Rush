import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { AnalyzeDropdown } from '../components/layout/AnalyzeDropdown';

describe('AnalyzeDropdown', () => {
  it('opens and closes via mouse click', () => {
    const onSelectTab = vi.fn();
    render(<AnalyzeDropdown activeTab="overview" onSelectTab={onSelectTab} />);

    const trigger = screen.getByRole('button', { name: /Analyze tools menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Connection Map')).toBeInTheDocument();
    expect(screen.getByText('Patterns & Rituals')).toBeInTheDocument();
    expect(screen.getByText('Compare Periods')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens and selects an option, calling onSelectTab', () => {
    const onSelectTab = vi.fn();
    render(<AnalyzeDropdown activeTab="overview" onSelectTab={onSelectTab} />);

    const trigger = screen.getByRole('button', { name: /Analyze tools menu/i });
    fireEvent.click(trigger);

    const mapItem = screen.getByRole('menuitem', { name: /Connection Map/i });
    fireEvent.click(mapItem);

    expect(onSelectTab).toHaveBeenCalledWith('connections');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes via Escape keyboard key', () => {
    const onSelectTab = vi.fn();
    render(<AnalyzeDropdown activeTab="overview" onSelectTab={onSelectTab} />);

    const trigger = screen.getByRole('button', { name: /Analyze tools menu/i });

    // Open via click
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
