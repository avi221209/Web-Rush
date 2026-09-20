import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ArchiveProvider } from '../context/ArchiveContext';
import { OverviewView } from '../components/views/OverviewView';
import { OverviewMetricsGrid } from '../components/views/overview/OverviewMetricsGrid';
import { HeroMomentCard } from '../components/views/overview/HeroMomentCard';
import { ALL_RECEIPTS } from '../data/receipts';

describe('OverviewView & Subcomponents', () => {
  it('renders all 6 stat cards correctly', () => {
    const mockMetrics = {
      totalTraces: 215,
      placesCount: 42,
      songsCount: 68,
      purchasesCount: 51,
      eventsCount: 19,
      chaptersCount: 6
    };

    render(<OverviewMetricsGrid metrics={mockMetrics} />);

    expect(screen.getByText('215')).toBeInTheDocument();
    expect(screen.getByText('digital traces')).toBeInTheDocument();

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('places')).toBeInTheDocument();

    expect(screen.getByText('68')).toBeInTheDocument();
    expect(screen.getByText('songs')).toBeInTheDocument();

    expect(screen.getByText('51')).toBeInTheDocument();
    expect(screen.getByText('purchases')).toBeInTheDocument();

    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('events')).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('chapters')).toBeInTheDocument();
  });

  it('hero moment card renders primary CTA and secondary link distinctly', () => {
    const onFollowThread = vi.fn();
    const onReconstructDay = vi.fn();
    const heroReceipt = ALL_RECEIPTS[0];

    render(
      <HeroMomentCard
        heroReceipt={heroReceipt}
        onFollowThread={onFollowThread}
        onReconstructDay={onReconstructDay}
      />
    );

    // Primary CTA check
    const primaryBtn = screen.getByRole('button', { name: /Reconstruct June 14 day/i });
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toHaveTextContent('Reconstruct this day');

    // Secondary link check
    const secondaryBtn = screen.getByRole('button', { name: /Follow the thread of connected receipts/i });
    expect(secondaryBtn).toBeInTheDocument();
    expect(secondaryBtn).toHaveTextContent('Follow the thread');

    // Fire clicks
    fireEvent.click(primaryBtn);
    expect(onReconstructDay).toHaveBeenCalledWith('2026-06-14');

    fireEvent.click(secondaryBtn);
    expect(onFollowThread).toHaveBeenCalledWith(heroReceipt);
  });

  it('OverviewView renders complete dashboard with both CTAs and metrics inside ArchiveProvider', () => {
    render(
      <ArchiveProvider>
        <OverviewView />
      </ArchiveProvider>
    );

    expect(screen.getByText('A life, reconstructed.')).toBeInTheDocument();
    expect(screen.getByText('ARCHIVAL SYSTEM OVERVIEW')).toBeInTheDocument();
    expect(screen.getByText('digital traces')).toBeInTheDocument();
    expect(screen.getByText('Follow the thread')).toBeInTheDocument();
    expect(screen.getByText('Reconstruct this day')).toBeInTheDocument();
  });
});
