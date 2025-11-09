const fs = require('fs');
const path = require('path');

// Routes to check
const routes = [
  '/',
  '/login',
  '/signup', 
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/dashboard',
  '/features',
  '/features/seo-audit',
  '/features/competitor-analysis',
  '/features/site-crawler',
  '/features/ai-assistant',
  '/features/keyword-tracking',
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
  '/demo',
  '/onboarding'
];

// API routes to check
const apiRoutes = [
  '/api/health',
  '/api/auth/signup',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/seo-audit/start',
  '/api/crawl/start'
];

async function checkRoute(route, baseUrl = 'http://localhost:3000') {
  try {
    const response = await fetch(`${baseUrl}${route}`);
    return {
      route,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    };
  } catch (error) {
    return {
      route,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function runRouteCheck() {
  console.log('🔍 Checking page routes...\n');
  
  for (const route of routes) {
    const result = await checkRoute(route);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${route} - ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }

  console.log('\n🔍 Checking API routes...\n');
  
  for (const route of apiRoutes) {
    const result = await checkRoute(route);
    const status = result.status === 200 || result.status === 405 ? '✅' : '❌';
    console.log(`${status} ${route} - ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }
}

if (require.main === module) {
  runRouteCheck().catch(console.error);
}

module.exports = { checkRoute, routes, apiRoutes };
