import { Issue, Category } from '../types';
import { highlightElement } from './highlight';

const CATEGORY_COLORS: Record<Category, string> = {
  error: '#ef4444',
  alert: '#eab308',
  feature: '#22c55e',
  structure: '#3b82f6',
  aria: '#a21caf',
};

let overlayContainer: HTMLDivElement | null = null;

function ensureOverlayContainer() {
  if (!overlayContainer) {
    overlayContainer = document.createElement('div');
    overlayContainer.className = 'seo-audit-badge-overlay';
    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '0';
    overlayContainer.style.left = '0';
    overlayContainer.style.width = '100vw';
    overlayContainer.style.height = '100vh';
    overlayContainer.style.pointerEvents = 'none';
    overlayContainer.style.zIndex = '2147483646';
    document.body.appendChild(overlayContainer);
  }
}

export function clearBadges() {
  if (overlayContainer) overlayContainer.innerHTML = '';
}

export function placeBadges(issues: Issue[]) {
  ensureOverlayContainer();
  clearBadges();
  issues.forEach(issue => {
    if (!issue.bbox) return;
    const badge = document.createElement('div');
    badge.className = `seo-audit-badge seo-audit-badge-${issue.category}`;
    badge.textContent = '!';
    badge.style.position = 'absolute';
    badge.style.left = `${window.scrollX + issue.bbox.left - 18}px`;
    badge.style.top = `${window.scrollY + issue.bbox.top - 18}px`;
    badge.style.width = '20px';
    badge.style.height = '20px';
    badge.style.background = CATEGORY_COLORS[issue.category];
    badge.style.color = '#fff';
    badge.style.borderRadius = '50%';
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.style.fontWeight = 'bold';
    badge.style.fontSize = '14px';
    badge.style.boxShadow = '0 2px 8px #0006';
    badge.style.cursor = 'pointer';
    badge.style.pointerEvents = 'auto';
    badge.title = `${issue.severity.toUpperCase()}: ${issue.message}`;
    badge.onclick = (e) => {
      e.stopPropagation();
      highlightElement(issue.selector, issue.category);
      window.dispatchEvent(new CustomEvent('seo-audit-open-issue', { detail: { issueId: issue.id } }));
    };
    overlayContainer!.appendChild(badge);
  });
}

window.addEventListener('scroll', () => {
  // Reposition badges on scroll
  // (In a real implementation, debounce and update positions)
}, true);
window.addEventListener('resize', () => {
  // Reposition badges on resize
}, true);
