import React, { useState, useMemo } from 'react';
import { GitFork } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { calculateRadialNodePositions } from '../../utils/graphLayout';
import { ConnectionGraphCanvas } from './connections/ConnectionGraphCanvas';
import { ConnectionEdgeDetail } from './connections/ConnectionEdgeDetail';

import type { LifeReceipt, ReceiptConnection } from '../../types/receipt';
import type { StrengthFilter } from '../../types/ui';

export interface ConnectionMapViewProps {
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onFollowThread?: (receipt: LifeReceipt) => void;
}

export const ConnectionMapView: React.FC<ConnectionMapViewProps> = ({
  onSelectReceipt,
  onFollowThread
}) => {
  const { receipts, connections } = useArchive();

  const [strengthFilter, setStrengthFilter] = useState<StrengthFilter>('medium');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<ReceiptConnection | null>(null);

  // Filter connections by strength
  const minScore = strengthFilter === 'strong' ? 0.60 : strengthFilter === 'medium' ? 0.42 : 0.28;

  const filteredConnections = useMemo(() => {
    return connections.filter(conn => conn.score >= minScore).slice(0, 45);
  }, [connections, minScore]);

  // Extract unique active nodes in filtered connections
  const activeNodeIds = useMemo(() => {
    const ids = new Set<string>();
    filteredConnections.forEach(c => {
      ids.add(c.sourceId);
      ids.add(c.targetId);
    });
    return Array.from(ids);
  }, [filteredConnections]);

  const activeNodes = useMemo(() => {
    return activeNodeIds.map(id => receipts.find(r => r.id === id)!).filter(Boolean);
  }, [activeNodeIds, receipts]);

  // Pure layout computation
  const nodePositions = useMemo(() => {
    return calculateRadialNodePositions(activeNodes, 800, 550);
  }, [activeNodes]);

  // Hover connections highlight set
  const highlightedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>([hoveredNodeId]);
    filteredConnections.forEach(c => {
      if (c.sourceId === hoveredNodeId) set.add(c.targetId);
      if (c.targetId === hoveredNodeId) set.add(c.sourceId);
    });
    return set;
  }, [hoveredNodeId, filteredConnections]);

  const sourceReceipt = selectedEdge ? receipts.find(r => r.id === selectedEdge.sourceId) : null;
  const targetReceipt = selectedEdge ? receipts.find(r => r.id === selectedEdge.targetId) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
          <GitFork className="w-4 h-4 text-[#171717]" />
          <span>CLIENT-SIDE RELATIONSHIP NETWORK</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Connection Map</h1>
        <p className="text-sm text-[#77736C] font-sans">
          Interactive network graph showing proximity, location, and semantic relationships between digital traces.
        </p>
      </div>

      {/* Graph Control Bar */}
      <div className="bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-[#77736C]">CONNECTION STRENGTH:</span>
          <div className="flex items-center space-x-1 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl p-1">
            {(['strong', 'medium', 'all'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setStrengthFilter(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-all ${
                  strengthFilter === mode
                    ? 'bg-[#171717] text-[#F7F4EE]'
                    : 'text-[#77736C] hover:text-[#171717]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[#77736C]">
          Showing {filteredConnections.length} strong links across {activeNodes.length} active traces
        </div>
      </div>

      {/* Interactive SVG Network Canvas */}
      <ConnectionGraphCanvas
        filteredConnections={filteredConnections}
        activeNodes={activeNodes}
        nodePositions={nodePositions}
        hoveredNodeId={hoveredNodeId}
        highlightedNodeIds={highlightedNodeIds}
        selectedEdge={selectedEdge}
        onHoverNode={setHoveredNodeId}
        onSelectEdge={setSelectedEdge}
        onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
      />

      {/* Selected Edge Reasoning Card */}
      {selectedEdge && sourceReceipt && targetReceipt && (
        <ConnectionEdgeDetail
          selectedEdge={selectedEdge}
          sourceReceipt={sourceReceipt}
          targetReceipt={targetReceipt}
          onFollowThread={rcpt => onFollowThread?.(rcpt)}
          onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
          onClearEdge={() => setSelectedEdge(null)}
        />
      )}
    </div>
  );
};
