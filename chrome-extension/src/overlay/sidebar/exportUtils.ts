import { AnalysisResult } from '../../types';

export function exportAnalysisCSV(result: AnalysisResult) {
  const rows = [
    ['category', 'severity', 'ruleId', 'message', 'selector', 'wcagRef', 'recommendation'],
    ...result.issues.map(i => [
      i.category,
      i.severity,
      i.ruleId,
      i.message,
      i.selector,
      i.wcagRef || '',
      i.recommendation
    ])
  ];
  const csv = rows.map(r => r.map(v => '"' + (v || '').replace(/"/g, '""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'seo-audit-issues.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAnalysisJSON(result: AnalysisResult) {
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'seo-audit-analysis.json';
  a.click();
  URL.revokeObjectURL(url);
}
