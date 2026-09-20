import React, { useMemo } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { useKeyDown } from '../../hooks/useKeyDown';
import { getCategoryInfo } from '../../utils/categoryUtils';
import { getConnectionsForReceipt } from '../../engine/receiptEngine';
import { DrawerMetadataGrid } from './receipt-drawer/DrawerMetadataGrid';
import { DrawerConnectedTraces } from './receipt-drawer/DrawerConnectedTraces';

import type { LifeReceipt } from '../../types/receipt';

export interface ReceiptDetailDrawerProps {
  receipt: LifeReceipt | null;
  onClose: () => void;
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onFollowThread?: (receipt: LifeReceipt) => void;
  onReconstructDay?: (dateStr: string) => void;
}

export const ReceiptDetailDrawer: React.FC<ReceiptDetailDrawerProps> = ({
  receipt,
  onClose,
  onSelectReceipt,
  onFollowThread,
  onReconstructDay
}) => {
  const { receipts } = useArchive();

  // Close on Escape key
  useKeyDown('Escape', onClose, Boolean(receipt));

  const connectedList = useMemo(() => {
    if (!receipt) return [];
    return getConnectionsForReceipt(receipt.id, receipts, 0.28).slice(0, 5);
  }, [receipt, receipts]);

  if (!receipt) return null;

  const categoryInfo = getCategoryInfo(receipt.category);
  const Icon = categoryInfo.icon;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#171717]/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-drawer-title"
        className="w-full max-w-xl bg-[#F7F4EE] border-l border-[#E2DDD3] shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2DDD3] bg-[#EFEAE0]/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${categoryInfo.badgeBg}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{categoryInfo.label.toUpperCase()}</span>
            </span>
            <span className="text-xs font-mono text-[#77736C]">
              ID: {receipt.id}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close receipt details"
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Description */}
          <div className="space-y-3">
            <h2 id="receipt-drawer-title" className="font-serif text-2xl font-bold text-[#171717] leading-tight">
              {receipt.title}
            </h2>
            {receipt.description && (
              <p className="text-sm text-[#77736C] font-sans leading-relaxed">
                {receipt.description}
              </p>
            )}
          </div>

          {/* Key Attributes Grid */}
          <DrawerMetadataGrid
            receipt={receipt}
            onReconstructDay={dateStr => onReconstructDay?.(dateStr)}
            onClose={onClose}
          />

          {/* Hero Action: Follow The Thread */}
          <div className="pt-2">
            <button
              onClick={() => onFollowThread?.(receipt)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] transition-all group shadow-md"
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#F7F4EE]/10 flex items-center justify-center text-[#F7F4EE]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-wide">Follow this thread &rarr;</div>
                  <div className="text-xs text-[#EFEAE0]/80">Trace how this single receipt leads to a larger story</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Connected Receipts Section */}
          <DrawerConnectedTraces
            connectedList={connectedList}
            onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
          />
        </div>
      </div>
    </div>
  );
};
