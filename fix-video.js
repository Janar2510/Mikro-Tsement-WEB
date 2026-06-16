const fs = require('fs');

const files = [
  'src/components/home/Hero.tsx',
  'src/components/home/Surfaces.tsx',
  'src/components/home/TimelessCollection.tsx',
  'src/components/home/DecoWalls.tsx',
  'src/components/products/CustomInteriorSection.tsx',
  'src/components/layout/SectionHero.tsx',
  'src/components/events/WorkshopSection.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the video ref logic
  content = content.replace(
    /const video = videoRef\.current;\s*if \(!video\) return;/g,
    `const videoElement = videoRef.current;\n    if (!videoElement) return;\n    const video = videoElement.tagName === 'VIDEO' ? videoElement : videoElement.querySelector('video');\n    if (!video) return;`
  );
  
  // Replace the <video ... /> tag with the dangerouslySetInnerHTML version.
  // This is tricky because the video tag spans multiple lines.
  // Instead of a regex, let's just do a specific replace if we can.
}
