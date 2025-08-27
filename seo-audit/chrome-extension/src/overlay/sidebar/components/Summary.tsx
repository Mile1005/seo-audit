import { h } from 'preact';
import { AnalysisResult, Category } from '../../../types';

interface Props {
  result: AnalysisResult | null;
  visibleCategories: Record<Category, boolean>;
  toggleCategory: (cat: Category) => void;
  exportCSV: () => void;
  exportJSON: () => void;
  diagnostics?: any;
  rerunAnalysis?: () => void;
}

export default function Summary({ result, visibleCategories, toggleCategory, exportCSV, exportJSON, diagnostics, rerunAnalysis }: Props) {
  const serp = result?.summary?.serpPreview;
  const headingAns = result?.summary?.headingAnswerability;
  const link = result?.summary?.linkAnalysis;
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={exportCSV} style={{ marginRight: 8 }}>Export CSV</button>
        <button onClick={exportJSON}>Export JSON</button>
      </div>
      {serp && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 'bold' }}>SERP Preview</div>
          <div style={{ maxWidth: 600, fontSize: 18, fontWeight: 'bold', color: '#2563eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{serp.titleTrunc}</div>
          <div style={{ maxWidth: 920, fontSize: 14, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{serp.metaTrunc}</div>
        </div>
      )}
      {headingAns && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 'bold' }}>Heading Answerability</div>
          <div>Score: {headingAns.score} ({headingAns.matches} of {headingAns.total} headings look answerable)</div>
        </div>
      )}
      {link && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 'bold' }}>Link Analysis</div>
          <div>Total links: {link.total}, Internal: {link.internal}, External: {link.external}</div>
          <div>Internal ratio: {(link.ratio * 100).toFixed(1)}%</div>
          <div>Unique anchor texts: {link.unique}, Empty: {link.empty}, Generic: {link.generic}</div>
        </div>
      )}
      {/* ...rest of summary UI... */}
    </div>
  );
}
