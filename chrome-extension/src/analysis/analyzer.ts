import { Issue, AnalysisResult, RULES, Severity, Category } from '../types';
import { checkContrast } from './contrast';
import { getStructure } from './structure';

function getIssues(): Issue[] {
  const issues: Issue[] = [];

  // Images: missing/empty alt, decorative detection
  document.querySelectorAll('img').forEach((img, i) => {
    const alt = img.getAttribute('alt');
    const role = img.getAttribute('role');
    const ariaHidden = img.getAttribute('aria-hidden');
    const isDecorative = role === 'presentation' || ariaHidden === 'true';
    if (!isDecorative) {
      if (alt === null || alt === '') {
        issues.push({
          id: `img-alt-${i}`,
          category: 'error',
          severity: 'error',
          ruleId: 'missing-alt',
          message: 'Image missing alt text',
          why: 'Images must have alt text for accessibility.',
          recommendation: 'Add a meaningful alt attribute.',
          selector: getSelector(img),
          snippet: img.outerHTML,
          wcagRef: RULES['missing-alt'].wcagRef,
          bbox: img.getBoundingClientRect(),
        });
      }
    }
  });

  // Headings: H1 presence, hierarchy, unique H1
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const h1s = headings.filter(h => h.tagName.toLowerCase() === 'h1');
  if (h1s.length === 0) {
    issues.push({
      id: 'heading-no-h1',
      category: 'structure',
      severity: 'warning',
      ruleId: 'no-h1',
      message: 'No <h1> found',
      why: 'Every page should have a single <h1> for structure.',
      recommendation: 'Add a unique <h1> heading.',
      selector: 'body',
    });
  }
  if (h1s.length > 1) {
    issues.push({
      id: 'heading-multi-h1',
      category: 'structure',
      severity: 'warning',
      ruleId: 'multi-h1',
      message: 'Multiple <h1> elements found',
      why: 'There should be only one <h1> per page.',
      recommendation: 'Keep only one <h1>.',
      selector: h1s.map(h => getSelector(h)).join(', '),
    });
  }
  // Heading hierarchy (no skips)
  let lastLevel = 0;
  headings.forEach((h, i) => {
    const level = parseInt(h.tagName[1]);
    if (lastLevel && level > lastLevel + 1) {
      issues.push({
        id: `heading-skip-${i}`,
        category: 'structure',
        severity: 'warning',
        ruleId: 'heading-skip',
        message: `Heading level skipped: ${h.tagName}`,
        why: 'Headings should not skip levels.',
        recommendation: 'Use proper heading order.',
        selector: getSelector(h),
      });
    }
    lastLevel = level;
  });

  // Landmarks: main/nav/header/footer/aside; flag missing main; duplicate landmarks
  const landmarks = ['main', 'nav', 'header', 'footer', 'aside'];
  let foundMain = false;
  landmarks.forEach(tag => {
    const els = document.querySelectorAll(tag);
    if (tag === 'main' && els.length > 0) foundMain = true;
    if (els.length > 1) {
      issues.push({
        id: `landmark-dup-${tag}`,
        category: 'structure',
        severity: 'warning',
        ruleId: 'landmark-dup',
        message: `Duplicate <${tag}> landmarks`,
        why: `There should be only one <${tag}> landmark per page.`,
        recommendation: `Keep only one <${tag}> landmark element per page.`,
        selector: Array.from(els).map(getSelector).join(', '),
      });
    }
  });
  if (!foundMain) {
    issues.push({
      id: 'landmark-no-main',
      category: 'structure',
      severity: 'warning',
      ruleId: 'no-main',
      message: 'No <main> landmark found',
      why: 'Every page should have a <main> landmark.',
      recommendation: 'Add a <main> element.',
      selector: 'body',
    });
  }

  // Forms: label/for association; aria-labelledby; fieldset/legend
  document.querySelectorAll('input, select, textarea').forEach((el, i) => {
    const id = el.getAttribute('id');
    const label = id && document.querySelector(`label[for="${id}"]`);
    const ariaLabelled = el.getAttribute('aria-labelledby');
    if (!label && !ariaLabelled) {
      issues.push({
        id: `form-label-${i}`,
        category: 'aria',
        severity: 'warning',
        ruleId: 'form-label',
        message: 'Form field missing label',
        why: 'Form fields must have associated labels.',
        recommendation: 'Add a <label> or aria-labelledby.',
        selector: getSelector(el),
      });
    }
  });
  document.querySelectorAll('fieldset').forEach((fs, i) => {
    const legend = fs.querySelector('legend');
    if (!legend) {
      issues.push({
        id: `fieldset-no-legend-${i}`,
        category: 'aria',
        severity: 'info',
        ruleId: 'fieldset-no-legend',
        message: 'Fieldset missing legend',
        why: 'Fieldsets should have a <legend> for context.',
        recommendation: 'Add a <legend> to the fieldset.',
        selector: getSelector(fs),
      });
    }
  });

  // Links/Buttons: accessible name; empty anchors; redundant text
  document.querySelectorAll('a,button').forEach((el, i) => {
    const text = el.textContent?.trim() || '';
    if (el.tagName.toLowerCase() === 'a' && text === '') {
      issues.push({
        id: `anchor-empty-${i}`,
        category: 'error',
        severity: 'error',
        ruleId: 'anchor-empty',
        message: 'Anchor has no accessible name',
        why: 'Links must have accessible text.',
        recommendation: 'Add descriptive text to the link.',
        selector: getSelector(el),
      });
    }
    if (/click here|read more|more info/i.test(text)) {
      issues.push({
        id: `anchor-redundant-${i}`,
        category: 'alert',
        severity: 'info',
        ruleId: 'anchor-redundant',
        message: 'Link/button has redundant text',
        why: 'Avoid generic link text.',
        recommendation: 'Use descriptive link text.',
        selector: getSelector(el),
      });
    }
  });

  // ARIA: invalid roles, aria-* on wrong elements, role conflicts
  document.querySelectorAll('[role]').forEach((el, i) => {
    const role = el.getAttribute('role');
    // TODO: Add a list of valid roles and check
    if (!role || !isValidRole(role)) {
      issues.push({
        id: `aria-invalid-role-${i}`,
        category: 'aria',
        severity: 'warning',
        ruleId: 'aria-invalid-role',
        message: `Invalid ARIA role: ${role}`,
        why: 'Element has an invalid ARIA role.',
        recommendation: 'Use a valid ARIA role.',
        selector: getSelector(el),
      });
    }
  });

  // Contrast: use checkContrast utility
  const contrastIssues = checkContrast();
  issues.push(...contrastIssues);

  // Keyboard order: focusable elements, tab order
  // (Stub: real implementation would check tab order sequence)
  // TODO: Implement full tab order analysis

  return issues;
}

