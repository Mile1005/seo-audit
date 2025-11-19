# Simple Comprehensive URL Testing Script for AISEO Turbo
# Tests key URLs on localhost:3000

param(
    [string]$BaseUrl = "http://localhost:3000"
)

Write-Host "Testing key URLs for AISEO Turbo" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host ""

# Key routes to test
$routes = @(
    "", "/pricing", "/features", "/demo", "/about", "/contact",
    "/blog", "/case-studies", "/help", "/help/billing",
    "/help/billing/payment-methods", "/help/billing/invoices", "/help/billing/cancellation"
)

$locales = @("en", "fr", "de", "es", "it", "id")

$results = @{}
$totalTests = 0
$successCount = 0

foreach ($route in $routes) {
    foreach ($locale in $locales) {
        $totalTests++

        if ($locale -eq "en") {
            $url = if ($route) { "$BaseUrl$route" } else { $BaseUrl }
        } else {
            $url = if ($route) { "$BaseUrl/$locale$route" } else { "$BaseUrl/$locale" }
        }

        try {
            $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10 -ErrorAction Stop
            $status = $response.StatusCode

            if (-not $results.ContainsKey($status)) {
                $results[$status] = @()
            }
            $results[$status] += $url
            $successCount++

            Write-Host "OK $url - $status" -ForegroundColor Green
        } catch {
            $status = "ERROR"
            if (-not $results.ContainsKey($status)) {
                $results[$status] = @()
            }
            $results[$status] += $url

            Write-Host "ERROR $url - ERROR" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "Total URLs tested: $totalTests" -ForegroundColor White
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Errors: $($totalTests - $successCount)" -ForegroundColor Red

$successRate = [math]::Round(($successCount / $totalTests) * 100, 2)
$color = if ($successRate -ge 95) { "Green" } elseif ($successRate -ge 80) { "Yellow" } else { "Red" }
Write-Host "Success Rate: $successRate%" -ForegroundColor $color

Write-Host ""
Write-Host "Testing completed!" -ForegroundColor Green