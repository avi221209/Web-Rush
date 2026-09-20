import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Play, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import { GLOBAL_CHAPTERS, GLOBAL_MOMENTS, GLOBAL_PATTERNS, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';

interface DemoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'overview' | 'receipts' | 'connections' | 'patterns' | 'chapters' | 'story') => void;
}

export const DemoStoryModal: React.FC<DemoStoryModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab
}) => {
  const [step, setStep] = useState(1);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sampleReceipt = GLOBAL_RECEIPTS.find(r => r.id === 'rcpt-053') || GLOBAL_RECEIPTS[0]; // Max Richter / Izumi ramen
  const sampleMoment = GLOBAL_MOMENTS[0];
  const samplePattern = GLOBAL_PATTERNS[0];
  const sampleChapter = GLOBAL_CHAPTERS[0];

  const steps = [
    {
      num: 1,
      tab: 'receipts' as const,
      title: '1. RECEIPTS — The Raw Digital Fragments',
      subtitle: 'Starting from a single isolated receipt trace',
      content: `At 10:12 PM on June 14, a digital stream recorded listening to Max Richter's "On the Nature of Daylight". Alone, it is just a log entry.`,
      highlight: sampleReceipt.title
    },
    {
      num: 2,
      tab: 'connections' as const,
      title: '2. CONNECTIONS — Uncovering Proximity & Relationships',
      subtitle: 'Proximity scoring links 5 receipts within 90 minutes',
      content: `The connection engine calculates a 92% relationship score between the music play, a late night ramen purchase at Izumi, a photo, and a Carter Road seaside check-in.`,
      highlight: 'Music ➔ Purchase ➔ Photo ➔ Place ➔ Message'
    },
    {
      num: 3,
      tab: 'overview' as const,
      title: '3. MOMENTS — Synthesizing Clusters into Real Life Events',
      subtitle: 'Clustered traces form Moment #07',
      content: `The moment engine automatically synthesizes these 5 traces into "An Unexpectedly Long Night", complete with a narrative summary and context.`,
      highlight: sampleMoment.title
    },
    {
      num: 4,
      tab: 'patterns' as const,
      title: '4. PATTERNS — Discovering Recurring Human Behaviors',
      subtitle: 'Analyzing trends across 200+ receipts',
      content: `Analyzing months of data reveals that late night music listening peaks after 10 PM, and location check-ins pair with photos 78% of the time.`,
      highlight: samplePattern.title
    },
    {
      num: 5,
      tab: 'chapters' as const,
      title: '5. CHAPTERS — Defining Eras of a Life',
      subtitle: 'Grouping moments into life phases',
      content: `Behavioral shifts segment the dataset into 6 meaningful chapters — moving from early academic acoustics research to building a home studio.`,
      highlight: sampleChapter.title
    },
    {
      num: 6,
      tab: 'story' as const,
      title: '6. STORY — The Complete Digital Documentary',
      subtitle: 'The full transformation accomplished',
      content: `What began as isolated database records transforms into a cohesive, interactive digital story. A life reconstructed.`,
      highlight: 'From Traces to Meaning'
    }
  ];

  const currentStepData = steps[step - 1];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(prev => prev + 1);
    } else {
      // Fire celebration confetti on completion
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      onNavigateToTab('story');
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
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
        aria-labelledby="demo-modal-title"
        className="w-full max-w-2xl bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E2DDD3] bg-[#EFEAE0]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F4EE] flex items-center justify-center">
              <Play className="w-4 h-4 text-[#F7F4EE]" />
            </div>
            <div>
              <h2 id="demo-modal-title" className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                JUDGING DEMO TOUR: SHOW ME A STORY
              </h2>
              <p className="text-xs text-[#77736C]">Step {step} of {steps.length} &bull; The Core Product Transformation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close demo tour"
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFEAE0] text-xs font-mono text-[#171717]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{currentStepData.subtitle}</span>
          </div>

          <h4 className="font-serif text-2xl font-bold text-[#171717]">
            {currentStepData.title}
          </h4>

          <p className="text-sm text-[#77736C] leading-relaxed font-sans">
            {currentStepData.content}
          </p>

          <div className="p-4 rounded-xl bg-[#EFEAE0]/70 border border-[#E2DDD3] font-mono text-xs text-[#171717] font-semibold flex items-center justify-between">
            <span>Discovered Anchor:</span>
            <span className="text-[#059669] font-bold">{currentStepData.highlight}</span>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="p-4 border-t border-[#E2DDD3] bg-[#EFEAE0]/50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              step === 1
                ? 'opacity-40 cursor-not-allowed text-[#77736C]'
                : 'bg-[#F7F4EE] text-[#171717] border border-[#E2DDD3] hover:bg-[#E2DDD3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#171717] text-[#F7F4EE] hover:bg-[#333] transition-all"
          >
            <span>{step === steps.length ? 'Finish & Explore Story' : 'Next Transformation Step'}</span>
            {step === steps.length ? <CheckCircle className="w-4 h-4 text-[#059669]" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
