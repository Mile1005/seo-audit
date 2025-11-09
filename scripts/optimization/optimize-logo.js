import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeLogo() {
  const inputPath = path.join(__dirname, '../public/logo.png');
  const outputPath = path.join(__dirname, '../public/logo-optimized.png');
  
  console.log('Optimizing logo...');
  
  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    console.log(`Original size: ${originalSizeKB} KB`);
    
    // Optimize the image
    await sharp(inputPath)
      .png({ 
        quality: 85,
        compressionLevel: 9,
        palette: true // Use palette-based PNG for smaller file size
      })
      .toFile(outputPath);
    
    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);
    console.log(`Optimized size: ${optimizedSizeKB} KB`);
    console.log(`Reduction: ${((1 - optimizedStats.size / originalStats.size) * 100).toFixed(2)}%`);
    
    // If the optimized version is good enough, replace the original
    if (optimizedStats.size < 100 * 1024) { // Less than 100KB
      fs.renameSync(inputPath, path.join(__dirname, '../public/logo-backup.png'));
      fs.renameSync(outputPath, inputPath);
      console.log('✓ Logo optimized successfully and replaced original!');
      console.log('✓ Backup saved as logo-backup.png');
    } else {
      console.log('⚠ File is still over 100KB. Trying more aggressive optimization...');
      
      // More aggressive optimization
      await sharp(inputPath)
        .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ 
          quality: 75,
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath);
      
      const aggressiveStats = fs.statSync(outputPath);
      const aggressiveSizeKB = (aggressiveStats.size / 1024).toFixed(2);
      console.log(`Aggressively optimized size: ${aggressiveSizeKB} KB`);
      
      if (aggressiveStats.size < 100 * 1024) {
        fs.renameSync(inputPath, path.join(__dirname, '../public/logo-backup.png'));
        fs.renameSync(outputPath, inputPath);
        console.log('✓ Logo optimized successfully with aggressive settings!');
        console.log('✓ Backup saved as logo-backup.png');
      } else {
        console.log('✗ Even with aggressive optimization, file is still over 100KB');
        console.log('Consider using a smaller source image or SVG format');
      }
    }
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

optimizeLogo();
