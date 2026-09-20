import React, { useState, useMemo } from 'react';
import { X, ArrowRight, ArrowLeft, GitCommit, Sparkles } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { useKeyDown } from '../../hooks/useKeyDown';
import { buildThreadChain } from '../../utils/threadChain';
import { ThreadStepCard } from './thread/ThreadStepCard';

import type { LifeReceipt } from '../../types/receipt';

export interface ThreadJourneyModalProps {
  initialReceipt: LifeReceipt | null;
  onClose: () => void;
  onSelectReceipt?: (receipt: LifeReceipt) => void;
}

export const ThreadJourneyModal: React.FC<ThreadJourneyModalProps> = ({
  initialReceipt,
  onClose,
  onSelectReceipt
}) => {
  const { receipts } = useArchive();
  const [activeIndex, setActiveIndex] = useState(0);

  // Close on Escape
  useKeyDown('Escape', onClose, Boolean(initialReceipt));

  // Pure thread chain calculation
  const chain = useMemo(() => {
    return buildThreadChain(initialReceipt, receipts, 5);
  }, [initialReceipt, receipts]);

  if (!initialReceipt || chain.length === 0) return null;

  const activeStep = chain[activeIndex] || chain[0];
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
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Step Progress Timeline Indicator */}
        <div className="bg-[#EFEAE0]/30 px-6 py-3 border-b border-[#E2DDD3] flex items-center justify-between overflow-x-auto">
          {chain.map((_step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                idx === activeIndex
                  ? 'bg-[#171717] text-[#F7F4EE]'
                  : idx < activeIndex
                  ? 'text-[#059669] hover:bg-[#EFEAE0]'
                  : 'text-[#77736C] hover:bg-[#EFEAE0]'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Step 0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <ThreadStepCard
            step={activeStep}
            stepNumber={activeIndex + 1}
            totalSteps={chain.length}
            onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
          />

          {/* Stepper Navigation Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                activeIndex === 0
                  ? 'opacity-30 border-[#E2DDD3] cursor-not-allowed text-[#77736C]'
                  : 'border-[#E2DDD3] hover:border-[#171717] text-[#171717] hover:bg-[#EFEAE0]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {isFinished ? (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#059669] text-white hover:bg-[#047857] text-xs font-mono font-bold transition-all shadow-sm"
              >
                Journey Complete &bull; Close
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <span>Next Connected Trace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
