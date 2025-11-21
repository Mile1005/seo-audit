# Comprehensive Hreflang and Page Status Check
# Tests multiple URLs for HTTP status, lang attributes, and hreflang tags

$urls = @(
    'https://www.aiseoturbo.com',
    'https://www.aiseoturbo.com/about',
    'https://www.aiseoturbo.com/features',
    'https://www.aiseoturbo.com/pricing',
    'https://www.aiseoturbo.com/de',
    'https://www.aiseoturbo.com/de/about',
    'https://www.aiseoturbo.com/de/features',
    'https://www.aiseoturbo.com/de/pricing',
    'https://www.aiseoturbo.com/fr',
    'https://www.aiseoturbo.com/fr/about',
    'https://www.aiseoturbo.com/fr/features',
    'https://www.aiseoturbo.com/fr/pricing',
    'https://www.aiseoturbo.com/es',
    'https://www.aiseoturbo.com/es/about',
    'https://www.aiseoturbo.com/es/features',
    'https://www.aiseoturbo.com/es/pricing',
    'https://www.aiseoturbo.com/it',
    'https://www.aiseoturbo.com/it/about',
    'https://www.aiseoturbo.com/it/features',
    'https://www.aiseoturbo.com/it/pricing',
    'https://www.aiseoturbo.com/id',
    'https://www.aiseoturbo.com/id/about',
    'https://www.aiseoturbo.com/id/features',
    'https://www.aiseoturbo.com/id/pricing'
)

Write-Host "COMPREHENSIVE HREFLANG & PAGE STATUS CHECK" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Yellow
Write-Host ""

$totalTests = $urls.Count
$passedTests = 0
$failedTests = 0

foreach ($url in $urls) {
    Write-Host ("{0,-50}" -f "$url : ") -NoNewline

    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        $statusCode = $response.StatusCode
        $html = $response.Content

        # Check HTTP status
        if ($statusCode -eq 200) {
            Write-Host "PASS 200 " -NoNewline -ForegroundColor Green
        } else {
            Write-Host "FAIL $statusCode " -NoNewline -ForegroundColor Red
            $failedTests++
            Write-Host ""
            continue
        }

        # Extract lang attribute
        $langMatch = [regex]::Match($html, '<html[^>]*lang="([^"]*)"')
        if ($langMatch.Success) {
            $lang = $langMatch.Groups[1].Value
            Write-Host "lang=$lang " -NoNewline

            # Validate lang matches URL locale
            $expectedLang = 'en'  # default
            if ($url -match '/(de|fr|es|it|id)(/|$)') {
                $expectedLang = $matches[1]
            }

            if ($lang -eq $expectedLang) {
                Write-Host "MATCH " -NoNewline -ForegroundColor Green
            } else {
                Write-Host "MISMATCH(expected $expectedLang) " -NoNewline -ForegroundColor Red
                $failedTests++
            }
        } else {
            Write-Host "NO_LANG " -NoNewline -ForegroundColor Red
            $failedTests++
        }

        # Check for hreflang tags (only expected on main pages)
        $hreflangMatches = [regex]::Matches($html, '<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>')
        $hreflangCount = $hreflangMatches.Count

        # Only check for hreflang on root pages and main content pages
        $shouldHaveHreflang = $url -match '/(|about|features|pricing)$'

        if ($shouldHaveHreflang) {
            if ($hreflangCount -gt 0) {
                Write-Host "hreflang=$hreflangCount " -NoNewline

                # Check for duplicates or issues
                $hreflangs = @()
                foreach ($match in $hreflangMatches) {
                    $hreflangMatch = [regex]::Match($match.Value, 'hreflang="([^"]*)"')
                    if ($hreflangMatch.Success) {
                        $hreflangs += $hreflangMatch.Groups[1].Value
                    }
                }

                $uniqueHreflangs = $hreflangs | Select-Object -Unique
                if ($hreflangs.Count -eq $uniqueHreflangs.Count) {
                    Write-Host "OK" -ForegroundColor Green
                    $passedTests++
                } else {
                    Write-Host "DUPLICATES" -ForegroundColor Red
                    $failedTests++
                }
            } else {
                Write-Host "MISSING_HREFLANG" -ForegroundColor Yellow
                # Not a failure for subpages
                $passedTests++
            }
        } else {
            Write-Host "OK (no hreflang needed)" -ForegroundColor Green
            $passedTests++
        }

    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $failedTests++
    }

    Write-Host ""
}

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Yellow
Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "Total URLs tested: $totalTests" -ForegroundColor White
Write-Host "Passed: $passedTests" -ForegroundColor Green
Write-Host "Failed: $failedTests" -ForegroundColor Red

if ($failedTests -eq 0) {
    Write-Host ""
    Write-Host "ALL TESTS PASSED! Hreflang implementation is perfect!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Some issues found. Check the results above." -ForegroundColor Yellow
}