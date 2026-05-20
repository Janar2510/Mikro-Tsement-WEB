/**
 * Pure function: applies finish to ImageData using mask.
 * Does not mutate the original ImageData.
 */
export function applyFinish(
  original: ImageData,
  mask: Uint8Array,
  finishRgb: [number, number, number],
  opacity: number
): ImageData {
  // Create a new ImageData using a copied buffer
  const out = new ImageData(
    new Uint8ClampedArray(original.data),
    original.width,
    original.height
  );

  let sumL = 0;
  let count = 0;

  // 1. Compute avgL over masked pixels only
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 1) {
      const idx = i * 4;
      const r = original.data[idx];
      const g = original.data[idx + 1];
      const b = original.data[idx + 2];
      sumL += 0.299 * r + 0.587 * g + 0.114 * b;
      count++;
    }
  }

  // Guard against zero-pixel masks
  const avgL = count > 0 ? sumL / count : 1;
  const maxAvgL = Math.max(avgL, 1);

  // 2. For each masked pixel, apply luminosity preservation and color blending
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 1) {
      const idx = i * 4;
      const r = original.data[idx];
      const g = original.data[idx + 1];
      const b = original.data[idx + 2];

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const factor = Math.max(0, Math.min(lum / maxAvgL, 1.4));

      let nr = finishRgb[0] * factor;
      let ng = finishRgb[1] * factor;
      let nb = finishRgb[2] * factor;

      // Add ±2 per-channel uniform noise for matte microcement texture
      nr += (Math.random() - 0.5) * 4;
      ng += (Math.random() - 0.5) * 4;
      nb += (Math.random() - 0.5) * 4;

      // Blend with original: out = newColor * opacity + original * (1 - opacity)
      // 3. Clamp every channel to [0, 255]
      out.data[idx] = Math.max(0, Math.min(nr * opacity + r * (1 - opacity), 255));
      out.data[idx + 1] = Math.max(0, Math.min(ng * opacity + g * (1 - opacity), 255));
      out.data[idx + 2] = Math.max(0, Math.min(nb * opacity + b * (1 - opacity), 255));
      // Keep alpha unchanged
    }
  }

  // 4. Return fresh ImageData
  return out;
}
