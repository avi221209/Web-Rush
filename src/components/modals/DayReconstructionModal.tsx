import React from 'react';
import { X, Calendar, Clock, ArrowRight, Sparkles, MapPin } from 'lucide-react';

import { getCategoryInfo } from '../../utils/categoryUtils';
import { reconstructDay } from '../../engine/receiptEngine';
import { useArchive } from '../../hooks/useArchive';
import { useKeyDown } from '../../hooks/useKeyDown';
import type { LifeReceipt } from '../../types/receipt';

interface DayReconstructionModalProps {
  dateStr: string | null;
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const DayReconstructionModal: React.FC<DayReconstructionModalProps> = ({
  dateStr,
  onClose,
  onSelectReceipt
}) => {
  const { receipts: archiveReceipts } = useArchive();

  // Close on Escape
  useKeyDown('Escape', onClose, Boolean(dateStr));

  if (!dateStr) return null;

  const { receipts, timeGaps, narrative } = reconstructDay(dateStr, archiveReceipts);
  if (receipts.length === 0) return null;

  const firstDate = new Date(receipts[0].timestamp);
  const displayDate = firstDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="day-modal-title"
        className="w-full max-w-2xl bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E2DDD3] bg-[#EFEAE0]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F4EE] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#F7F4EE]" />
            </div>
            <div>
              <h2 id="day-modal-title" className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                DAY RECONSTRUCTION VIEW
              </h2>
              <p className="text-xs text-[#77736C]">{displayDate} &bull; {receipts.length} traces</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close day reconstruction"
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Narrative Summary Header */}
        <div className="p-6 bg-[#EFEAE0]/40 border-b border-[#E2DDD3] space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#059669]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAY SYNTHESIS</span>
          </div>
          <p className="font-serif italic text-lg text-[#171717]">
            “{narrative}”
          </p>
        </div>

        {/* Chronological Day Timeline */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {receipts.map((rcpt, idx) => {
            const catInfo = getCategoryInfo(rcpt.category);
            const Icon = catInfo.icon;
            const timeStr = new Date(rcpt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const gap = timeGaps[idx];

            return (
              <React.Fragment key={rcpt.id}>
                {/* Timeline Item */}
                <div
                  onClick={() => {
                    onSelectReceipt(rcpt);
                    onClose();
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectReceipt(rcpt); onClose(); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View receipt: ${rcpt.title}`}
                  className="p-4 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-all cursor-pointer flex items-start justify-between space-x-4 group shadow-sm"
                >
                  <div className="flex items-start space-x-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-[#77736C] pt-1">
                      {timeStr}
                    </span>

                    <span className={`p-1.5 rounded-md ${catInfo.badgeBg} flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </span>

                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-[#171717] group-hover:underline">
                        {rcpt.title}
                      </div>

                      {rcpt.description && (
                        <div className="text-[11px] text-[#77736C] line-clamp-1">
                          {rcpt.description}
                        </div>
                      )}

                      {rcpt.location && (
                        <div className="text-[11px] text-[#2563EB] font-mono flex items-center space-x-1 pt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{rcpt.location.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#171717] group-hover:translate-x-0.5 transition-transform flex-shrink-0 self-center" />
                </div>

                {/* Time Gap Indicator */}
                {gap !== undefined && (
                  <div className="flex items-center justify-center py-1">
                    <div className="px-3 py-1 rounded-full bg-[#EFEAE0] border border-[#E2DDD3] text-[10px] font-mono text-[#77736C] flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>&darr; ({gap} min gap)</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
