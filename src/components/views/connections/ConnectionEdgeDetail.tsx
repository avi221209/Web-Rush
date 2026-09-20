import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import type { LifeReceipt, ReceiptConnection } from '../../../types/receipt';

interface ConnectionEdgeDetailProps {
  selectedEdge: ReceiptConnection;
  sourceReceipt: LifeReceipt;
  targetReceipt: LifeReceipt;
  onFollowThread: (receipt: LifeReceipt) => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onClearEdge: () => void;
}

export const ConnectionEdgeDetail: React.FC<ConnectionEdgeDetailProps> = memo(({
  selectedEdge,
  sourceReceipt,
  targetReceipt,
  onFollowThread,
  onSelectReceipt,
  onClearEdge
}) => {
  const sourceCat = getCategoryInfo(sourceReceipt.category);
  const targetCat = getCategoryInfo(targetReceipt.category);

  return (
    <div className="bg-[#171717] text-[#F7F4EE] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7F4EE]/20 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded bg-[#059669] text-white text-xs font-mono font-bold uppercase">
            {Math.round(selectedEdge.score * 100)}% Match
          </span>
          <span className="text-xs font-mono text-[#EFEAE0]/70 uppercase">
            {selectedEdge.relationshipType} connection
          </span>
        </div>

        <button
          onClick={onClearEdge}
          className="text-xs font-mono text-[#EFEAE0]/60 hover:text-white underline self-start sm:self-auto"
        >
          Close reasoning card
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Source Receipt Box */}
        <div
          onClick={() => onSelectReceipt(sourceReceipt)}
          className="p-4 rounded-xl bg-[#F7F4EE]/10 border border-[#F7F4EE]/15 space-y-2 cursor-pointer hover:bg-[#F7F4EE]/20 transition-colors"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#059669] font-bold">SOURCE TRACE</span>
            <span className="text-[#EFEAE0]/60">
              {new Date(sourceReceipt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="font-serif text-lg font-bold text-[#F7F4EE]">
            {sourceReceipt.title}
          </div>
          <div className="text-xs text-[#EFEAE0]/70 flex items-center space-x-1.5">
            <sourceCat.icon className="w-3.5 h-3.5" />
            <span>{sourceCat.label}</span>
          </div>
        </div>

        {/* Target Receipt Box */}
        <div
          onClick={() => onSelectReceipt(targetReceipt)}
          className="p-4 rounded-xl bg-[#F7F4EE]/10 border border-[#F7F4EE]/15 space-y-2 cursor-pointer hover:bg-[#F7F4EE]/20 transition-colors"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#059669] font-bold">CONNECTED TRACE</span>
            <span className="text-[#EFEAE0]/60">
              {new Date(targetReceipt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="font-serif text-lg font-bold text-[#F7F4EE]">
            {targetReceipt.title}
          </div>
          <div className="text-xs text-[#EFEAE0]/70 flex items-center space-x-1.5">
            <targetCat.icon className="w-3.5 h-3.5" />
            <span>{targetCat.label}</span>
          </div>
        </div>
      </div>

      {/* Algorithmic Reasoning List */}
      <div className="p-4 rounded-xl bg-[#F7F4EE]/5 border border-[#F7F4EE]/10 space-y-2 font-mono text-xs">
        <span className="font-bold text-[#EFEAE0] uppercase">WHY THESE ARE CONNECTED:</span>
        <ul className="text-[#EFEAE0]/80 space-y-1">
          {selectedEdge.reasons.map((reason, i) => (
            <li key={i} className="flex items-center space-x-2">
              <span className="text-[#059669]">&bull;</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onFollowThread(sourceReceipt)}
          className="px-5 py-2.5 rounded-xl bg-[#F7F4EE] text-[#171717] hover:bg-white font-mono text-xs font-bold transition-all shadow-md flex items-center space-x-2"
        >
          <span>Follow thread from here</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});

ConnectionEdgeDetail.displayName = 'ConnectionEdgeDetail';
