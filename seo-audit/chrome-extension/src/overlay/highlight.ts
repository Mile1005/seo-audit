import { Category } from '../types';

const CATEGORY_COLORS: Record<Category, string> = {
  error: '#ef4444',
  alert: '#eab308',
  feature: '#22c55e',
  structure: '#3b82f6',
  aria: '#a21caf',
};

let lastHighlight: HTMLElement | null = null;

export function highlightElement(selector: string, category: Category) {
  if (lastHighlight) {
    lastHighlight.remove();
    lastHighlight = null;
  }
  const el = document.querySelector(selector);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const highlight = document.createElement('div');
  highlight.className = 'seo-audit-highlight';
  highlight.style.position = 'fixed';
  highlight.style.left = `${window.scrollX + rect.left - 4}px`;
  highlight.style.top = `${window.scrollY + rect.top - 4}px`;
  highlight.style.width = `${rect.width + 8}px`;
  highlight.style.height = `${rect.height + 8}px`;
  highlight.style.border = `2px dashed ${CATEGORY_COLORS[category]}`;
  highlight.style.zIndex = '2147483647';
  highlight.style.pointerEvents = 'none';
  highlight.style.background = 'rgba(0,0,0,0.03)';

  // Label
  const label = document.createElement('div');
  label.textContent = category.toUpperCase();
  label.style.position = 'absolute';
  label.style.top = '-20px';
  label.style.left = '0';
  label.style.background = CATEGORY_COLORS[category];
  label.style.color = '#fff';
  label.style.fontSize = '12px';
  label.style.padding = '2px 8px';
  label.style.borderRadius = '4px';
  label.style.fontWeight = 'bold';
  highlight.appendChild(label);

  document.body.appendChild(highlight);
  lastHighlight = highlight;
  (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
}
