import React, { useState } from 'react'

// Phase 12: Google Search Console integration placeholder

const sample = {
  property: 'https://example.com/',
  dateRange: { start: '2025-08-13', end: '2025-09-12' },
  totals: { clicks: 4820, impressions: 189430, ctr: 0.025, position: 18.4 },
  topQueries: [
    { query: 'seo audit tool', clicks: 420, impressions: 6100, ctr: 0.0689, position: 7.2 },
    { query: 'technical seo', clicks: 260, impressions: 9800, ctr: 0.0265, position: 15.1 },
    { query: 'meta tags analyzer', clicks: 140, impressions: 4200, ctr: 0.0333, position: 9.4 }
  ],
  topPages: [
    { url: '/audit', clicks: 890, impressions: 18200, ctr: 0.0489, position: 6.7 },
    { url: '/technical-seo', clicks: 560, impressions: 20500, ctr: 0.0273, position: 14.2 },
    { url: '/meta', clicks: 310, impressions: 11200, ctr: 0.0276, position: 11.5 }
  ]
}

export function GSCPlaceholder() {
  const [show, setShow] = useState(false)
  return (
    <div className="rounded-md border border-dashed p-6 bg-gradient-to-br from-white to-slate-50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Google Search Console (Premium)</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Connect your verified property to sync query, page, and device performance. Correlate technical fixes with visibility gains and export blended reports.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-500" data-upsell="gsc-connect">Connect GSC</button>
          <button onClick={()=>setShow(s=>!s)} className="px-3 py-1.5 text-sm rounded-md border hover:bg-slate-100">{show ? 'Hide JSON' : 'Sample JSON'}</button>
        </div>
      </div>
      {show && (
        <pre className="mt-4 max-h-72 overflow-auto text-xs bg-slate-900 text-slate-100 p-4 rounded"><code>{JSON.stringify(sample, null, 2)}</code></pre>
      )}
      <ul className="mt-4 text-sm list-disc pl-5 space-y-1 text-slate-700">
        <li>Query & page performance blending</li>
        <li>Click-through & position anomaly alerts</li>
        <li>Index coverage & sitemap diagnostics</li>
        <li>Historical export & API access</li>
      </ul>
    </div>
  )
}

export default GSCPlaceholder