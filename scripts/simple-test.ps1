# Simple URL Testing Script for AISEO Turbo
# Tests a few URLs on localhost:3000

param(
    [string]$BaseUrl = "http://localhost:3000"
)

Write-Host "Testing a few URLs..." -ForegroundColor Cyan

$testUrls = @(
    "$BaseUrl",
    "$BaseUrl/pricing",
    "$BaseUrl/features",
    "$BaseUrl/fr",
    "$BaseUrl/fr/pricing"
)

foreach ($url in $testUrls) {
    try {
        Write-Host "Testing: $url" -ForegroundColor Gray
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10 -ErrorAction Stop
        Write-Host "  ✅ $url - $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ $url - ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Simple test completed!" -ForegroundColor Green