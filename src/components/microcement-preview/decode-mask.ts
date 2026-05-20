/**
 * Decodes a PNG Blob into a 1-byte-per-pixel Uint8Array mask
 * 1 = wall (masked), 0 = background
 */
export async function decodeMask(blob: Blob, targetWidth: number, targetHeight: number): Promise<Uint8Array> {
  const img = new Image();
  const url = URL.createObjectURL(blob);
  img.src = url;
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load mask image"));
  });
  
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  
  if (!ctx) {
    URL.revokeObjectURL(url);
    throw new Error("Could not get 2D context for decoding mask");
  }
  
  // Scale mask perfectly to fit our render canvas
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  
  const mask = new Uint8Array(targetWidth * targetHeight);
  
  // Track if image has an alpha channel being used
  let hasAlpha = false;
  for (let i = 0; i < mask.length; i++) {
    if (imageData.data[i * 4 + 3] < 255) {
      hasAlpha = true;
      break;
    }
  }
  
  for (let i = 0; i < mask.length; i++) {
    const idx = i * 4;
    const r = imageData.data[idx];
    const g = imageData.data[idx + 1];
    const b = imageData.data[idx + 2];
    const a = imageData.data[idx + 3];

    if (hasAlpha) {
      // If the image uses transparency for the background, rely on alpha
      mask[i] = a > 10 ? 1 : 0;
    } else {
      // If it's opaque, check if the pixel is non-black
      mask[i] = (r > 5 || g > 5 || b > 5) ? 1 : 0;
    }
  }
  
  URL.revokeObjectURL(url);
  return mask;
}
