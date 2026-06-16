const sharp = require('sharp');

async function test() {
  const input = 'public/assets/brand/logos/Micro Logo.png';
  // First, get the trimmed buffer
  const trimmed = await sharp(input).trim().toBuffer({ resolveWithObject: true });
  
  // Now crop the first 250 pixels horizontally (assuming it's roughly the first letter 'K')
  const width = Math.min(250, trimmed.info.width);
  const letterK = await sharp(trimmed.data, {
    raw: {
      width: trimmed.info.width,
      height: trimmed.info.height,
      channels: trimmed.info.channels
    }
  })
  .extract({ left: 0, top: 0, width: width, height: trimmed.info.height })
  .trim()
  .toBuffer({ resolveWithObject: true });
  
  console.log("Letter K trimmed:", letterK.info.width, "x", letterK.info.height);
  
  // Save this so we can see what it looks like locally (we can't easily see it but we can use it to create the favicon)
  await sharp(letterK.data, {
    raw: {
      width: letterK.info.width,
      height: letterK.info.height,
      channels: letterK.info.channels
    }
  })
  .resize({
      width: 512,
      height: 512,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .toFile('src/app/icon.png');
  console.log("Created K-only favicon");
}

test();
