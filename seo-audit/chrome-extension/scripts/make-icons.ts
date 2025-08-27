const fs = require('fs');
const path = require('path');

async function main() {
  // Try to require sharp, print clear error if missing
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('\n[ERROR] The "sharp" package is not installed. Please run: pnpm add sharp\n');
    process.exit(1);
  }

  const outDir = path.join(__dirname, '../dist');
  fs.mkdirSync(outDir, { recursive: true });

  const sizes = [16, 48, 128];
  const files = [];

  for (const size of sizes) {
    const svg = svgForSize(size);
    const file = path.join(outDir, `icon${size}.png`);
    await sharp(Buffer.from(svg, 'utf8'))
      .png({ compressionLevel: 9 })
      .toFile(file);
    const bytes = fs.statSync(file).size;
    files.push({ size, file, bytes });
  }

  // Copy manifest.json if not present
  const manifestSrc = path.join(__dirname, '../public/manifest.json');
  const manifestDst = path.join(outDir, 'manifest.json');
  if (fs.existsSync(manifestSrc) && !fs.existsSync(manifestDst)) {
    fs.copyFileSync(manifestSrc, manifestDst);
  }

  // Print summary
  console.log('\n[icon generation complete]');
  for (const { size, file, bytes } of files) {
    console.log(`  ${file} (${size}x${size}) - ${bytes} bytes`);
  }
  console.log('');
}

function svgForSize(size: number) {
  const bg = '#111827';
  const green = '#22C55E';
  const white = '#fff';
  const r = size * 0.125; // 12.5% corner radius
  const fontFamily = 'sans-serif';
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  svg += `<rect x="0" y="0" width="${size}" height="${size}" rx="${r}" fill="${bg}"/>`;

  if (size === 16) {
    // Bold S, centered, no magnifier
    const fontSize = size * 0.8;
    const y = size / 2 + fontSize * 0.36; // optical centering
    svg += `<text x="50%" y="${y}" text-anchor="middle" fill="${white}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="bold" letter-spacing="0">S</text>`;
  } else {
    // Magnifier
    const c = size / 2;
    const magR = size * 0.32;
    const strokeW = Math.max(1, size * (size === 128 ? 0.08 : 0.08 * (size / 128)));
    // Circle
    svg += `<circle cx="${c - magR * 0.3}" cy="${c - magR * 0.3}" r="${magR}" fill="none" stroke="${green}" stroke-width="${strokeW}"/>`;
    // Handle (45deg)
    const handleL = magR * 0.9;
    const x1 = c + magR * 0.45;
    const y1 = c + magR * 0.45;
    const x2 = x1 + handleL * 0.7;
    const y2 = y1 + handleL * 0.7;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${green}" stroke-width="${strokeW}" stroke-linecap="round"/>`;
    // Text
    const text = 'SEO';
    const fontSize = size === 128 ? size * 0.44 : size * 0.46;
    const y = c + fontSize * 0.36; // optical centering
    svg += `<text x="50%" y="${y}" text-anchor="middle" fill="${white}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="bold">${text}</text>`;
  }
  svg += '</svg>';
  return svg;
}

main().catch(e => {
  console.error('[icon generation error]', e);
  process.exit(1);
});
