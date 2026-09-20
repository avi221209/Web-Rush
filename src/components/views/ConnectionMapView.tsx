import React, { useState, useMemo } from 'react';
import { GitFork, HelpCircle } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { GLOBAL_CONNECTIONS, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { LifeReceipt, ReceiptConnection } from '../../types/receipt';

interface ConnectionMapViewProps {
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onFollowThread: (receipt: LifeReceipt) => void;
}

export const ConnectionMapView: React.FC<ConnectionMapViewProps> = ({
  onSelectReceipt,
  onFollowThread
}) => {
  const [strengthFilter, setStrengthFilter] = useState<'all' | 'medium' | 'strong'>('medium');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<ReceiptConnection | null>(null);

  // Filter connections by strength
  const minScore = strengthFilter === 'strong' ? 0.60 : strengthFilter === 'medium' ? 0.42 : 0.28;

  const filteredConnections = useMemo(() => {
    return GLOBAL_CONNECTIONS.filter(conn => conn.score >= minScore).slice(0, 45); // cap at 45 edges for performance & graph legibility
  }, [strengthFilter, minScore]);

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
    return activeNodeIds.map(id => GLOBAL_RECEIPTS.find(r => r.id === id)!).filter(Boolean);
  }, [activeNodeIds]);

  // Generate radial/force positions in SVG canvas (800x550)
  const nodePositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    const count = activeNodes.length;
    activeNodes.forEach((node, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const radius = 140 + (i % 3) * 65;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      map.set(node.id, { x, y });
    });

    return map;
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

  const sourceReceipt = selectedEdge ? GLOBAL_RECEIPTS.find(r => r.id === selectedEdge.sourceId) : null;
  const targetReceipt = selectedEdge ? GLOBAL_RECEIPTS.find(r => r.id === selectedEdge.targetId) : null;

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
        {/* Strength Filter */}
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

        {/* Stats Indicator */}
        <div className="text-xs font-mono text-[#77736C]">
          Displaying <span className="font-bold text-[#171717]">{activeNodes.length}</span> nodes &bull; <span className="font-bold text-[#171717]">{filteredConnections.length}</span> connections
        </div>
      </div>

      {/* Main Interactive Network View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* SVG Canvas Area (2 cols on Desktop) */}
        <div className="lg:col-span-2 bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl p-4 shadow-sm relative overflow-hidden min-h-[500px] flex items-center justify-center">
          <svg
            viewBox="0 0 800 550"
            className="w-full h-auto max-h-[600px] select-none"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2DDD3" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="550" fill="url(#grid)" />

            {/* Edges */}
            {filteredConnections.map(conn => {
              const posA = nodePositions.get(conn.sourceId);
              const posB = nodePositions.get(conn.targetId);
              if (!posA || !posB) return null;

              const isHighlighted =
                hoveredNodeId &&
                (conn.sourceId === hoveredNodeId || conn.targetId === hoveredNodeId);
              const isSelected =
                selectedEdge?.sourceId === conn.sourceId && selectedEdge?.targetId === conn.targetId;

              const strokeWidth = Math.max(conn.score * 3.5, 1);
              const strokeColor = isSelected
                ? '#171717'
                : isHighlighted
                ? '#059669'
                : '#C4BDAF';

              return (
                <g key={`${conn.sourceId}-${conn.targetId}`}>
                  <line
                    x1={posA.x}
                    y1={posA.y}
                    x2={posB.x}
                    y2={posB.y}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHighlighted ? strokeWidth + 1.5 : strokeWidth}
                    strokeDasharray={conn.relationshipType === 'temporal' ? 'none' : '4,4'}
                    opacity={hoveredNodeId ? (isHighlighted ? 1 : 0.15) : 0.6}
                    className="transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedEdge(conn)}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {activeNodes.map(node => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;

              const catInfo = getCategoryInfo(node.category);
              const isHovered = hoveredNodeId === node.id;
              const isRelated = highlightedNodeIds.has(node.id);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => onSelectReceipt(node)}
                  className="cursor-pointer group"
                >
                  <circle
                    r={isHovered ? 24 : 16}
                    fill={catInfo.colorHex}
                    opacity={isHovered ? 0.25 : isRelated ? 0.15 : 0.08}
                    className="transition-all duration-300"
                  />

                  <circle
                    r={isHovered ? 12 : 8}
                    fill={catInfo.colorHex}
                    stroke="#F7F4EE"
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  <text
                    y={22}
                    textAnchor="middle"
                    fill="#171717"
                    fontSize={isHovered ? "11" : "9"}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight={isHovered ? "bold" : "medium"}
                    opacity={hoveredNodeId ? (isRelated ? 1 : 0.2) : 0.85}
                    className="pointer-events-none transition-all"
                  >
                    {node.title.length > 22 ? node.title.substring(0, 20) + '…' : node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side Detail Card */}
        <div className="bg-[#EFEAE0]/60 border border-[#E2DDD3] rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#171717]">
            <HelpCircle className="w-4 h-4 text-[#77736C]" />
            <span>WHY ARE THESE CONNECTED?</span>
          </div>

          {selectedEdge && sourceReceipt && targetReceipt ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-[#77736C]">SOURCE TRACE:</span>
                <div className="text-xs font-bold text-[#171717]">{sourceReceipt.title}</div>
              </div>

              <div className="text-center font-mono text-xs font-bold text-[#059669]">
                &darr; {Math.round(selectedEdge.score * 100)}% Connection Score &darr;
              </div>

              <div className="p-3 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-[#77736C]">TARGET TRACE:</span>
                <div className="text-xs font-bold text-[#171717]">{targetReceipt.title}</div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E2DDD3]">
                <span className="text-xs font-mono font-bold text-[#171717]">DETECTED REASONS:</span>
                <ul className="text-xs text-[#77736C] space-y-1 font-mono">
                  {selectedEdge.reasons.map((r, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span>&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onFollowThread(sourceReceipt)}
                className="w-full py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] text-xs font-mono font-bold hover:bg-[#333] transition-colors"
              >
                Follow this thread &rarr;
              </button>
            </div>
          ) : hoveredNodeId ? (
            <div className="space-y-2">
              <p className="text-xs text-[#77736C]">Hovering over trace:</p>
              <div className="font-serif text-lg font-bold text-[#171717]">
                {GLOBAL_RECEIPTS.find(r => r.id === hoveredNodeId)?.title}
              </div>
              <p className="text-xs text-[#77736C]">Click any node to view full details or click an edge line to inspect connection reasons.</p>
            </div>
          ) : (
            <div className="py-8 text-center space-y-2 text-xs text-[#77736C]">
              <p className="font-serif italic text-base text-[#171717]">Select a connection line</p>
              <p>Click any edge line between nodes to inspect the client-side connection score and proximity calculations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
