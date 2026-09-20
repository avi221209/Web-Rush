import React, { memo } from 'react';
import { GitFork, ShieldCheck, Clock, MapPin, Tag, User, Calendar, Link } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import type { LifeReceipt, ReceiptConnection } from '../../../types/receipt';

interface ConnectedItem {
  receipt: LifeReceipt;
  connection: ReceiptConnection;
}

interface DrawerConnectedTracesProps {
  connectedList: ConnectedItem[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const DrawerConnectedTraces: React.FC<DrawerConnectedTracesProps> = memo(({
  connectedList,
  onSelectReceipt
}) => {
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
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectReceipt(connReceipt); } }}
                role="button"
                tabIndex={0}
                aria-label={`View receipt: ${connReceipt.title}`}
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
  );
});

DrawerConnectedTraces.displayName = 'DrawerConnectedTraces';
