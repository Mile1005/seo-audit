import type { AuditResultV1 } from "./schemas";

type Parsed = {
  title: string | null;
  meta: string | null;
  canonical: string | null;
  h1: string | null;
  h2: string[];
  h3: string[];
  images: { src: string; alt: string | null }[];
  internalLinks: { href: string; anchor: string | null }[];
  jsonLdTypes: string[];
  textBlocks: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function computeTitleMetaScore(title: string | null, meta: string | null, keyword?: string) {
  let score = 100;
  if (!title) score -= 50;
  else {
    const len = title.length;
    if (len < 45 || len > 60) score -= 15;
    if (keyword && !new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i").test(title)) score -= 10;
  }
  if (!meta) score -= 35;
  else if (meta.length < 140 || meta.length > 160) score -= 10;
  return clamp(score);
}

function computeHeadingsScore(h1: string | null, h2: string[], h3: string[]) {
  let score = 100;
  if (!h1) score -= 40;
  if (h2.length < 1) score -= 20;
  if (h3.length > h2.length * 3) score -= 10;
  return clamp(score);
}

function computeAnswerabilityScore(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  let score = 100;
  if (words.length < 200) score -= 40;
  if (words.length < 800) score -= 10;
  // simple detection of list/table cues
  const hasBullets = /\b\*\s|\b-\s|<li>/i.test(text);
  const hasTable = /<table/i.test(text);
  if (!hasBullets) score -= 10;
  if (!hasTable) score -= 5;
  return clamp(score);
}

function computeStructureScore(text: string) {
  let score = 100;
  // penalize extremely long paragraphs
  const paras = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const hasLongPara = paras.some((p) => p.length > 800);
  if (hasLongPara) score -= 20;
  if (paras.length < 3) score -= 20;
  return clamp(score);
}

function computeSchemaScore(types: string[]) {
  let score = 100;
  if (types.length === 0) score -= 40;
  if (!types.some((t) => /Article|BlogPosting|HowTo|FAQPage/i.test(t))) score -= 20;
  return clamp(score);
}

function computeImagesScore(images: { alt: string | null }[]) {
  const total = images.length;
  if (total === 0) return 60; // neutral if no images
  const withAlt = images.filter((i) => i.alt && i.alt.trim().length >= 3).length;
  const pct = (withAlt / total) * 100;
  return clamp(Math.round(pct));
}

function computeInternalLinksScore(links: { anchor: string | null }[]) {
  let score = 100;
  if (links.length < 2) score -= 40;
  if (links.length > 20) score -= 10;
  const withAnchor = links.filter((l) => l.anchor && l.anchor.trim().length > 2);
  if (withAnchor.length / Math.max(1, links.length) < 0.7) score -= 15;
  return clamp(score);
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function calculateAudit(url: string, parsed: Parsed, opts: { keyword?: string }): Omit<AuditResultV1, "gsc_insights"> {
  const title_meta = computeTitleMetaScore(parsed.title, parsed.meta, opts.keyword);
  const headings = computeHeadingsScore(parsed.h1, parsed.h2, parsed.h3);
  const answerability = computeAnswerabilityScore(parsed.textBlocks);
  const structure = computeStructureScore(parsed.textBlocks);
  const schema = computeSchemaScore(parsed.jsonLdTypes);
  const images = computeImagesScore(parsed.images);
  const internal_links = computeInternalLinksScore(parsed.internalLinks);

  const overall = Math.round(
    0.2 * title_meta +
      0.15 * headings +
      0.2 * answerability +
      0.15 * structure +
      0.1 * schema +
      0.1 * images +
      0.1 * internal_links
  );

  const words = parsed.textBlocks.split(/\s+/).filter(Boolean);
  const stats = {
    word_count: words.length,
    reading_time_min: Math.round((words.length / 200) * 10) / 10,
    images_count: parsed.images.length,
    h2_count: parsed.h2.length,
    h3_count: parsed.h3.length,
    tables_count: (parsed.textBlocks.match(/<table/gi) || []).length,
    lists_count: (parsed.textBlocks.match(/<ul|<ol/gi) || []).length
  };

  const issues: AuditResultV1["issues"] = [] as any;

  if (!parsed.title || parsed.title.length < 45 || parsed.title.length > 60) {
    issues.push({
      id: "title_length",
      category: "title_meta",
      severity: "high",
      found: parsed.title || "(none)",
      why_it_matters: "Titles outside 45–60 chars can truncate or underperform.",
      recommendation: "Adjust title to 45–60 characters and include the primary keyword once.",
      snippet: parsed.title ? `<title>${parsed.title.slice(0, 60)}</title>` : null
    });
  }
  if (!parsed.meta || parsed.meta.length < 140 || parsed.meta.length > 160) {
    issues.push({
      id: "meta_length",
      category: "title_meta",
      severity: "medium",
      found: parsed.meta || "(none)",
      why_it_matters: "Meta descriptions influence CTR; optimal is 140–160 characters.",
      recommendation: "Provide a benefit-led meta description of 140–160 characters.",
      snippet: parsed.meta ? `<meta name="description" content="${parsed.meta.slice(0, 155)}" />` : null
    });
  }
  if (!parsed.h1) {
    issues.push({
      id: "h1_missing",
      category: "headings",
      severity: "high",
      found: "No H1",
      why_it_matters: "H1 communicates the primary topic and improves information scent.",
      recommendation: "Add a single descriptive H1 that matches search intent.",
      snippet: "<h1>Your primary page heading</h1>"
    });
  }
  if (parsed.images.length > 0) {
    const withAlt = parsed.images.filter((i) => i.alt && i.alt.trim().length >= 3).length;
    if (withAlt / parsed.images.length < 0.7) {
      issues.push({
        id: "image_alts",
        category: "images",
        severity: "medium",
        found: `${withAlt}/${parsed.images.length} with alt text`,
        why_it_matters: "Alt text improves accessibility and image search visibility.",
        recommendation: "Ensure at least 80% of images have meaningful alt attributes.",
        snippet: "<img src=\"...\" alt=\"Descriptive alt text\" />"
      });
    }
  }
  if (parsed.internalLinks.length < 2) {
    issues.push({
      id: "internal_links_low",
      category: "internal_links",
      severity: "medium",
      found: `${parsed.internalLinks.length} internal links`,
      why_it_matters: "Internal links distribute authority and aid crawling and context.",
      recommendation: "Add 2–5 contextual internal links with descriptive anchors.",
      snippet: '<a href="/related-page">Descriptive anchor</a>'
    });
  }
  if (parsed.jsonLdTypes.length === 0) {
    issues.push({
      id: "schema_missing",
      category: "schema",
      severity: "low",
      found: "No JSON-LD detected",
      why_it_matters: "Structured data helps search engines interpret content.",
      recommendation: "Add Article or FAQPage schema where appropriate.",
      snippet:
        '{"@context":"https://schema.org","@type":"Article","headline":"...","datePublished":"..."}'
    });
  }

  const quick_wins: AuditResultV1["quick_wins"] = issues.slice(0, 5).map((iss) => ({
    issue_id: iss.id,
    estimated_impact: iss.severity === "high" ? "high" : iss.severity === "medium" ? "medium" : "low",
    action: iss.recommendation,
    snippet: iss.snippet || null
  }));

  const result: Omit<AuditResultV1, "gsc_insights"> = {
    version: "1.0",
    url,
    fetched_at: new Date().toISOString(),
    scores: { overall, title_meta, headings, answerability, structure, schema, images, internal_links },
    stats,
    detected: {
      title: parsed.title,
      meta_description: parsed.meta,
      canonical: parsed.canonical,
      h1: parsed.h1,
      h2: parsed.h2,
      h3: parsed.h3,
      json_ld_types: parsed.jsonLdTypes,
      images: parsed.images,
      internal_links: parsed.internalLinks
    },
    issues,
    quick_wins
  };
  return result;
}


