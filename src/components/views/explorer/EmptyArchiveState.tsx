import React, { memo } from 'react';

interface EmptyArchiveStateProps {
  onResetSampleData?: () => void;
}

export const EmptyArchiveState: React.FC<EmptyArchiveStateProps> = memo(({
  onResetSampleData
}) => {
  return (
    <div
      data-testid="empty-archive-state"
      className="p-12 text-center bg-[#EFEAE0]/40 rounded-2xl border border-[#E2DDD3] space-y-4"
    >
      <p className="font-serif italic text-xl text-[#171717]">
        The archive is currently empty.
      </p>
      <p className="text-xs text-[#77736C] max-w-md mx-auto font-sans">
        No digital receipts or traces are currently stored in memory. You can reload the organizer sample archive (200+ receipts) at any time.
      </p>
      {onResetSampleData && (
        <button
          onClick={onResetSampleData}
          data-testid="load-sample-archive-btn"
          className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold transition-all shadow-sm"
        >
          Load Sample Archive
        </button>
      )}
    </div>
  );
});

EmptyArchiveState.displayName = 'EmptyArchiveState';
