# Test hreflang on production
Write-Host "Testing Hreflang on Production Site..."
Write-Host "Site: https://www.aiseoturbo.com"
Write-Host ""

$LOCALES = @("en", "de", "fr")
$PAGES = @("/", "/help/api/authentication")

$TOTAL_TESTS = 0
$PASSED_TESTS = 0
$FAILED_TESTS = 0

foreach ($locale in $LOCALES) {
  Write-Host "Testing Locale: $locale"
  
  foreach ($page in $PAGES) {
    $TOTAL_TESTS++
    
    if ($locale -eq "en") {
      $url = "https://www.aiseoturbo.com$page"
      $expected_lang = "en"
    } else {
      $url = "https://www.aiseoturbo.com/$locale$page"
      $expected_lang = $locale
    }
    
    Write-Host -NoNewline "Testing: $url ... "
    
    try {
      $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
      $html = $response.Content
      
      # Extract HTML lang
      $htmlLangMatch = $html | Select-String -Pattern '<html[^>]*lang="([^"]*)"' | Select-Object -First 1
      if ($htmlLangMatch) {
        $html_lang = $htmlLangMatch.Matches.Groups[1].Value
      } else {
        $html_lang = ""
      }
      
      # Count hreflang tags
      $hreflangMatches = $html | Select-String -Pattern "hreflang=`"$expected_lang`"" -AllMatches
      $hreflang_count = $hreflangMatches.Matches.Count
      
      # Validate
      if ($html_lang -eq $expected_lang -and $hreflang_count -gt 0) {
        Write-Host "PASS" -ForegroundColor Green
        $PASSED_TESTS++
      } else {
        Write-Host "FAIL" -ForegroundColor Red
        Write-Host "  Expected lang=`"$expected_lang`", got `"$html_lang`""
        Write-Host "  Hreflang count: $hreflang_count"
        $FAILED_TESTS++
      }
    } catch {
      Write-Host "FAIL - Cannot fetch URL" -ForegroundColor Red
      $FAILED_TESTS++
    }
  }
  Write-Host ""
}

Write-Host "Total: $TOTAL_TESTS | Passed: $PASSED_TESTS | Failed: $FAILED_TESTS"