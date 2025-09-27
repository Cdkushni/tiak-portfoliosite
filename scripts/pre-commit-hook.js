#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking for content changes...');

try {
  // Check if any content files have been modified
  const contentPaths = [
    'content/blog/',
    'content/setup/',
    'content/subcategory/',
    'content/category/'
  ];
  
  // Get the list of staged files
  const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
    .split('\n')
    .filter(file => file.trim());
  
  // Check if any staged files are in content directories
  const hasContentChanges = stagedFiles.some(file => 
    contentPaths.some(path => file.startsWith(path))
  );
  
  if (hasContentChanges) {
    console.log('📝 Content changes detected. Updating content cache...');
    
    // Run the update content script
    execSync('npm run update-content', { stdio: 'inherit' });
    
    // Stage the updated content cache file
    execSync('git add public/content-cache.json', { stdio: 'inherit' });
    
    console.log('✅ Content cache updated and staged for commit.');
  } else {
    console.log('ℹ️  No content changes detected. Skipping content cache update.');
  }
  
} catch (error) {
  console.error('❌ Error in pre-commit hook:', error.message);
  process.exit(1);
}
