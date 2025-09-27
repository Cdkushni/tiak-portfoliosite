#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Updating content cache...');

try {
  // Generate the site to create a new content cache
  console.log('📦 Generating site...');
  execSync('npm run generate', { stdio: 'inherit' });
  
  // Find the latest cache file
  const cacheDir = '.output/public/api/_content';
  if (!fs.existsSync(cacheDir)) {
    console.error('❌ Cache directory not found. Make sure you run npm run generate first.');
    process.exit(1);
  }
  
  const cacheFiles = fs.readdirSync(cacheDir)
    .filter(file => file.startsWith('cache.') && file.endsWith('.json'))
    .sort()
    .reverse();
  
  if (cacheFiles.length === 0) {
    console.error('❌ No cache files found.');
    process.exit(1);
  }
  
  const latestCacheFile = path.join(cacheDir, cacheFiles[0]);
  const targetFile = 'public/content-cache.json';
  
  // Copy the latest cache file
  fs.copyFileSync(latestCacheFile, targetFile);
  
  console.log(`✅ Content cache updated: ${cacheFiles[0]} → content-cache.json`);
  
  // Show the latest blog posts
  const cacheContent = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  const blogPosts = cacheContent.contents
    .filter(item => item._path && item._path.startsWith('/blog/'))
    .sort((a, b) => {
      // Use filename-based sorting (which includes date) as primary method
      // This is more reliable than parsing various date formats
      return b._path.localeCompare(a._path);
    })
    .slice(0, 5);
  
  console.log('\n📝 Latest blog posts:');
  blogPosts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title} (${post._path}) - ${post.date || 'No date'}`);
  });
  
} catch (error) {
  console.error('❌ Error updating content cache:', error.message);
  process.exit(1);
}
