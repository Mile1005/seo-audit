/**
 * SVG Image Fallback Generator
 * Creates optimized SVG fallbacks for missing images
 */

// Generate hero dashboard fallback SVG
export const generateHeroDashboardFallback = (width = 1200, height = 750) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#334155;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGradient)"/>
      
      <!-- Header Bar -->
      <rect x="0" y="0" width="100%" height="60" fill="#1e293b"/>
      <rect x="20" y="20" width="120" height="20" rx="10" fill="#3b82f6"/>
      <text x="160" y="35" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="600">AISEOTurbo Dashboard</text>
      
      <!-- Navigation -->
      <rect x="20" y="80" width="200" height="100%" fill="#0f172a" opacity="0.5"/>
      <rect x="30" y="100" width="80" height="16" rx="8" fill="#64748b"/>
      <rect x="30" y="130" width="120" height="16" rx="8" fill="#64748b"/>
      <rect x="30" y="160" width="100" height="16" rx="8" fill="#64748b"/>
      
      <!-- Main Content Area -->
      <rect x="240" y="80" width="${width - 260}" height="150" rx="12" fill="url(#cardGradient)"/>
      <text x="260" y="110" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">SEO Performance Overview</text>
      
      <!-- Score Circle -->
      <circle cx="320" cy="170" r="30" fill="none" stroke="#10b981" stroke-width="4"/>
      <text x="320" y="177" text-anchor="middle" fill="#10b981" font-family="Arial, sans-serif" font-size="20" font-weight="bold">98</text>
      
      <!-- Metrics Cards -->
      <rect x="240" y="250" width="150" height="100" rx="8" fill="#1e293b"/>
      <text x="250" y="270" fill="#64748b" font-family="Arial, sans-serif" font-size="12">Organic Traffic</text>
      <text x="250" y="290" fill="#22c55e" font-family="Arial, sans-serif" font-size="24" font-weight="bold">+34%</text>
      
      <rect x="410" y="250" width="150" height="100" rx="8" fill="#1e293b"/>
      <text x="420" y="270" fill="#64748b" font-family="Arial, sans-serif" font-size="12">Keywords Ranking</text>
      <text x="420" y="290" fill="#3b82f6" font-family="Arial, sans-serif" font-size="24" font-weight="bold">247</text>
      
      <rect x="580" y="250" width="150" height="100" rx="8" fill="#1e293b"/>
      <text x="590" y="270" fill="#64748b" font-family="Arial, sans-serif" font-size="12">Issues Found</text>
      <text x="590" y="290" fill="#f59e0b" font-family="Arial, sans-serif" font-size="24" font-weight="bold">12</text>
      
      <!-- Chart Area -->
      <rect x="240" y="370" width="${width - 260}" height="200" rx="8" fill="#1e293b"/>
      <text x="250" y="390" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="14" font-weight="600">SEO Trends</text>
      
      <!-- Simulated Chart Lines -->
      <polyline points="260,520 300,480 340,450 380,430 420,400 460,380 500,360" fill="none" stroke="#3b82f6" stroke-width="2"/>
      <polyline points="260,540 300,520 340,500 380,470 420,450 460,430 500,410" fill="none" stroke="#10b981" stroke-width="2"/>
      
      <!-- Watermark -->
      <text x="${width - 150}" y="${height - 20}" fill="#64748b" font-family="Arial, sans-serif" font-size="10" opacity="0.7">AI SEO Turbo</text>
    </svg>
  `)}`
}

// Generate mobile audit interface fallback SVG
export const generateMobileAuditFallback = (width = 375, height = 667) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mobileBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="mobileCard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#mobileBg)"/>
      
      <!-- Status Bar -->
      <rect x="0" y="0" width="100%" height="44" fill="#000"/>
      <text x="20" y="28" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="600">9:41</text>
      <rect x="${width - 80}" y="15" width="60" height="14" rx="7" fill="none" stroke="white" stroke-width="1"/>
      <rect x="${width - 76}" y="17" width="50" height="10" rx="5" fill="white"/>
      
      <!-- Header -->
      <rect x="0" y="44" width="100%" height="60" fill="#1e293b"/>
      <text x="20" y="80" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">SEO Audit</text>
      
      <!-- Score Card -->
      <rect x="20" y="120" width="${width - 40}" height="120" rx="12" fill="url(#mobileCard)"/>
      <text x="30" y="150" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="600">Overall Score</text>
      
      <!-- Score Circle -->
      <circle cx="${width - 80}" cy="180" r="25" fill="none" stroke="white" stroke-width="3"/>
      <text x="${width - 80}" y="187" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">98</text>
      
      <!-- Quick Stats -->
      <rect x="20" y="260" width="${width - 40}" height="80" rx="8" fill="#1e293b"/>
      <text x="30" y="285" fill="#64748b" font-family="Arial, sans-serif" font-size="14">Quick Insights</text>
      <text x="30" y="310" fill="#22c55e" font-family="Arial, sans-serif" font-size="12">✓ Page Speed: Excellent</text>
      <text x="30" y="325" fill="#f59e0b" font-family="Arial, sans-serif" font-size="12">⚠ 3 Issues to Fix</text>
      
      <!-- Action Items -->
      <rect x="20" y="360" width="${width - 40}" height="100" rx="8" fill="#334155"/>
      <text x="30" y="385" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="600">Top Recommendations</text>
      <text x="30" y="405" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="12">• Optimize meta descriptions</text>
      <text x="30" y="420" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="12">• Add structured data</text>
      <text x="30" y="435" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="12">• Improve image alt tags</text>
      
      <!-- Bottom Action -->
      <rect x="20" y="${height - 100}" width="${width - 40}" height="50" rx="25" fill="#3b82f6"/>
      <text x="${width/2}" y="${height - 70}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="600">View Full Report</text>
      
      <!-- Home Indicator -->
      <rect x="${width/2 - 67}" y="${height - 20}" width="134" height="5" rx="2.5" fill="#64748b"/>
    </svg>
  `)}`
}