function getSelector(el: Element): string {
  if (!el) return '';
  let sel = el.tagName.toLowerCase();
  if (el.id) sel += `#${el.id}`;
  if (el.className && typeof el.className === 'string') sel += '.' + el.className.split(' ').join('.');
  return sel;
}

function isValidRole(role: string): boolean {
  // Minimal valid ARIA roles list (expand as needed)
  return [
    'button', 'checkbox', 'dialog', 'grid', 'link', 'listbox', 'menu', 'menubar', 'menuitem', 'option', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'tabpanel', 'textbox', 'timer', 'tooltip', 'tree', 'treeitem', 'main', 'navigation', 'banner', 'complementary', 'contentinfo', 'form', 'region', 'search', 'alert', 'log', 'marquee', 'status', 'timer', 'alertdialog', 'application', 'article', 'cell', 'columnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'row', 'rowgroup', 'rowheader', 'separator'
  ].includes(role);
}

function getSerpPreview() {
  // Simulate SERP truncation: 600px for title, 920px for meta (approx)
  const title = document.title || '';
  const meta = (document.querySelector('meta[name="description"]')?.getAttribute('content')) || '';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = 'bold 18px Arial';
  let titlePx = 0, titleTrunc = title;
  for (let i = 0; i < title.length; i++) {
    titlePx = ctx.measureText(title.slice(0, i + 1)).width;
    if (titlePx > 600) { titleTrunc = title.slice(0, i) + '…'; break; }
  }
  ctx.font = 'normal 14px Arial';
  let metaPx = 0, metaTrunc = meta;
  for (let i = 0; i < meta.length; i++) {
    metaPx = ctx.measureText(meta.slice(0, i + 1)).width;
    if (metaPx > 920) { metaTrunc = meta.slice(0, i) + '…'; break; }
  }
  return { title, titleTrunc, meta, metaTrunc };
}

function getHeadingAnswerability(headings) {
  // Heuristic: question/definition patterns
  const patterns = [/\bwhat is\b/i, /\bhow to\b/i, /\bwhy\b/i, /\bwho\b/i, /\bwhen\b/i, /\bwhere\b/i, /\bdefinition\b/i, /\bmeaning\b/i, /\bexplained\b/i, /\bguide\b/i, /\bfaq\b/i, /\bquestion\b/i];
  let score = 0;
  let matches = 0;
  headings.forEach(h => {
    if (patterns.some(p => p.test(h.textContent || ''))) matches++;
  });
  if (headings.length) score = Math.round((matches / headings.length) * 100);
  return { score, matches, total: headings.length };
}

function getLinkAnalysis() {
  const links = Array.from(document.querySelectorAll('a[href]'));
  let internal = 0, external = 0;
  const anchorTexts: string[] = [];
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (/^https?:\/\//.test(href) && !href.includes(location.hostname)) external++;
    else internal++;
    anchorTexts.push((a.textContent || '').trim());
  });
  const ratio = links.length ? internal / links.length : 0;
  // Anchor text analysis: count unique, empty, generic
  const unique = new Set(anchorTexts.filter(Boolean)).size;
  const empty = anchorTexts.filter(t => !t).length;
  const generic = anchorTexts.filter(t => /click here|read more|more info/i.test(t)).length;
  return { total: links.length, internal, external, ratio, unique, empty, generic };
}

export function analyzeDOM(): AnalysisResult {
  const issues = getIssues();
  // Structure, order, contrast: stub for now
  const structure = getStructure();
  const order = {};
  const contrast = {};
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const summary = {
    errorCount: issues.filter(i => i.severity === 'error').length,
    warningCount: issues.filter(i => i.severity === 'warning').length,
    infoCount: issues.filter(i => i.severity === 'info').length,
    total: issues.length,
    serpPreview: getSerpPreview(),
    headingAnswerability: getHeadingAnswerability(headings),
    linkAnalysis: getLinkAnalysis(),
  };
  return { issues, summary, structure, order, contrast };
}
