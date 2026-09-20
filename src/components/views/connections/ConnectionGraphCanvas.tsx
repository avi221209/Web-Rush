import React, { memo } from 'react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import type { LifeReceipt, ReceiptConnection } from '../../../types/receipt';
import type { NodePosition } from '../../../utils/graphLayout';

interface ConnectionGraphCanvasProps {
  filteredConnections: ReceiptConnection[];
  activeNodes: LifeReceipt[];
  nodePositions: Map<string, NodePosition>;
  hoveredNodeId: string | null;
  highlightedNodeIds: Set<string>;
  selectedEdge: ReceiptConnection | null;
  onHoverNode: (id: string | null) => void;
  onSelectEdge: (conn: ReceiptConnection) => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ConnectionGraphCanvas: React.FC<ConnectionGraphCanvasProps> = memo(({
  filteredConnections,
  activeNodes,
  nodePositions,
  hoveredNodeId,
  highlightedNodeIds,
  selectedEdge,
  onHoverNode,
  onSelectEdge,
  onSelectReceipt
}) => {
  return (
    <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-3xl p-4 sm:p-8 overflow-hidden relative shadow-inner">
      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox="0 0 800 550"
          className="w-full max-w-[800px] h-auto min-w-[600px] select-none"
        >
          {/* Background Concentric Radar Rings */}
          <circle cx="400" cy="275" r="140" fill="none" stroke="#E2DDD3" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="400" cy="275" r="205" fill="none" stroke="#E2DDD3" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="400" cy="275" r="270" fill="none" stroke="#E2DDD3" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

          {/* Connection Edges */}
          {filteredConnections.map((conn, idx) => {
            const p1 = nodePositions.get(conn.sourceId);
            const p2 = nodePositions.get(conn.targetId);
            if (!p1 || !p2) return null;

            const isEdgeHighlighted =
              hoveredNodeId === conn.sourceId || hoveredNodeId === conn.targetId;
            const isEdgeSelected =
              selectedEdge &&
              ((selectedEdge.sourceId === conn.sourceId && selectedEdge.targetId === conn.targetId) ||
                (selectedEdge.sourceId === conn.targetId && selectedEdge.targetId === conn.sourceId));

            const strokeColor = isEdgeSelected
              ? '#171717'
              : isEdgeHighlighted
              ? '#059669'
              : '#D6D0C4';

            const strokeWidth = isEdgeSelected
              ? 2.5
              : isEdgeHighlighted
              ? 2
              : Math.max(conn.score * 2.2, 0.8);

            return (
              <line
                key={idx}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={isEdgeSelected || isEdgeHighlighted ? 1 : 0.45}
                className="transition-colors duration-200 cursor-pointer"
                onClick={() => onSelectEdge(conn)}
              />
            );
          })}

          {/* Node Circles */}
          {activeNodes.map(node => {
            const pos = nodePositions.get(node.id);
            if (!pos) return null;

            const catInfo = getCategoryInfo(node.category);
            const isHovered = hoveredNodeId === node.id;
            const isHighlighted = highlightedNodeIds.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => onHoverNode(node.id)}
                onMouseLeave={() => onHoverNode(null)}
                onClick={() => onSelectReceipt(node)}
                className="cursor-pointer group"
              >
                {/* Highlight Glow Ring */}
                {(isHovered || isHighlighted) && (
                  <circle
                    r={isHovered ? 16 : 12}
                    fill={catInfo.colorHex}
                    opacity="0.15"
                    className="transition-all duration-200"
                  />
                )}

                {/* Node Solid Circle */}
                <circle
                  r={isHovered ? 7 : 5}
                  fill={catInfo.colorHex}
                  stroke="#F7F4EE"
                  strokeWidth="2"
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Node Label on Hover or Key Nodes */}
                {isHovered && (
                  <g className="animate-in fade-in duration-150 pointer-events-none">
                    <rect
                      x="10"
                      y="-12"
                      width={Math.max(node.title.length * 6.8, 80)}
                      height="24"
                      rx="6"
                      fill="#171717"
                      opacity="0.9"
                    />
                    <text
                      x="16"
                      y="4"
                      fill="#F7F4EE"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {node.title.substring(0, 20)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Graph Legend */}
      <div className="mt-4 pt-4 border-t border-[#E2DDD3] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#77736C]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
            <span>Music</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
            <span>Places</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span>Purchases</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
            <span>Photos</span>
          </span>
        </div>
        <div>
          <span>Click edge for reasoning card &bull; Click node to inspect trace</span>
        </div>
      </div>
    </div>
  );
});

ConnectionGraphCanvas.displayName = 'ConnectionGraphCanvas';
