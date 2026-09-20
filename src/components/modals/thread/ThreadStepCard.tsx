import React, { memo } from 'react';
import { Calendar, MapPin, Sparkles, User } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import { formatReceiptDate } from '../../../utils/dateUtils';
import type { ThreadStep } from '../../../utils/threadChain';
import type { LifeReceipt } from '../../../types/receipt';

interface ThreadStepCardProps {
  step: ThreadStep;
  stepNumber: number;
  totalSteps: number;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ThreadStepCard: React.FC<ThreadStepCardProps> = memo(({
  step,
  stepNumber,
  totalSteps,
  onSelectReceipt
}) => {
  const categoryInfo = getCategoryInfo(step.receipt.category);
  const Icon = categoryInfo.icon;
  const formattedDate = formatReceiptDate(step.receipt.timestamp);

  return (
    <div className="bg-[#EFEAE0]/60 border border-[#E2DDD3] rounded-2xl p-6 space-y-6">
      {/* Category & Step Number Badge */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${categoryInfo.badgeBg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{categoryInfo.label.toUpperCase()}</span>
        </span>
        <span className="text-xs font-mono text-[#77736C]">
          Trace {stepNumber} of {totalSteps}
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="space-y-2">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] leading-tight">
          {step.receipt.title}
        </h3>
        {step.receipt.description && (
          <p className="text-sm text-[#77736C] font-sans leading-relaxed">
            {step.receipt.description}
          </p>
        )}
      </div>

      {/* Connection Reason Box */}
      <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl p-4 space-y-1.5 font-mono text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-[#059669]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NARRATIVE CONNECTION:</span>
        </div>
        <p className="text-[#171717] font-semibold">{step.reason}</p>
      </div>

      {/* Key Metadata Row */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#77736C] pt-2 border-t border-[#E2DDD3]/60">
        <span className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#171717]" />
          <span>{formattedDate}</span>
        </span>
        {step.receipt.location && (
          <span className="flex items-center space-x-1.5 text-[#2563EB]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{step.receipt.location.name}</span>
          </span>
        )}
        {step.receipt.artist && (
          <span className="flex items-center space-x-1.5 text-[#7C3AED]">
            <User className="w-3.5 h-3.5" />
            <span>{step.receipt.artist}</span>
          </span>
        )}
      </div>

      {/* Inspect Trace Button */}
      <div className="pt-2">
        <button
          onClick={() => onSelectReceipt(step.receipt)}
          className="text-xs font-mono text-[#2563EB] hover:underline flex items-center space-x-1"
        >
          <span>Inspect full trace data &rarr;</span>
        </button>
      </div>
    </div>
  );
});

ThreadStepCard.displayName = 'ThreadStepCard';
