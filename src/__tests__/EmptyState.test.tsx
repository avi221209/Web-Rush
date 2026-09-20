import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ArchiveProvider } from '../context/ArchiveContext';
import { ExplorerView } from '../components/views/ExplorerView';
import { EmptyArchiveState } from '../components/views/explorer/EmptyArchiveState';

describe('Empty State & Archive Restoration', () => {
  it('EmptyArchiveState renders description and restore button', () => {
    render(<EmptyArchiveState onResetSampleData={() => {}} />);

    expect(screen.getByText('The archive is currently empty.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Load Sample Archive/i })).toBeInTheDocument();
  });

  it('renders empty state and restores full sample archive when clicked', async () => {
    render(
      <ArchiveProvider initialReceipts={[]}>
        <ExplorerView />
      </ArchiveProvider>
    );

    // Verify empty state is rendered
    expect(screen.getByText('The archive is currently empty.')).toBeInTheDocument();
    const restoreBtn = screen.getByRole('button', { name: /Load Sample Archive/i });
    expect(restoreBtn).toBeInTheDocument();

    // Click "Load Sample Archive"
    fireEvent.click(restoreBtn);

    // Verify empty state is gone and receipts are restored
    expect(screen.queryByText('The archive is currently empty.')).not.toBeInTheDocument();
    expect(screen.getByText(/Showing \d+ matching receipts/i)).toBeInTheDocument();
  });
});
