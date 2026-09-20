import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ArchiveProvider } from '../context/ArchiveContext';
import { SettingsModal } from '../components/modals/SettingsModal';
import { generateArchiveExport } from '../utils/exportUtils';
import { ALL_RECEIPTS } from '../data/receipts';

describe('SettingsModal & Dataset Export', () => {
  it('generateArchiveExport produces valid JSON format', () => {
    const jsonOutput = generateArchiveExport(ALL_RECEIPTS);

    expect(typeof jsonOutput).toBe('string');
    const parsed = JSON.parse(jsonOutput);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(ALL_RECEIPTS.length);
    expect(parsed[0]).toHaveProperty('id');
    expect(parsed[0]).toHaveProperty('category');
    expect(parsed[0]).toHaveProperty('title');
    expect(parsed[0]).toHaveProperty('timestamp');
  });

  it('renders SettingsModal when open and shows metrics and buttons', () => {
    render(
      <ArchiveProvider>
        <SettingsModal isOpen={true} onClose={() => {}} />
      </ArchiveProvider>
    );

    expect(screen.getByText('ARCHIVE SETTINGS & DATA MANAGEMENT')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE DATASET METRICS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export Dataset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Restore Sample Archive/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear Archive/i })).toBeInTheDocument();
  });

  it('triggers JSON export download when Export Dataset button is clicked', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');

    render(
      <ArchiveProvider>
        <SettingsModal isOpen={true} onClose={() => {}} />
      </ArchiveProvider>
    );

    const exportBtn = screen.getByRole('button', { name: /Export Dataset/i });
    fireEvent.click(exportBtn);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    createElementSpy.mockRestore();
  });

  it('closes SettingsModal on Escape key press', () => {
    const onClose = vi.fn();
    render(
      <ArchiveProvider>
        <SettingsModal isOpen={true} onClose={onClose} />
      </ArchiveProvider>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
