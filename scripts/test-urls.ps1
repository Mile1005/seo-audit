# Comprehensive URL Testing Script for AISEO Turbo
# Tests all sitemap URLs on localhost:3000

param(
    [string]$BaseUrl = "http://localhost:3000",
    [int]$TimeoutSeconds = 30,
    [switch]$Verbose
)

# Define all routes from sitemap (same as in route.ts)
$routes = @(
    "", "/pricing", "/features", "/demo",
    "/features/seo-audit", "/features/site-crawler", "/features/keyword-tracking",
    "/features/competitor-analysis", "/features/ai-assistant",
    "/about", "/contact", "/privacy", "/terms", "/status",
    "/blog", "/blog/ai-powered-seo-future", "/blog/complete-seo-audit-checklist-2025",
    "/blog/content-seo-creating-search-friendly-content",
    "/blog/core-web-vitals-optimization-guide", "/blog/local-seo-strategies-that-work",
    "/blog/technical-seo-best-practices-2025",
    "/case-studies", "/case-studies/cloudsync-pro", "/case-studies/digital-growth-agency",
    "/case-studies/gearhub-pro", "/case-studies/peak-performance",
    "/case-studies/stylecraft-boutique", "/case-studies/techflow-solutions",
    "/help", "/help/getting-started", "/help/getting-started/quick-start",
    "/help/getting-started/first-audit", "/help/getting-started/seo-scores",
    "/help/getting-started/dashboard-setup", "/help/seo-tools",
    "/help/seo-tools/ai-assistant", "/help/seo-tools/seo-audit",
    "/help/seo-tools/site-crawler", "/help/seo-tools/competitor-analysis",
    "/help/billing", "/help/api", "/help/account-billing",
    "/help/billing/payment-methods", "/help/billing/upgrade-plan",
    "/help/billing/invoices", "/help/billing/cancellation",
    "/help/troubleshooting", "/help/troubleshooting/login-issues",
    "/help/troubleshooting/audit-issues", "/help/troubleshooting/performance",
    "/help/troubleshooting/sync-issues", "/help/api-integrations",
    "/help/api/authentication", "/help/api/webhooks"
)

# Define locales
$locales = @("en", "fr", "de", "es", "it", "id")

# Results tracking
$results = @{}
$statusCodes = @{}

Write-Host "🚀 Starting comprehensive URL testing for AISEO Turbo" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host "Total routes to test: $($routes.Count)" -ForegroundColor Cyan
Write-Host "Locales to test: $($locales.Count)" -ForegroundColor Cyan
Write-Host "Total URLs to test: $($routes.Count * $locales.Count)" -ForegroundColor Cyan
Write-Host ""

$totalUrls = 0
$testedUrls = 0

foreach ($route in $routes) {
    foreach ($locale in $locales) {
        $totalUrls++

        # Generate URL
        if ($locale -eq "en") {
            $url = if ($route) { "$BaseUrl$route" } else { $BaseUrl }
        } else {
            $url = if ($route) { "$BaseUrl/$locale$route" } else { "$BaseUrl/$locale" }
        }

        try {
            if ($Verbose) {
                Write-Host "Testing: $url" -ForegroundColor Gray
            }

            $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec $TimeoutSeconds -ErrorAction Stop
            $statusCode = $response.StatusCode

            # Track results
            if (-not $results.ContainsKey($statusCode)) {
                $results[$statusCode] = @()
            }
            $results[$statusCode] += $url

            # Track status code counts
            if (-not $statusCodes.ContainsKey($statusCode)) {
                $statusCodes[$statusCode] = 0
            }
            $statusCodes[$statusCode]++

            $testedUrls++

            # Show progress every 50 URLs
            if ($testedUrls % 50 -eq 0) {
                Write-Host "Progress: $testedUrls / $totalUrls URLs tested" -ForegroundColor Yellow
            }

        } catch {
            $statusCode = "ERROR"
            $errorMessage = $_.Exception.Message

            # Try to extract status code from error if possible
            if ($errorMessage -match "(\d{3})") {
                $statusCode = $matches[1]
            }

            if (-not $results.ContainsKey($statusCode)) {
                $results[$statusCode] = @()
            }
            $results[$statusCode] += $url

            if (-not $statusCodes.ContainsKey($statusCode)) {
                $statusCodes[$statusCode] = 0
            }
            $statusCodes[$statusCode]++

            $testedUrls++

            if ($Verbose) {
                Write-Host "❌ $url - $statusCode - $errorMessage" -ForegroundColor Red
            }
        }
    }
}

# Display results
Write-Host ""
Write-Host "📊 TEST RESULTS SUMMARY" -ForegroundColor Green
Write-Host ("=" * 50) -ForegroundColor Green

Write-Host ""
Write-Host "📈 STATUS CODE BREAKDOWN:" -ForegroundColor Yellow
foreach ($code in ($statusCodes.Keys | Sort-Object)) {
    $count = $statusCodes[$code]
    $percentage = [math]::Round(($count / $totalUrls) * 100, 2)

    $color = switch ($code) {
        "200" { "Green" }
        "301" { "Cyan" }
        "302" { "Cyan" }
        "404" { "Red" }
        "500" { "Red" }
        default { "Yellow" }
    }

    Write-Host "  $code : $count URLs ($percentage%)" -ForegroundColor $color
}

Write-Host ""
Write-Host "🔍 DETAILED RESULTS:" -ForegroundColor Yellow

foreach ($code in ($results.Keys | Sort-Object)) {
    $urls = $results[$code]
    $count = $urls.Count

    $color = switch ($code) {
        "200" { "Green" }
        "301" { "Cyan" }
        "302" { "Cyan" }
        "404" { "Red" }
        "500" { "Red" }
        default { "Yellow" }
    }

    Write-Host ""
    Write-Host "📋 Status $code ($count URLs):" -ForegroundColor $color

    if ($count -le 10) {
        # Show all URLs if 10 or fewer
        foreach ($url in $urls) {
            Write-Host "  ✅ $url" -ForegroundColor Green
        }
    } else {
        # Show first 5 and last 5 with ellipsis
        for ($i = 0; $i -lt 5; $i++) {
            Write-Host "  ✅ $($urls[$i])" -ForegroundColor Green
        }
        Write-Host "  ... ($($count - 10) more URLs) ..." -ForegroundColor Gray
        for ($i = $count - 5; $i -lt $count; $i++) {
            Write-Host "  ✅ $($urls[$i])" -ForegroundColor Green
        }
    }
}

# Summary statistics
$successCount = if ($statusCodes.ContainsKey("200")) { $statusCodes["200"] } else { 0 }
$redirectCount = 0
if ($statusCodes.ContainsKey("301")) { $redirectCount += $statusCodes["301"] }
if ($statusCodes.ContainsKey("302")) { $redirectCount += $statusCodes["302"] }
$errorCount = $totalUrls - $successCount - $redirectCount

Write-Host ""
Write-Host "📊 FINAL SUMMARY:" -ForegroundColor Cyan
Write-Host "  Total URLs tested: $totalUrls" -ForegroundColor White
Write-Host "  ✅ Successful (200): $successCount" -ForegroundColor Green
Write-Host "  ↪️  Redirects (301/302): $redirectCount" -ForegroundColor Cyan
Write-Host "  ❌ Errors: $errorCount" -ForegroundColor Red

$successRate = [math]::Round(($successCount / $totalUrls) * 100, 2)
Write-Host "  📈 Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 95) { "Green" } elseif ($successRate -ge 80) { "Yellow" } else { "Red" })

Write-Host ""
Write-Host "🎉 Testing completed!" -ForegroundColor Green