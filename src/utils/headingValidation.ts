// Heading hierarchy validation utilities

export interface HeadingInfo {
  level: number;
  text: string;
  element: HTMLElement;
  lineNumber?: number;
  fileName?: string;
}

export interface HeadingIssue {
  type: 'missing-h1' | 'skipped-level' | 'multiple-h1' | 'empty-heading' | 'improper-nesting';
  message: string;
  element?: HTMLElement;
  expectedLevel?: number;
  actualLevel?: number;
}

// Extract heading information from a document or element
export function extractHeadings(container: Document | HTMLElement = document): HeadingInfo[] {
  const headingSelectors = 'h1, h2, h3, h4, h5, h6';
  const headingElements = container.querySelectorAll(headingSelectors);
  
  return Array.from(headingElements).map((element) => ({
    level: parseInt(element.tagName.substring(1), 10),
    text: element.textContent?.trim() || '',
    element: element as HTMLElement,
  }));
}

// Validate heading hierarchy according to WCAG guidelines
export function validateHeadingHierarchy(headings: HeadingInfo[]): HeadingIssue[] {
  const issues: HeadingIssue[] = [];

  if (headings.length === 0) {
    return issues;
  }

  // Check for missing h1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push({
      type: 'missing-h1',
      message: 'Page should have exactly one h1 element'
    });
  }

  // Check for multiple h1s
  if (h1Count > 1) {
    issues.push({
      type: 'multiple-h1',
      message: `Found ${h1Count} h1 elements. Page should have exactly one h1 element`
    });
  }

  // Check for empty headings
  headings.forEach((heading) => {
    if (!heading.text) {
      issues.push({
        type: 'empty-heading',
        message: `Empty h${heading.level} element found`,
        element: heading.element,
        actualLevel: heading.level
      });
    }
  });

  // Check for skipped heading levels
  for (let i = 1; i < headings.length; i++) {
    const currentLevel = headings[i].level;
    const previousLevel = headings[i - 1].level;
    
    // Skip if we're going back to a higher level (closing a section)
    if (currentLevel <= previousLevel) {
      continue;
    }
    
    // Check if we skipped a level
    if (currentLevel > previousLevel + 1) {
      issues.push({
        type: 'skipped-level',
        message: `Heading level skipped from h${previousLevel} to h${currentLevel}. Consider using h${previousLevel + 1} instead.`,
        element: headings[i].element,
        expectedLevel: previousLevel + 1,
        actualLevel: currentLevel
      });
    }
  }

  return issues;
}

// Check if an element should be a heading based on its styling
export function findPotentialHeadings(container: Document | HTMLElement = document): HTMLElement[] {
  const potentialHeadings: HTMLElement[] = [];
  
  // Look for elements with heading-like styles but not actual heading tags
  const suspiciousSelectors = [
    '[class*="font-bold"][class*="text-"][class*="xl"]',
    '[class*="text-"][class*="xl"][class*="font-bold"]',
    '[class*="font-semibold"][class*="text-2xl"]',
    '[class*="text-2xl"][class*="font-semibold"]',
    '[class*="text-3xl"]',
    '[class*="text-4xl"]',
    '[class*="text-5xl"]',
    '[class*="text-6xl"]'
  ];
  
  suspiciousSelectors.forEach(selector => {
    const elements = container.querySelectorAll(selector);
    elements.forEach(element => {
      // Skip if already a heading
      if (element.tagName.match(/^H[1-6]$/)) {
        return;
      }
      
      // Skip if inside a heading
      if (element.closest('h1, h2, h3, h4, h5, h6')) {
        return;
      }
      
      potentialHeadings.push(element as HTMLElement);
    });
  });
  
  return potentialHeadings;
}

// Generate a heading outline for debugging
export function generateHeadingOutline(headings: HeadingInfo[]): string {
  return headings.map(heading => {
    const indent = '  '.repeat(heading.level - 1);
    return `${indent}h${heading.level}: ${heading.text}`;
  }).join('\n');
}

// Accessibility announcement for heading navigation
export function announceHeadingStructure(headings: HeadingInfo[]): void {
  const h1s = headings.filter(h => h.level === 1);
  const totalHeadings = headings.length;
  
  let message = '';
  
  if (h1s.length === 1) {
    message = `Side med hovedoverskrift "${h1s[0].text}" og ${totalHeadings - 1} underoverskrifter`;
  } else if (h1s.length === 0) {
    message = `Side uten hovedoverskrift, ${totalHeadings} overskrifter totalt`;
  } else {
    message = `Side med ${h1s.length} hovedoverskrifter og ${totalHeadings} overskrifter totalt`;
  }
  
  // This would typically be announced via a screen reader
  console.log('Heading structure:', message);
}

// Fix common heading hierarchy issues
export function suggestHeadingFixes(issues: HeadingIssue[]): string[] {
  const suggestions: string[] = [];
  
  issues.forEach(issue => {
    switch (issue.type) {
      case 'missing-h1':
        suggestions.push('Add an h1 element to serve as the main page heading');
        break;
      case 'multiple-h1':
        suggestions.push('Convert additional h1 elements to h2 or appropriate level');
        break;
      case 'skipped-level':
        suggestions.push(`Change h${issue.actualLevel} to h${issue.expectedLevel} to maintain hierarchy`);
        break;
      case 'empty-heading':
        suggestions.push(`Add descriptive text to the empty h${issue.actualLevel} element or remove it`);
        break;
    }
  });
  
  return suggestions;
}
