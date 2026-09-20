export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Calculates radial/force-inspired coordinate distribution for graph nodes on an SVG canvas.
 */
export function calculateRadialNodePositions(
  nodes: { id: string }[],
  width = 800,
  height = 550
): Map<string, NodePosition> {
  const map = new Map<string, NodePosition>();
  const centerX = width / 2;
  const centerY = height / 2;
  const count = nodes.length;

  if (count === 0) return map;

  nodes.forEach((node, i) => {
    const angle = (i / count) * 2 * Math.PI;
    const radius = 140 + (i % 3) * 65;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    map.set(node.id, { x, y });
  });

  return map;
}
