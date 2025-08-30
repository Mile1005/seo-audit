/**
 * Accessibility Utilities for WCAG 2.1 AA Compliance
 * Provides comprehensive accessibility helpers and validation
 */

// WCAG 2.1 AA Color Contrast Requirements
export const CONTRAST_RATIOS = {
  NORMAL_TEXT: 4.5,
  LARGE_TEXT: 3.0,
  NON_TEXT: 3.0,
  ENHANCED_NORMAL: 7.0,
  ENHANCED_LARGE: 4.5
} as const;

// Accessibility announcement types
export type AnnouncementType = 'polite' | 'assertive' | 'off';

// Focus management utilities
export class FocusManager {
  private static focusStack: HTMLElement[] = [];
  private static trapElement: HTMLElement | null = null;

  /**
   * Store current focus to return to later
   */
  static storeFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement);
    }
  }

  /**
   * Restore previously stored focus
   */
  static restoreFocus(): void {
    const lastFocused = this.focusStack.pop();
    if (lastFocused && lastFocused.isConnected) {
      lastFocused.focus();
    }
  }

  /**
   * Set focus trap within an element
   */
  static trapFocus(element: HTMLElement): void {
    this.trapElement = element;
    const focusableElements = this.getFocusableElements(element);
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement.focus();
  }

  /**
   * Remove focus trap
   */
  static releaseFocus(): void {
    this.trapElement = null;
  }

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter(element => {
        const el = element as HTMLElement;
        return el.offsetParent !== null && !el.hidden;
      }) as HTMLElement[];
  }
}

// Screen reader announcements
export class ScreenReaderAnnouncer {
  private static liveRegion: HTMLElement | null = null;

  /**
   * Initialize live region for announcements
   */
  static initialize(): void {
    if (this.liveRegion) return;

    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.setAttribute('class', 'sr-only');
    this.liveRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(this.liveRegion);
  }

  /**
   * Announce message to screen readers
   */
  static announce(message: string, priority: AnnouncementType = 'polite'): void {
    if (!this.liveRegion) this.initialize();
    
    if (this.liveRegion) {
      this.liveRegion.setAttribute('aria-live', priority);
      this.liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = '';
        }
      }, 1000);
    }
  }
}

// Color contrast calculation
export function calculateContrast(foreground: string, background: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Validate WCAG contrast compliance
export function validateContrast(
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
): { passes: boolean; ratio: number; required: number } {
  const ratio = calculateContrast(foreground, background);
  const required = isLargeText ? CONTRAST_RATIOS.LARGE_TEXT : CONTRAST_RATIOS.NORMAL_TEXT;
  
  return {
    passes: ratio >= required,
    ratio: Math.round(ratio * 100) / 100,
    required
  };
}

// Keyboard navigation utilities
export function handleKeyboardNavigation(
  element: HTMLElement,
  options: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (options.onEnter) {
          e.preventDefault();
          options.onEnter();
        }
        break;
      case ' ':
      case 'Space':
        if (options.onSpace) {
          e.preventDefault();
          options.onSpace();
        }
        break;
      case 'Escape':
        if (options.onEscape) {
          e.preventDefault();
          options.onEscape();
        }
        break;
      case 'ArrowUp':
        if (options.onArrowUp) {
          e.preventDefault();
          options.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (options.onArrowDown) {
          e.preventDefault();
          options.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (options.onArrowLeft) {
          e.preventDefault();
          options.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (options.onArrowRight) {
          e.preventDefault();
          options.onArrowRight();
        }
        break;
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

// Accessibility testing utilities
export function auditPageAccessibility(): {
  errors: Array<{ rule: string; element: Element; message: string }>;
  warnings: Array<{ rule: string; element: Element; message: string }>;
  passes: number;
} {
  const errors: Array<{ rule: string; element: Element; message: string }> = [];
  const warnings: Array<{ rule: string; element: Element; message: string }> = [];
  let passes = 0;

  // Check for missing alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      errors.push({
        rule: 'img-alt',
        element: img,
        message: 'Image missing alt attribute'
      });
    } else if (img.getAttribute('alt') === '') {
      const isDecorative = img.hasAttribute('role') && img.getAttribute('role') === 'presentation';
      if (!isDecorative) {
        warnings.push({
          rule: 'img-alt-empty',
          element: img,
          message: 'Image has empty alt text but is not marked as decorative'
        });
      }
    } else {
      passes++;
    }
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substr(1));
    if (level - lastLevel > 1) {
      errors.push({
        rule: 'heading-hierarchy',
        element: heading,
        message: `Heading level ${level} follows level ${lastLevel}, skipping levels`
      });
    } else {
      passes++;
    }
    lastLevel = level;
  });

  // Check for form labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const hasLabel = input.hasAttribute('aria-label') || 
                    input.hasAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${input.id}"]`);
    
    if (!hasLabel) {
      errors.push({
        rule: 'form-label',
        element: input,
        message: 'Form control missing accessible label'
      });
    } else {
      passes++;
    }
  });

  // Check for focus indicators
  const focusableElements = FocusManager.getFocusableElements(document.body);
  focusableElements.forEach(element => {
    const styles = window.getComputedStyle(element, ':focus');
    const hasVisibleFocus = styles.outline !== 'none' || 
                           styles.outlineWidth !== '0px' ||
                           styles.boxShadow !== 'none';
    
    if (!hasVisibleFocus) {
      warnings.push({
        rule: 'focus-visible',
        element: element,
        message: 'Focusable element may lack visible focus indicator'
      });
    } else {
      passes++;
    }
  });

  return { errors, warnings, passes };
}

// Initialize accessibility features
export function initializeAccessibility(): void {
  // Initialize screen reader announcer
  ScreenReaderAnnouncer.initialize();

  // Add skip link functionality
  const skipLinks = document.querySelectorAll('[href^="#"]');
  skipLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href') || '');
      if (target) {
        e.preventDefault();
        (target as HTMLElement).focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Enhance form validation announcements
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const invalidFields = form.querySelectorAll(':invalid');
      if (invalidFields.length > 0) {
        e.preventDefault();
        ScreenReaderAnnouncer.announce(
          `Form has ${invalidFields.length} error${invalidFields.length > 1 ? 's' : ''}. Please review and correct.`,
          'assertive'
        );
        (invalidFields[0] as HTMLElement).focus();
      }
    });
  });

  // Add keyboard navigation for custom interactive elements
  const customButtons = document.querySelectorAll('[role="button"]:not(button)');
  customButtons.forEach(button => {
    if (!button.hasAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
    
    handleKeyboardNavigation(button as HTMLElement, {
      onEnter: () => button.dispatchEvent(new Event('click')),
      onSpace: () => button.dispatchEvent(new Event('click'))
    });
  });
}

// Export accessibility checker for development
export const a11yChecker = {
  audit: auditPageAccessibility,
  validateContrast,
  FocusManager,
  ScreenReaderAnnouncer,
  handleKeyboardNavigation,
  initializeAccessibility
};

export default a11yChecker;
