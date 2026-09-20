import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, GitCommit, Sparkles } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { getConnectionsForReceipt, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { LifeReceipt } from '../../types/receipt';

interface ThreadJourneyModalProps {
  initialReceipt: LifeReceipt | null;
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ThreadJourneyModal: React.FC<ThreadJourneyModalProps> = ({
  initialReceipt,
  onClose,
  onSelectReceipt
}) => {
  if (!initialReceipt) return null;

  // Close on Escape
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Build a 5-step narrative chain starting from initialReceipt
  const chain: { receipt: LifeReceipt; reason: string }[] = [];
  const visited = new Set<string>();

  let current = initialReceipt;
  chain.push({ receipt: current, reason: 'Initial Anchor Trace' });
  visited.add(current.id);

  for (let i = 0; i < 4; i++) {
    const conns = getConnectionsForReceipt(current.id, GLOBAL_RECEIPTS, 0.25)
      .filter(c => !visited.has(c.receipt.id));

    if (conns.length > 0) {
      const nextItem = conns[0];
      visited.add(nextItem.receipt.id);
      chain.push({
        receipt: nextItem.receipt,
        reason: nextItem.connection.reasons[0] || 'Strong temporal proximity'
      });
      current = nextItem.receipt;
    } else {
      break;
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = chain[activeIndex];
  const isFinished = activeIndex === chain.length - 1;

  const handleNext = () => {
    if (activeIndex < chain.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const activeCategory = getCategoryInfo(activeStep.receipt.category);
  const ActiveIcon = activeCategory.icon;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="thread-modal-title"
        className="w-full max-w-3xl bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 border-b border-[#E2DDD3] bg-[#EFEAE0]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F4EE] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#F7F4EE]" />
            </div>
            <div>
              <h2 id="thread-modal-title" className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                FOLLOW THE THREAD
              </h2>
              <p className="text-xs text-[#77736C]">
                Step {activeIndex + 1} of {chain.length} &bull; Interactive narrative trace journey
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close thread journey"
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Chain Progress Bar */}
        <div className="px-6 py-4 bg-[#EFEAE0]/40 border-b border-[#E2DDD3]">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E2DDD3] -translate-y-1/2 z-0" />

            {chain.map((step, idx) => {
              const isPast = idx < activeIndex;
              const isCurrent = idx === activeIndex;
              const stepCat = getCategoryInfo(step.receipt.category);
              const StepIcon = stepCat.icon;

              return (
                <button
                  key={step.receipt.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Step ${idx + 1}: ${step.receipt.title}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`relative z-10 flex flex-col items-center group`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#171717] text-[#F7F4EE] ring-4 ring-[#171717]/20 scale-110'
                        : isPast
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3]'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono mt-1 text-[#77736C] hidden sm:inline">
                    {stepCat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Transition Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFEAE0] border border-[#E2DDD3] text-xs font-mono text-[#171717]">
            <GitCommit className="w-3.5 h-3.5 text-[#77736C]" />
            <span>Connection Logic: {activeStep.reason}</span>
          </div>

          {/* Step Detail Card */}
          <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold border ${activeCategory.badgeBg}`}>
                <ActiveIcon className="w-4 h-4" />
                <span>{activeCategory.label.toUpperCase()}</span>
              </span>
              <span className="text-xs font-mono text-[#77736C]">
                {new Date(activeStep.receipt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h4 className="font-serif text-2xl font-bold text-[#171717]">
              {activeStep.receipt.title}
            </h4>

            {activeStep.receipt.description && (
              <p className="text-sm text-[#77736C] leading-relaxed">
                {activeStep.receipt.description}
              </p>
            )}

            {activeStep.receipt.location && (
              <div className="text-xs font-mono text-[#2563EB] bg-blue-50/60 p-2.5 rounded border border-blue-200/60">
                📍 Location: {activeStep.receipt.location.name} ({activeStep.receipt.location.city})
              </div>
            )}
          </div>

          {/* Conclusion Banner if finished */}
          {isFinished && (
            <div className="p-6 rounded-xl bg-[#171717] text-[#F7F4EE] space-y-2 animate-in zoom-in-95 duration-300">
              <h5 className="font-serif italic text-xl font-bold text-[#F7F4EE]">
                “One single trace led to an entire story.”
              </h5>
              <p className="text-xs text-[#EFEAE0]/80 font-sans">
                By following timestamps, locations, and category synergies across {chain.length} individual digital receipts, isolated fragments reveal a coherent human moment.
              </p>
            </div>
          )}
        </div>

        {/* Modal Controls */}
        <div className="p-4 border-t border-[#E2DDD3] bg-[#EFEAE0]/50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeIndex === 0
                ? 'opacity-40 cursor-not-allowed text-[#77736C]'
                : 'bg-[#F7F4EE] text-[#171717] border border-[#E2DDD3] hover:bg-[#E2DDD3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {!isFinished ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#171717] text-[#F7F4EE] hover:bg-[#333] transition-all"
            >
              <span>Next Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onSelectReceipt(activeStep.receipt);
                onClose();
              }}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#059669] text-white hover:bg-[#047857] transition-all"
            >
              <span>View Full Receipt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
