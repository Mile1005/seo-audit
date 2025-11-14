const BASE_URL = 'https://www.aiseoturbo.com'
const LOCALES = ['en', 'fr', 'de', 'es', 'it', 'id'] as const

type Route = {
  path: string
  priority?: number
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

// Define all routes that should be in the sitemap
const routes: Route[] = [
  // Homepage - Priority 1.0
  { path: '', priority: 1.0, changeFrequency: 'weekly' },

  // Main Pages - Priority 1.0
  { path: '/pricing', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/features', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/demo', priority: 0.9, changeFrequency: 'monthly' },

  // Feature Pages - Priority 0.9
  { path: '/features/seo-audit', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/features/site-crawler', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/features/keyword-tracking', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/features/competitor-analysis', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/features/ai-assistant', priority: 0.9, changeFrequency: 'weekly' },

  // About & Company - Priority 0.8
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },

  // Legal & Status - Priority 0.5
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/status', priority: 0.5, changeFrequency: 'weekly' },

  // Blog - Priority 0.7
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog/ai-powered-seo-future', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog/complete-seo-audit-checklist-2025', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog/content-seo-creating-search-friendly-content', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog/core-web-vitals-optimization-guide', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog/local-seo-strategies-that-work', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog/technical-seo-best-practices-2025', priority: 0.6, changeFrequency: 'monthly' },

  // Case Studies - Priority 0.7
  { path: '/case-studies', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/case-studies/cloudsync-pro', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/case-studies/digital-growth-agency', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/case-studies/gearhub-pro', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/case-studies/peak-performance', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/case-studies/stylecraft-boutique', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/case-studies/techflow-solutions', priority: 0.6, changeFrequency: 'monthly' },

  // Help Center - Priority 0.6
  { path: '/help', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/help/getting-started', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/getting-started/quick-start', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/getting-started/first-audit', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/getting-started/seo-scores', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/getting-started/dashboard-setup', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/seo-tools', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/billing', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/api', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/features/seo-audit', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/features/site-crawler', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/features/competitor-analysis', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/features/ai-assistant', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/help/account-billing', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/billing/payment-methods', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/billing/upgrade-plan', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/billing/invoices', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/billing/cancellation', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security-privacy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security/privacy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security/gdpr', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security/two-factor-authentication', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/security/best-practices', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/troubleshooting', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/troubleshooting/login-issues', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/troubleshooting/audit-issues', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/troubleshooting/performance', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/troubleshooting/sync-issues', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/api-integrations', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/api/authentication', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/help/api/webhooks', priority: 0.4, changeFrequency: 'monthly' },
]

function generateAlternates(path: string) {
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const alternates = LOCALES.reduce((acc, locale) => {
    let url: string;
    if (locale === 'en') {
      url = cleanPath ? `${BASE_URL}/${cleanPath}` : BASE_URL;
    } else {
      url = `${BASE_URL}/${locale}/${cleanPath}`;
    }
    acc[locale] = url.replace(/\/$/, '');
    return acc;
  }, {} as Record<string, string>);

  // Add x-default pointing to English root
  alternates['x-default'] = cleanPath ? `${BASE_URL}/${cleanPath}` : BASE_URL;

  return alternates;
}

export async function GET() {
  const now = new Date()
  const lastModified = now.toISOString().split('T')[0] // YYYY-MM-DD

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  routes.forEach(route => {
    const { path, priority = 0.5, changeFrequency = 'monthly' } = route;
    const alternates = generateAlternates(path);

    LOCALES.forEach(locale => {
      const url = alternates[locale];
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastModified}</lastmod>\n`;
      xml += `    <changefreq>${changeFrequency}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      // Add hreflang alternates per <url>
      Object.entries(alternates).forEach(([lang, altUrl]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}" />\n`;
      });

      xml += `  </url>\n`;
    });
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}