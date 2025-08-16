import { SEOData } from './analyzer';
import { Issue, QuickWin } from './analyzer';

export function exportSEOToCSV(seo: SEOData, issues: Issue[], quickWins: QuickWin[], url: string) {
  const rows: string[][] = [];
  // Add SEO elements
  rows.push(['Element', 'Status', 'Value', 'Recommendation', 'Priority']);
  rows.push(['Title', seo.page.title ? 'OK' : 'Missing', seo.page.title || '', seo.page.title ? '' : 'Add a title tag', seo.page.title ? '' : 'High']);
  rows.push(['Meta Description', seo.page.metaDescription ? 'OK' : 'Missing', seo.page.metaDescription || '', seo.page.metaDescription ? '' : 'Add a meta description', seo.page.metaDescription ? '' : 'High']);
  rows.push(['Canonical', seo.page.canonical ? 'OK' : 'Missing', seo.page.canonical || '', seo.page.canonical ? '' : 'Add a canonical URL', seo.page.canonical ? '' : 'Medium']);
  // Add issues
  for (const issue of issues) {
    rows.push(['Issue', 'Problem', '', issue.fix, issue.severity]);
  }
  // Add quick wins
  for (const win of quickWins) {
    rows.push(['Quick Win', 'Actionable', '', win.action, win.impact]);
  }
  // Add headings, images, links summary
  rows.push(['Headings', 'Count', Object.entries(seo.headingCounts).map(([k,v])=>`${k}:${v}`).join('; '), '', '']);
  rows.push(['Images', 'Total', String(seo.images.length), '', '']);
  rows.push(['Images', 'Missing Alt', String(seo.images.filter(i=>!i.hasAlt).length), 'Add alt text', 'High']);
  rows.push(['Links', 'Total', String(seo.links.length), '', '']);
  rows.push(['Links', 'Internal', String(seo.links.filter(l=>l.isInternal).length), '', '']);
  rows.push(['Links', 'External', String(seo.links.filter(l=>!l.isInternal).length), '', '']);
  // CSV encoding
  const csv = rows.map(r => r.map(v => '"' + (v || '').replace(/"/g, '""') + '"').join(',')).join('\n');
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
