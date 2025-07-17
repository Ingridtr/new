#!/usr/bin/env node

/**
 * Heading Structure Verification Script
 * Validates that all pages have proper heading hierarchy
 */

import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const componentFiles = [
  'src/components/LesMerButton.tsx'
];

function extractHeadings(content) {
  // Handle both single-line and multi-line headings
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    // Clean up the text content
    const text = match[2]
      .replace(/{.*?}/g, '[dynamic]')
      .replace(/\s+/g, ' ')
      .trim();
    
    headings.push({
      level: parseInt(match[1]),
      text: text || '[empty]',
      fullMatch: match[0]
    });
  }
  
  return headings;
}

function validatePage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const headings = extractHeadings(content);
  const fileName = path.basename(filePath);
  
  console.log(`\n📄 ${fileName}`);
  
  if (headings.length === 0) {
    console.log('  ❌ No headings found');
    return false;
  }
  
  // Check for h1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    console.log('  ❌ Missing h1 element');
    return false;
  } else if (h1Count > 1) {
    console.log(`  ❌ Multiple h1 elements (${h1Count})`);
    return false;
  } else {
    console.log('  ✅ Exactly one h1 element');
  }
  
  // Show heading structure
  headings.forEach(heading => {
    const indent = '  ' + '  '.repeat(heading.level - 1);
    console.log(`${indent}h${heading.level}: ${heading.text}`);
  });
  
  return true;
}

function validateComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const headings = extractHeadings(content);
  const fileName = path.basename(filePath);
  
  console.log(`\n🧩 ${fileName}`);
  
  if (headings.length === 0) {
    console.log('  ✅ No headings (appropriate for component)');
    return true;
  }
  
  // Components should not have h1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count > 0) {
    console.log(`  ❌ Component has h1 elements (${h1Count}) - should use h2 or lower`);
    return false;
  } else {
    console.log('  ✅ No h1 elements in component');
  }
  
  // Show heading structure
  headings.forEach(heading => {
    const indent = '  ' + '  '.repeat(heading.level - 1);
    console.log(`${indent}h${heading.level}: ${heading.text}`);
  });
  
  return true;
}

function main() {
  console.log('🔍 Heading Structure Validation Report');
  console.log('=====================================');
  
  let allValid = true;
  
  // Check all pages
  console.log('\n📚 PAGES');
  const pageFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(pagesDir, file));
  
  for (const filePath of pageFiles) {
    if (!validatePage(filePath)) {
      allValid = false;
    }
  }
  
  // Check components
  console.log('\n🧩 COMPONENTS');
  for (const filePath of componentFiles) {
    if (!validateComponent(filePath)) {
      allValid = false;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  if (allValid) {
    console.log('✅ All heading structures are valid!');
    console.log('🎉 WCAG 2.1 heading hierarchy compliance achieved');
  } else {
    console.log('❌ Heading structure issues found');
    console.log('🔧 Please fix the issues above');
  }
  
  process.exit(allValid ? 0 : 1);
}

main();
