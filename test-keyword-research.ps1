#!/usr/bin/env pwsh

# Keyword Research API Test Script
# This script demonstrates the keyword research API functionality

Write-Host "🔍 Testing Keyword Research API..." -ForegroundColor Green
Write-Host ""

# Configuration
$baseUrl = "http://localhost:3000"
$userId = "demo-user"
$projectId = "demo-project-1"

# Sample keywords to test
$testKeywords = @(
    "seo audit",
    "keyword research", 
    "competitor analysis",
    "backlink building",
    "technical seo"
)

Write-Host "📝 Test Configuration:" -ForegroundColor Yellow
Write-Host "   Base URL: $baseUrl"
Write-Host "   User ID: $userId"
Write-Host "   Project ID: $projectId"
Write-Host "   Keywords: $($testKeywords -join ', ')"
Write-Host ""

# Test 1: Research Keywords
Write-Host "🧪 Test 1: Research Keywords" -ForegroundColor Cyan
Write-Host "POST /api/keywords/research"

$researchPayload = @{
    projectId = $projectId
    keywords = $testKeywords
    location = "US"
    language = "en"
    device = "DESKTOP"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "x-user-id" = $userId
}

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/keywords/research" -Method POST -Body $researchPayload -Headers $headers
    
    if ($response.success) {
        Write-Host "✅ Research successful!" -ForegroundColor Green
        Write-Host "   Processed: $($response.data.keywords.Count) keywords"
        Write-Host "   Message: $($response.data.message)"
        
        # Show sample keyword data
        if ($response.data.keywords.Count -gt 0) {
            $sampleKeyword = $response.data.keywords[0]
            Write-Host "   Sample keyword: $($sampleKeyword.keyword)"
            Write-Host "   Search Volume: $($sampleKeyword.searchVolume)"
            Write-Host "   Difficulty: $($sampleKeyword.difficulty)"
            Write-Host "   CPC: $($sampleKeyword.cpc)"
        }
    } else {
        Write-Host "❌ Research failed: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Request failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Get Keywords History
Write-Host "🧪 Test 2: Get Keywords History" -ForegroundColor Cyan
Write-Host "GET /api/keywords/research?projectId=$projectId"

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/keywords/research?projectId=$projectId&page=1&limit=10" -Method GET -Headers $headers
    
    if ($response.success) {
        Write-Host "✅ History retrieval successful!" -ForegroundColor Green
        Write-Host "   Total keywords: $($response.data.pagination.total)"
        Write-Host "   Current page: $($response.data.pagination.page)"
        Write-Host "   Keywords on page: $($response.data.keywords.Count)"
        
        # Show some keyword details
        foreach ($keyword in $response.data.keywords | Select-Object -First 3) {
            Write-Host "   - $($keyword.keyword): Vol=$($keyword.searchVolume), Diff=$($keyword.difficulty)"
        }
    } else {
        Write-Host "❌ History retrieval failed: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Request failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Test with Empty Keywords
Write-Host "🧪 Test 3: Test Validation (Empty Keywords)" -ForegroundColor Cyan

$invalidPayload = @{
    projectId = $projectId
    keywords = @()
    location = "US"
    language = "en"
    device = "DESKTOP"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/keywords/research" -Method POST -Body $invalidPayload -Headers $headers
    Write-Host "❌ Validation should have failed!" -ForegroundColor Red
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    if ($errorResponse.error -eq "Invalid request data") {
        Write-Host "✅ Validation working correctly!" -ForegroundColor Green
        Write-Host "   Error: $($errorResponse.error)"
    } else {
        Write-Host "❌ Unexpected error: $($errorResponse.error)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 4: Test with Invalid Project ID
Write-Host "🧪 Test 4: Test Authorization (Invalid Project)" -ForegroundColor Cyan

$invalidProjectPayload = @{
    projectId = "invalid-project-id"
    keywords = @("test keyword")
    location = "US"
    language = "en"
    device = "DESKTOP"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/keywords/research" -Method POST -Body $invalidProjectPayload -Headers $headers
    Write-Host "❌ Authorization should have failed!" -ForegroundColor Red
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    if ($errorResponse.error -eq "Project not found") {
        Write-Host "✅ Authorization working correctly!" -ForegroundColor Green
        Write-Host "   Error: $($errorResponse.error)"
    } else {
        Write-Host "❌ Unexpected error: $($errorResponse.error)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Keyword Research API Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Visit http://localhost:3000/dashboard/keywords to see the UI"
Write-Host "   2. Try the Research tab to add keywords"
Write-Host "   3. Check the Rankings tab to see stored data"
Write-Host "   4. Explore Opportunities for optimization insights"
Write-Host ""
Write-Host "📊 Features Implemented:" -ForegroundColor Yellow
Write-Host "   ✅ Keyword research API endpoint"
Write-Host "   ✅ Keyword storage with search volume, difficulty, CPC"
Write-Host "   ✅ Keyword history and pagination"
Write-Host "   ✅ Request validation and error handling"
Write-Host "   ✅ Project-based authorization"
Write-Host "   ✅ Interactive UI with research, rankings, and opportunities"
Write-Host "   ✅ Export functionality"
Write-Host "   ✅ Opportunity scoring and analysis"
