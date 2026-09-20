/**
 * Tests for the Header navigation component.
 * Verifies rendering, ARIA attributes, and navigation behavior.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

const baseProps = {
  activeTab: 'overview' as const,
  setActiveTab: vi.fn(),
  onOpenSearch: vi.fn(),
  onOpenSettings: vi.fn(),
};

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders primary navigation with aria-label', () => {
    render(<Header {...baseProps} />);
    const nav = screen.getByRole('navigation', { name: /Primary navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders all primary nav items', () => {
    render(<Header {...baseProps} />);
    expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Receipts').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chapters').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Story').length).toBeGreaterThan(0);
  });

  it('marks the active page with aria-current="page"', () => {
    render(<Header {...baseProps} activeTab="receipts" />);
    const activeButtons = screen.getAllByRole('button', { name: 'Receipts' });
    const hasAriaCurrentPage = activeButtons.some(
      btn => btn.getAttribute('aria-current') === 'page'
    );
    expect(hasAriaCurrentPage).toBe(true);
  });

  it('calls setActiveTab when a nav item is clicked', () => {
    const setActiveTab = vi.fn();
    render(<Header {...baseProps} setActiveTab={setActiveTab} />);
    // Click Chapters button (first occurrence is the desktop nav)
    const chaptersButtons = screen.getAllByText('Chapters');
    fireEvent.click(chaptersButtons[0]);
    expect(setActiveTab).toHaveBeenCalledWith('chapters');
  });

  it('Analyze button has aria-expanded attribute', () => {
    render(<Header {...baseProps} />);
    const analyzeBtn = screen.getByRole('button', { name: /Analyze tools menu/i });
    expect(analyzeBtn).toHaveAttribute('aria-expanded');
  });

  it('Analyze dropdown opens and shows submenu on click', () => {
    render(<Header {...baseProps} />);
    const analyzeBtn = screen.getByRole('button', { name: /Analyze tools menu/i });
    fireEvent.click(analyzeBtn);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Connection Map')).toBeInTheDocument();
    expect(screen.getByText('Patterns & Rituals')).toBeInTheDocument();
    expect(screen.getByText('Compare Periods')).toBeInTheDocument();
  });

  it('search button has aria-label', () => {
    render(<Header {...baseProps} />);
    const searchBtn = screen.getByRole('button', { name: /Open search/i });
    expect(searchBtn).toBeInTheDocument();
  });

  it('settings button has aria-label', () => {
    render(<Header {...baseProps} />);
    const settingsBtn = screen.getByRole('button', { name: /Archive settings/i });
    expect(settingsBtn).toBeInTheDocument();
  });

  it('intro film button is shown when onReopenIntro is provided', () => {
    const onReopenIntro = vi.fn();
    render(<Header {...baseProps} onReopenIntro={onReopenIntro} />);
    const filmBtn = screen.getByRole('button', { name: /Replay intro film/i });
    expect(filmBtn).toBeInTheDocument();
  });

  it('mobile navigation renders with aria-label', () => {
    render(<Header {...baseProps} />);
    const mobileNav = screen.getByRole('navigation', { name: /Mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();
  });

  it('calls onOpenSearch when search button clicked', () => {
    const onOpenSearch = vi.fn();
    render(<Header {...baseProps} onOpenSearch={onOpenSearch} />);
    const searchBtn = screen.getByRole('button', { name: /Open search/i });
    fireEvent.click(searchBtn);
    expect(onOpenSearch).toHaveBeenCalledTimes(1);
  });
});
