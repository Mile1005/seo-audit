import { SEOData } from './analyzer';
import { Issue, QuickWin } from './analyzer';

export function exportSEOToCSV(seo: SEOData, issues: Issue[], quickWins: QuickWin[], url: string) {
  const rows: string[][] = [];
  // Header
  rows.push(['Element', 'Status', 'Value', 'Recommendation', 'Priority', 'Category']);
  // Summary
  rows.push(['Page Title', 'OK', seo.page.title, '', '', 'Summary']);
  rows.push(['Meta Description', seo.page.metaDescription ? 'OK' : 'Missing', seo.page.metaDescription || '', seo.page.metaDescription ? '' : 'Add a meta description', seo.page.metaDescription ? '' : 'High', 'Summary']);
  rows.push(['Canonical', seo.page.canonical ? 'OK' : 'Missing', seo.page.canonical || '', seo.page.canonical ? '' : 'Add a canonical URL', seo.page.canonical ? '' : 'Medium', 'Summary']);
  rows.push(['Word Count', 'OK', String(seo.wordCount), '', '', 'Summary']);
  rows.push(['Flesch-Kincaid', 'OK', String(seo.readability.fleschKincaid ?? ''), '', '', 'Summary']);
  rows.push(['LCP', seo.coreWebVitals.lcp !== null ? 'OK' : 'Missing', String(seo.coreWebVitals.lcp ?? ''), '', '', 'Performance']);
  rows.push(['CLS', seo.coreWebVitals.cls !== null ? 'OK' : 'Missing', String(seo.coreWebVitals.cls ?? ''), '', '', 'Performance']);
  rows.push(['INP', seo.coreWebVitals.inp !== null ? 'OK' : 'Missing', String(seo.coreWebVitals.inp ?? ''), '', '', 'Performance']);
  // Meta tags
  Object.entries(seo.page.openGraph).forEach(([k, v]) => {
    rows.push([`OpenGraph: ${k}`, 'OK', v, '', '', 'Meta']);
  });
  Object.entries(seo.page.twitterCard).forEach(([k, v]) => {
    rows.push([`Twitter: ${k}`, 'OK', v, '', '', 'Meta']);
  });
  // Headings
  Object.entries(seo.headingCounts).forEach(([tag, count]) => {
    rows.push([`Heading ${tag}`, 'OK', String(count), '', '', 'Content']);
  });
  seo.headings.forEach(h => {
    rows.push(['Heading', 'OK', `${h.tag}: ${h.text}`, '', '', 'Content']);
  });
  // Images
  seo.images.forEach(img => {
    rows.push(['Image', img.hasAlt ? 'OK' : 'Missing alt', img.src, img.hasAlt ? '' : 'Add alt text', img.hasAlt ? '' : 'High', 'Images']);
  });
  // Links
  seo.links.forEach(link => {
    rows.push(['Link', 'OK', `${link.href} (${link.text})`, '', '', link.isInternal ? 'Internal' : 'External']);
  });
  // Issues
  issues.forEach(issue => {
    rows.push(['Issue', 'Problem', '', issue.fix, issue.severity, 'Issues']);
  });
  // Quick Wins
  quickWins.forEach(win => {
    rows.push(['Quick Win', 'Actionable', '', win.action, win.impact, 'Quick Wins']);
  });
  // CSV encoding
  const csv = rows.map(r => r.map(v => '"' + (v || '').replace(/"/g, '""').replace(/\n/g, ' ') + '"').join(',')).join('\n');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const safeUrl = url.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 40);
  const filename = `seo-analysis_${safeUrl}_${ts}.csv`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
