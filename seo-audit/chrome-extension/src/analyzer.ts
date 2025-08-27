// Types for extracted SEO data (import or redefine as needed)
export interface SEOData {
  page: {
    title: string;
    metaDescription: string | null;
    canonical: string | null;
    robots: string | null;
    viewport: string | null;
    openGraph: Record<string, string>;
    twitterCard: Record<string, string>;
    jsonLdTypes: string[];
  };
  headings: { tag: string; text: string }[];
  headingCounts: Record<string, number>;
  images: { src: string; alt: string; hasAlt: boolean }[];
  links: { href: string; text: string; rel: string | null; isInternal: boolean }[];
  wordCount: number;
  readability: {
    fleschKincaid: number | null;
    readingTimeMin: number;
  };
  coreWebVitals: {
    lcp: number | null;
    cls: number | null;
    inp: number | null;
  };
}

export interface Issue {
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  fix: string;
}

export interface QuickWin {
  action: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  score: number;
  issues: Issue[];
  quickWins: QuickWin[];
  metrics: Record<string, any>;
}

// --- Analysis Functions ---

export function analyzeTitleTag(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const title = data.page.title || '';
  const len = title.length;
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (len < 30 || len > 60) {
    score -= 40;
    issues.push({ severity: 'High', description: 'Title tag should be 30-60 characters.', fix: 'Adjust title length.' });
    quickWins.push({ action: 'Edit title to 30-60 chars', impact: 'High' });
  }
  if (!title) {
    score -= 60;
    issues.push({ severity: 'High', description: 'Missing title tag.', fix: 'Add a title tag.' });
    quickWins.push({ action: 'Add a title tag', impact: 'High' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { length: len, value: title } };
}

export function analyzeMetaDescription(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const desc = data.page.metaDescription || '';
  const len = desc.length;
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (!desc) {
    score -= 60;
    issues.push({ severity: 'High', description: 'Missing meta description.', fix: 'Add a meta description.' });
    quickWins.push({ action: 'Add a meta description', impact: 'High' });
  } else if (len < 120 || len > 160) {
    score -= 40;
    issues.push({ severity: 'Medium', description: 'Meta description should be 120-160 characters.', fix: 'Adjust meta description length.' });
    quickWins.push({ action: 'Edit meta description to 120-160 chars', impact: 'Medium' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { length: len, value: desc } };
}

export function analyzeHeadingStructure(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const h1s = data.headings.filter(h => h.tag === 'H1');
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (h1s.length !== 1) {
    score -= 50;
    issues.push({ severity: 'High', description: 'Page should have exactly one H1.', fix: 'Add a single H1.' });
    quickWins.push({ action: 'Ensure one H1', impact: 'High' });
  }
  // Check heading hierarchy (simple check)
  const tags = data.headings.map(h => h.tag);
  if (tags.join(' ').match(/H2.*H1/)) {
    score -= 20;
    issues.push({ severity: 'Medium', description: 'Heading hierarchy is incorrect.', fix: 'Fix heading order.' });
    quickWins.push({ action: 'Fix heading hierarchy', impact: 'Medium' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { h1Count: h1s.length, headings: data.headings } };
}

export function analyzeImages(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const total = data.images.length;
  const missingAlt = data.images.filter(img => !img.hasAlt).length;
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (missingAlt > 0) {
    score -= 60 * (missingAlt / total);
    issues.push({ severity: 'High', description: `${missingAlt} images missing alt text.`, fix: 'Add alt text to all images.' });
    quickWins.push({ action: 'Add alt text to images', impact: 'High' });
  }
  // File size check omitted (not available client-side)
  return { score: Math.max(0, score), issues, quickWins, metrics: { total, missingAlt } };
}

export function analyzeLinks(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const total = data.links.length;
  const internal = data.links.filter(l => l.isInternal).length;
  const external = total - internal;
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (total < 5) {
    score -= 30;
    issues.push({ severity: 'Low', description: 'Not enough links on page.', fix: 'Add more links.' });
    quickWins.push({ action: 'Add more links', impact: 'Low' });
  }
  // Broken link detection (basic)
  // Note: Real broken link check requires async fetch, here we just check for empty href
  const broken = data.links.filter(l => !l.href || l.href === '#').length;
  if (broken > 0) {
    score -= 40;
    issues.push({ severity: 'Medium', description: `${broken} broken links detected.`, fix: 'Fix or remove broken links.' });
    quickWins.push({ action: 'Fix broken links', impact: 'Medium' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { total, internal, external, broken } };
}

export function analyzePageSpeed(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  const { lcp, cls, inp } = data.coreWebVitals;
  if (lcp && lcp > 2500) {
    score -= 30;
    issues.push({ severity: 'High', description: 'LCP is above 2.5s.', fix: 'Optimize largest contentful paint.' });
    quickWins.push({ action: 'Improve LCP', impact: 'High' });
  }
  if (cls && cls > 0.1) {
    score -= 20;
    issues.push({ severity: 'Medium', description: 'CLS is above 0.1.', fix: 'Reduce layout shifts.' });
    quickWins.push({ action: 'Reduce CLS', impact: 'Medium' });
  }
  if (inp && inp > 200) {
    score -= 20;
    issues.push({ severity: 'Medium', description: 'INP is above 200ms.', fix: 'Improve input responsiveness.' });
    quickWins.push({ action: 'Improve INP', impact: 'Medium' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { lcp, cls, inp } };
}

export function analyzeSchema(data: SEOData): { score: number; issues: Issue[]; quickWins: QuickWin[]; metrics: any } {
  const types = data.page.jsonLdTypes;
  let score = 100;
  const issues: Issue[] = [];
  const quickWins: QuickWin[] = [];
  if (!types.length) {
    score -= 60;
    issues.push({ severity: 'Medium', description: 'No structured data detected.', fix: 'Add JSON-LD schema.' });
    quickWins.push({ action: 'Add structured data', impact: 'Medium' });
  }
  return { score: Math.max(0, score), issues, quickWins, metrics: { types } };
}

export function calculateOverallScore(data: SEOData): AnalysisResult {
  // Weights: Title (20%), Meta (15%), Headings (15%), Content (20%), Images (10%), Links (10%), Performance (10%)
  // For demo, Content = word count/readability (not deeply analyzed here)
  const title = analyzeTitleTag(data);
  const meta = analyzeMetaDescription(data);
  const headings = analyzeHeadingStructure(data);
  const images = analyzeImages(data);
  const links = analyzeLinks(data);
  const perf = analyzePageSpeed(data);
  const schema = analyzeSchema(data);
  // Content: basic score for word count > 300
  let contentScore = 100;
  const contentIssues: Issue[] = [];
  const contentQuickWins: QuickWin[] = [];
  if (data.wordCount < 300) {
    contentScore -= 60;
    contentIssues.push({ severity: 'High', description: 'Low word count (<300).', fix: 'Add more content.' });
    contentQuickWins.push({ action: 'Increase word count', impact: 'High' });
  }
  // Weighted sum
  const score = Math.round(
    0.2 * title.score +
    0.15 * meta.score +
    0.15 * headings.score +
    0.2 * contentScore +
    0.1 * images.score +
    0.1 * links.score +
    0.1 * perf.score
  );
  // Collect all issues/quick wins
  const issues = [
    ...title.issues,
    ...meta.issues,
    ...headings.issues,
    ...images.issues,
    ...links.issues,
    ...perf.issues,
    ...schema.issues,
    ...contentIssues
  ];
  const quickWins = [
    ...title.quickWins,
    ...meta.quickWins,
    ...headings.quickWins,
    ...images.quickWins,
    ...links.quickWins,
    ...perf.quickWins,
    ...schema.quickWins,
    ...contentQuickWins
  ];
  const metrics = {
    title: title.metrics,
    meta: meta.metrics,
    headings: headings.metrics,
    images: images.metrics,
    links: links.metrics,
    performance: perf.metrics,
    schema: schema.metrics,
    content: { wordCount: data.wordCount }
  };
  return { score, issues, quickWins, metrics };
}
