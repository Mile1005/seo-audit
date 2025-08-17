import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { AnalysisResult, Issue } from '../../../types';

interface Props {
  result: AnalysisResult | null;
  focusIssueId?: string | null;
}

export default function Issues({ result, focusIssueId }: Props) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    if (focusIssueId && refs.current[focusIssueId]) {
      refs.current[focusIssueId]?.focus();
    }
  }, [focusIssueId]);
  if (!result) return <div>No issues found.</div>;
  return (
    <div role="list" aria-label="Issues list">
      {result.issues.map(issue => (
        <div
          key={issue.id}
          ref={el => (refs.current[issue.id] = el)}
          tabIndex={-1}
          role="listitem"
          aria-label={issue.message}
          style={{ marginBottom: 12, outline: 'none', background: '#23272e', borderRadius: 6, padding: 10 }}
        >
          <div style={{ fontWeight: 'bold' }}>{issue.message}</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>{issue.why}</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>{issue.recommendation}</div>
          {issue.wcagRef && <div style={{ fontSize: 12, color: '#6ee7b7' }}>WCAG: {issue.wcagRef}</div>}
          <div style={{ marginTop: 6 }}>
            <button aria-label="Locate issue" style={{ marginRight: 8 }} onClick={() => window.dispatchEvent(new CustomEvent('seo-audit-open-issue', { detail: { issueId: issue.id } }))}>Locate</button>
            <button aria-label="Copy selector" style={{ marginRight: 8 }} onClick={() => navigator.clipboard.writeText(issue.selector)}>Copy selector</button>
            <button aria-label="Copy fix" onClick={() => navigator.clipboard.writeText(issue.recommendation)}>Copy fix</button>
          </div>
        </div>
      ))}
    </div>
  );
}
