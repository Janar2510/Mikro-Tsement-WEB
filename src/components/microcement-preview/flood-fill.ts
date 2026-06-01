/**
 * Precision wall segmentation for microcement visualisation.
 *
 * Algorithm: dual-check BFS
 *   - global check  : pixel must stay within GLOBAL_TOL of the original seed
 *   - local check   : pixel must stay within LOCAL_TOL of its parent (gradient-safe)
 *   - edge check    : combined Sobel + LAB-gradient stops at object boundaries
 *
 * Walls with uneven lighting pass (small local jumps accumulate, global still OK).
 * Jumping from wall to TV / door / mirror fails (large local jump OR edge).
 */

// ── Colour maths ──────────────────────────────────────────────────────────

function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  let rn = r / 255, gn = g / 255, bn = b / 255;
  rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
  gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
  bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;

  let x = (rn * 0.4124564 + gn * 0.3575761 + bn * 0.1804375) / 0.95047;
  let y =  rn * 0.2126729 + gn * 0.7151522 + bn * 0.0721750;
  let z = (rn * 0.0193339 + gn * 0.1191920 + bn * 0.9503041) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function deltaE(l1: number, a1: number, b1: number,
                l2: number, a2: number, b2: number): number {
  const dl = l1 - l2, da = a1 - a2, db = b1 - b2;
  return Math.sqrt(dl * dl + da * da + db * db);
}

// ── Build LAB map ─────────────────────────────────────────────────────────

function buildLabMap(imageData: ImageData): Float32Array {
  const n = imageData.width * imageData.height;
  const lab = new Float32Array(n * 3);
  const d = imageData.data;
  for (let i = 0; i < n; i++) {
    const [L, a, b] = rgbToLab(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]);
    lab[i * 3] = L; lab[i * 3 + 1] = a; lab[i * 3 + 2] = b;
  }
  return lab;
}

// ── Combined edge map (Sobel grayscale + LAB color gradient) ──────────────
// LAB color gradient catches color-edges missed by grayscale Sobel
// (e.g. green wall → grey TV at similar luminance).

function buildEdgeMap(imageData: ImageData, labMap: Float32Array): Float32Array {
  const { width, height, data } = imageData;
  const edges = new Float32Array(width * height);

  const gray = (px: number, py: number) => {
    const i = (py * width + px) * 4;
    return data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  };

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      // Sobel on luminance
      const gx =
        -gray(x-1,y-1) + gray(x+1,y-1) +
        -2*gray(x-1,y) + 2*gray(x+1,y) +
        -gray(x-1,y+1) + gray(x+1,y+1);
      const gy =
        -gray(x-1,y-1) - 2*gray(x,y-1) - gray(x+1,y-1) +
         gray(x-1,y+1) + 2*gray(x,y+1) + gray(x+1,y+1);
      const sobelMag = Math.sqrt(gx * gx + gy * gy);

      // LAB color gradient (max deltaE to 4 neighbours)
      const ci = y * width + x;
      const cL = labMap[ci * 3], cA = labMap[ci * 3 + 1], cB = labMap[ci * 3 + 2];
      const ri = ci + 1, di = ci + width;
      let labMag = 0;
      if (x + 1 < width) {
        const dE = deltaE(cL, cA, cB, labMap[ri*3], labMap[ri*3+1], labMap[ri*3+2]);
        if (dE > labMag) labMag = dE;
      }
      if (y + 1 < height) {
        const dE = deltaE(cL, cA, cB, labMap[di*3], labMap[di*3+1], labMap[di*3+2]);
        if (dE > labMag) labMag = dE;
      }

      // Combine: weight LAB gradient higher (catches colour edges)
      edges[ci] = sobelMag * 0.4 + labMag * 2.0;
    }
  }
  return edges;
}

// ── Dual-check BFS ────────────────────────────────────────────────────────
// Each pixel must satisfy:
//   1. edge strength < edgeThreshold
//   2. deltaE to seed < globalTol   (prevents drift to completely different surfaces)
//   3. deltaE to parent < localTol  (prevents abrupt cross-object jumps)

function dualCheckBFS(
  labMap: Float32Array,
  edgeMap: Float32Array,
  width: number,
  height: number,
  startX: number,
  startY: number,
  globalTol: number,
  localTol: number,
  edgeThreshold: number,
  maxPixels: number
): Uint8Array {
  const n = width * height;
  const mask    = new Uint8Array(n);
  const visited = new Uint8Array(n);

  // Seed colour
  const si = startY * width + startX;
  const sL = labMap[si * 3], sA = labMap[si * 3 + 1], sB = labMap[si * 3 + 2];

  // Queue stores: x, y, parentL, parentA, parentB
  const qx  = new Int32Array(n);
  const qy  = new Int32Array(n);
  const qpL = new Float32Array(n);
  const qpA = new Float32Array(n);
  const qpB = new Float32Array(n);
  let head = 0, tail = 0;

  qx[0] = startX; qy[0] = startY;
  qpL[0] = sL; qpA[0] = sA; qpB[0] = sB;
  tail = 1;
  visited[si] = 1;

  let filled = 0;
  const DX = [1, -1, 0, 0];
  const DY = [0, 0, 1, -1];

  while (head < tail && filled < maxPixels) {
    const x = qx[head], y = qy[head];
    const pL = qpL[head], pA = qpA[head], pB = qpB[head];
    head++;

    const key = y * width + x;

    // 1. Edge gate
    if (edgeMap[key] > edgeThreshold) continue;

    const kL = labMap[key * 3], kA = labMap[key * 3 + 1], kB = labMap[key * 3 + 2];

    // 2. Global drift gate
    if (deltaE(sL, sA, sB, kL, kA, kB) > globalTol) continue;

    // 3. Local jump gate
    if (deltaE(pL, pA, pB, kL, kA, kB) > localTol) continue;

    mask[key] = 1;
    filled++;

    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d], ny = y + DY[d];
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const nk = ny * width + nx;
      if (visited[nk]) continue;
      visited[nk] = 1;
      qx[tail] = nx; qy[tail] = ny;
      qpL[tail] = kL; qpA[tail] = kA; qpB[tail] = kB;
      tail++;
    }
  }

  return mask;
}

// ── Main API ──────────────────────────────────────────────────────────────

export function smartPrecisionWallSegment(
  imageData: ImageData,
  startX: number,
  startY: number
): Uint8Array {
  const { width, height } = imageData;
  const maxPixels = Math.min(width * height, 700_000);

  const labMap  = buildLabMap(imageData);
  const edgeMap = buildEdgeMap(imageData, labMap);

  // Pass 1: tight — good precision on well-lit photos
  let mask = dualCheckBFS(
    labMap, edgeMap, width, height, startX, startY,
    /* globalTol */ 25,
    /* localTol  */ 6,
    /* edgeThres */ 20,
    maxPixels
  );

  const filled = mask.reduce((s, v) => s + v, 0);

  // Pass 2: wider global + local — needed for dark/noisy or low-contrast photos
  if (filled < 800) {
    mask = dualCheckBFS(
      labMap, edgeMap, width, height, startX, startY,
      /* globalTol */ 40,
      /* localTol  */ 10,
      /* edgeThres */ 28,
      maxPixels
    );
  }

  return mask;
}

export { smartPrecisionWallSegment as smartFloodFill };

export function mergeMasks(base: Uint8Array, added: Uint8Array): Uint8Array {
  const result = new Uint8Array(base.length);
  for (let i = 0; i < base.length; i++) result[i] = base[i] || added[i] ? 1 : 0;
  return result;
}
