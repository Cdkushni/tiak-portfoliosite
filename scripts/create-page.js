#!/usr/bin/env node

/**
 * Helper script to create a new page
 * Usage: npm run create-page <page-name> [title]
 * Example: npm run create-page contact "Contact Me"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get arguments
const args = process.argv.slice(2)
const pageName = args[0]
const pageTitle = args[1] || pageName.charAt(0).toUpperCase() + pageName.slice(1)

if (!pageName) {
  console.error('❌ Error: Please provide a page name')
  console.log('\nUsage: npm run create-page <page-name> [title]')
  console.log('Example: npm run create-page contact "Contact Me"')
  process.exit(1)
}

// Validate page name (lowercase with hyphens only)
if (!/^[a-z0-9-]+$/.test(pageName)) {
  console.error('❌ Error: Page name must be lowercase with hyphens only (e.g., about-me)')
  process.exit(1)
}

// Create the page file
const pageDir = path.join(__dirname, '..', 'content', 'page')
const pageFile = path.join(pageDir, `${pageName}.md`)

// Check if page already exists
if (fs.existsSync(pageFile)) {
  console.error(`❌ Error: Page "${pageName}" already exists at ${pageFile}`)
  process.exit(1)
}

// Create the page directory if it doesn't exist
if (!fs.existsSync(pageDir)) {
  fs.mkdirSync(pageDir, { recursive: true })
}

// Create the page template
const template = `---
title: ${pageTitle}
description: Add a description for SEO
---

# ${pageTitle}

Add your content here...

## Section 1

Your content goes here.

## Section 2

More content here.
`

// Write the file
fs.writeFileSync(pageFile, template, 'utf-8')

console.log('✅ Page created successfully!')
console.log(`\n📄 File: ${pageFile}`)
console.log(`🔗 URL: /${pageName}`)
console.log(`📝 Menu: "${pageTitle}"`)
console.log('\n📚 Next steps:')
console.log('1. Edit the page content in the file above')
console.log('2. The page will automatically appear in the navigation menu')
console.log('3. Test locally: npm run dev')
console.log('4. Visit: http://localhost:3000/' + pageName)
console.log('\n💡 Tip: See PAGES_WORKFLOW.md for more information')

