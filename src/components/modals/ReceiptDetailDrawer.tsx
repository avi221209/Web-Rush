import React from 'react';
import { X, MapPin, Calendar, Tag, ArrowRight, GitFork, Sparkles, Clock, User, Link, ShieldCheck } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { getConnectionsForReceipt, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { LifeReceipt } from '../../types/receipt';

interface ReceiptDetailDrawerProps {
  receipt: LifeReceipt | null;
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onFollowThread: (receipt: LifeReceipt) => void;
  onReconstructDay: (dateStr: string) => void;
}

export const ReceiptDetailDrawer: React.FC<ReceiptDetailDrawerProps> = ({
  receipt,
  onClose,
  onSelectReceipt,
  onFollowThread,
  onReconstructDay
}) => {
  if (!receipt) return null;

  const categoryInfo = getCategoryInfo(receipt.category);
  const Icon = categoryInfo.icon;

  const connectedList = getConnectionsForReceipt(receipt.id, GLOBAL_RECEIPTS, 0.28).slice(0, 5);
  const dateObj = new Date(receipt.timestamp);
  const dateStr = receipt.timestamp.substring(0, 10);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getReasonIcon = (reasonText: string) => {
    if (reasonText.includes('Occurred') || reasonText.includes('Same morning') || reasonText.includes('hours') || reasonText.includes('minutes')) return Clock;
    if (reasonText.includes('location') || reasonText.includes('district') || reasonText.includes('Nearby')) return MapPin;
    if (reasonText.includes('tag')) return Tag;
    if (reasonText.includes('artist') || reasonText.includes('person') || reasonText.includes('venue')) return User;
    if (reasonText.includes('day')) return Calendar;
    return Link;
  };

  const getConfidenceBadge = (score: number) => {
    if (score >= 0.65) return { label: 'High Confidence', color: 'bg-[#059669] text-white' };
    if (score >= 0.45) return { label: 'Medium Confidence', color: 'bg-[#D97706] text-white' };
    return { label: 'Possible Link', color: 'bg-[#77736C] text-white' };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#171717]/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
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
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Description */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717] leading-tight">
              {receipt.title}
            </h2>
            {receipt.description && (
              <p className="text-sm text-[#77736C] font-sans leading-relaxed">
                {receipt.description}
              </p>
            )}
          </div>

          {/* Key Attributes Card */}
          <div className="bg-[#EFEAE0]/60 border border-[#E2DDD3] rounded-lg p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#171717]">
                <Calendar className="w-4 h-4 text-[#77736C]" />
                <span className="font-mono">{formattedDate}</span>
              </div>
              <button
                onClick={() => {
                  onReconstructDay(dateStr);
                  onClose();
                }}
                className="text-[11px] font-mono text-[#2563EB] hover:underline font-bold"
              >
                See full day &rarr;
              </button>
            </div>

            {receipt.location && (
              <div className="flex items-center space-x-2 text-[#171717]">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span className="font-semibold">{receipt.location.name}</span>
                {receipt.location.city && <span className="text-[#77736C]">({receipt.location.city})</span>}
              </div>
            )}

            {receipt.amount && (
              <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
                <span className="text-[#77736C] font-mono">Amount Paid:</span>
                <span className="font-mono font-bold text-sm text-[#D97706]">₹{receipt.amount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {receipt.artist && (
              <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
                <span className="text-[#77736C] font-mono">Artist:</span>
                <span className="font-semibold text-[#7C3AED]">{receipt.artist}</span>
              </div>
            )}

            {receipt.person && (
              <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
                <span className="text-[#77736C] font-mono">Contact / Person:</span>
                <span className="font-semibold text-[#DB2777]">{receipt.person}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {receipt.tags && receipt.tags.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#77736C] flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5" />
                <span>TAGS & CATEGORIZATION</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {receipt.tags.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#EFEAE0] text-[#171717] font-mono text-[11px] border border-[#E2DDD3]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hero Action: Follow The Thread */}
          <div className="pt-2">
            <button
              onClick={() => onFollowThread(receipt)}
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

          {/* Connected Receipts Section (Priority 2 - Human-readable reasoning cards) */}
          <div className="space-y-3 pt-4 border-t border-[#E2DDD3]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#171717] flex items-center space-x-1.5">
                <GitFork className="w-4 h-4 text-[#77736C]" />
                <span>CONNECTED TRACES ({connectedList.length})</span>
              </span>
              <span className="text-[11px] text-[#77736C] font-mono">Multi-factor relationship engine</span>
            </div>

            {connectedList.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#EFEAE0]/50 border border-[#E2DDD3] text-xs text-[#77736C] italic text-center space-y-1">
                <p className="font-serif text-sm text-[#171717]">This receipt stands alone</p>
                <p>No strong connections found above the confidence threshold for this trace.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {connectedList.map(({ receipt: connReceipt, connection }) => {
                  const connInfo = getCategoryInfo(connReceipt.category);
                  const ConnIcon = connInfo.icon;
                  const conf = getConfidenceBadge(connection.score);

                  return (
                    <div
                      key={connReceipt.id}
                      onClick={() => onSelectReceipt(connReceipt)}
                      className="p-4 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors cursor-pointer group space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`p-1 rounded ${connInfo.badgeBg}`}>
                            <ConnIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-bold text-[#171717] group-hover:underline">
                            {connReceipt.title}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${conf.color}`}>
                          {conf.label}
                        </span>
                      </div>

                      {/* Human-Readable Reasoning Box */}
                      <div className="bg-[#EFEAE0]/90 p-3 rounded-lg border border-[#E2DDD3]/80 space-y-2 font-mono text-xs">
                        <div className="font-bold text-[#171717] flex items-center space-x-1 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                          <span>WHY THESE BELONG TOGETHER</span>
                        </div>
                        <div className="space-y-1">
                          {connection.reasons.map((reasonText, idx) => {
                            const ReasonIcon = getReasonIcon(reasonText);
                            return (
                              <div key={idx} className="flex items-center space-x-2 text-[11px] text-[#171717]">
                                <ReasonIcon className="w-3.5 h-3.5 text-[#77736C] flex-shrink-0" />
                                <span>{reasonText}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
