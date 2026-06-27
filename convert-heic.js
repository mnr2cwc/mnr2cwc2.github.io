import fs from 'fs/promises';
import path from 'path';
import convert from 'heic-convert';

// Root directory of your repository to scan
const REPO_ROOT = './'; 

async function scanAndConvert(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // Recursively handle subfolders, ignoring node_modules and .git
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git') {
          await scanAndConvert(fullPath);
        }
        continue;
      }

      // Target HEIC files
      if (entry.isFile() && /\.(heic|heif)$/i.test(entry.name)) {
        console.log(`Processing: ${fullPath}`);
        
        try {
          const inputBuffer = await fs.readFile(fullPath);
          
          // Convert HEIC buffer to JPEG buffer
          const outputBuffer = await convert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.9 // Compression quality (0 to 1)
          });

          // Generate the new file path with .jpg extension
          const newPath = fullPath.replace(/\.(heic|heif)$/i, '.jpg');
          
          // Write the new file and delete the old one
          await fs.writeFile(newPath, outputBuffer);
          await fs.unlink(fullPath);
          
          console.log(`✅ Converted to: ${newPath}`);
        } catch (error) {
          console.error(`❌ Failed to convert ${fullPath}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
}

// Execute the conversion
console.log('Starting repository HEIC cleanup...');
scanAndConvert(REPO_ROOT).then(() => console.log('🎉 Done!'));