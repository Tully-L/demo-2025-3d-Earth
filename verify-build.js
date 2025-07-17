import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Verifying build output...');

const distPath = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ index.html not found in dist directory');
  process.exit(1);
}

// Check if assets directory exists
const assetsPath = path.join(distPath, 'assets');
if (!fs.existsSync(assetsPath)) {
  console.error('❌ assets directory not found in dist');
  process.exit(1);
}

console.log('✅ Build verification passed!');
console.log('✅ dist directory exists');
console.log('✅ index.html exists');
console.log('✅ assets directory exists'); 