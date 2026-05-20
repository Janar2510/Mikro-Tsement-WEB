/**
 * Paints a circle into a 1D Uint8Array mask.
 */
export function paintCircle(
  mask: Uint8Array,
  x: number,
  y: number,
  radius: number,
  value: 0 | 1,
  width: number,
  height: number
): void {
  const minX = Math.max(0, Math.floor(x - radius));
  const maxX = Math.min(width - 1, Math.ceil(x + radius));
  const minY = Math.max(0, Math.floor(y - radius));
  const maxY = Math.min(height - 1, Math.ceil(y + radius));
  
  const rSq = radius * radius;
  
  for (let cy = minY; cy <= maxY; cy++) {
    for (let cx = minX; cx <= maxX; cx++) {
      const dx = cx - x;
      const dy = cy - y;
      if (dx * dx + dy * dy <= rSq) {
        mask[cy * width + cx] = value;
      }
    }
  }
}

/**
 * Paints a line into the mask using linear sampling to avoid gaps in continuous strokes.
 */
export function paintLine(
  mask: Uint8Array,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  radius: number,
  value: 0 | 1,
  width: number,
  height: number
): void {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance <= radius / 2) {
    paintCircle(mask, x1, y1, radius, value, width, height);
    return;
  }
  
  const steps = Math.ceil(distance / (radius / 4));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = x0 + dx * t;
    const cy = y0 + dy * t;
    paintCircle(mask, cx, cy, radius, value, width, height);
  }
}
