export type Severity = 'error' | 'warning' | 'info';
export type Category = 'error' | 'alert' | 'feature' | 'structure' | 'aria';

export interface Issue {
  id: string;
  category: Category;
  severity: Severity;
  ruleId: string;
  message: string;
  why: string;
  recommendation: string;
  selector: string;
  snippet?: string;
  wcagRef?: string;
  bbox?: DOMRect;
}

export interface AnalysisResult {
  issues: Issue[];
  summary: Record<string, any>;
  structure: Record<string, any>;
  order: Record<string, any>;
  contrast: Record<string, any>;
}

export interface RuleMeta {
  ruleId: string;
  wcagRef?: string;
  title: string;
  description: string;
  category: Category;
  defaultSeverity: Severity;
}

export const RULES: Record<string, RuleMeta> = {
  'missing-alt': {
    ruleId: 'missing-alt',
    wcagRef: '1.1.1',
    title: 'Image missing alt text',
    description: 'All <img> elements must have meaningful alt attributes.',
    category: 'error',
    defaultSeverity: 'error',
  },
  'low-contrast': {
    ruleId: 'low-contrast',
    wcagRef: '1.4.3',
    title: 'Low color contrast',
    description: 'Text elements must have sufficient color contrast.',
    category: 'alert',
    defaultSeverity: 'warning',
  },
  // Add more rules as needed...
};
