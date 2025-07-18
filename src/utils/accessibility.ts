// Accessibility utilities for error handling and ARIA announcements

export interface ErrorState {
  hasError: boolean;
  message: string;
  fieldId?: string;
}

// Announce error messages to screen readers
export const announceError = (message: string) => {
  // Create live region for announcements if it doesn't exist
  let liveRegion = document.getElementById('accessibility-announcer');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'accessibility-announcer';
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
  }
  
  // Clear previous content and announce new message
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);
};

// Announce success messages to screen readers
export const announceSuccess = (message: string) => {
  let liveRegion = document.getElementById('accessibility-announcer-polite');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'accessibility-announcer-polite';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
  }
  
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);
};

// Generate unique IDs for form elements
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create accessible error message component props
export const createErrorProps = (error: ErrorState, fieldId: string) => {
  if (!error.hasError) return {};
  
  const errorId = `${fieldId}-error`;
  return {
    'aria-invalid': true,
    'aria-describedby': errorId,
    errorId,
    errorMessage: error.message
  };
};

// Validation functions
export const validateRequired = (value: string | null | undefined, fieldName: string): ErrorState => {
  if (!value || value.trim() === '') {
    return {
      hasError: true,
      message: `${fieldName} er påkrevd`
    };
  }
  return { hasError: false, message: '' };
};

// Focus management for accessibility
export const focusElement = (elementId: string, delay: number = 0) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }, delay);
};

// Trap focus within a modal or dialog
export const trapFocus = (containerElement: HTMLElement) => {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  containerElement.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  firstElement?.focus();
  
  return () => {
    containerElement.removeEventListener('keydown', handleTabKey);
  };
};
