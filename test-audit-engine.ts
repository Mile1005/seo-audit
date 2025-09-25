/**
 * Test the Enhanced Audit Engine
 */

import { EnhancedAuditEngine, defaultAuditConfig } from './lib/audit';

async function testAuditEngine() {
  console.log('🚀 Testing Enhanced Audit Engine...');
  
  try {
    // Create audit engine with default config
    const engine = new EnhancedAuditEngine({
      ...defaultAuditConfig,
      targetKeywords: ['seo', 'audit', 'website']
    });
    
    // Test URL (using a simple example)
    const testUrl = 'https://example.com';
    
    console.log(`📊 Running audit for: ${testUrl}`);
    
    // Run the audit
    const result = await engine.runAudit(testUrl);
    
    console.log('✅ Audit completed successfully!');
    console.log(`📈 Overall Score: ${result.overallScore}/100`);
    console.log('📋 Category Scores:');
    console.log(`  - Technical SEO: ${result.categoryScores.technical}/100`);
    console.log(`  - Performance: ${result.categoryScores.performance}/100`);
    console.log(`  - Accessibility: ${result.categoryScores.accessibility}/100`);
    console.log(`  - Content: ${result.categoryScores.content}/100`);
    console.log(`  - Security: ${result.categoryScores.security}/100`);
    console.log(`  - Mobile: ${result.categoryScores.mobile}/100`);
    
    console.log(`🔍 Found ${result.issues.length} issues:`);
    result.issues.slice(0, 3).forEach((issue, index) => {
      console.log(`  ${index + 1}. [${issue.priority.toUpperCase()}] ${issue.title}`);
    });
    
    console.log(`⚡ Quick Wins (${result.quickWins.length}):`);
    result.quickWins.forEach((win, index) => {
      console.log(`  ${index + 1}. ${win.title} (${win.effort} effort, ${win.impact} impact)`);
    });
    
    console.log('🎯 Executive Summary:');
    result.summary.keyFindings.forEach((finding, index) => {
      console.log(`  ${index + 1}. ${finding}`);
    });
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
  }
}

// Run the test
testAuditEngine();
