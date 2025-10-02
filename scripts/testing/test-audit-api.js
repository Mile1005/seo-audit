// Test the audit API directly with proper fetch
console.log('Testing audit API with proper method...');

async function testAuditAPI() {
  try {
    console.log('Making POST request to /api/seo-audit/start...');
    
    const response = await fetch('http://localhost:3000/api/seo-audit/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com'
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok && data.auditId) {
      console.log('✅ POST request successful, auditId:', data.auditId);
      
      // Test status endpoint
      console.log('Testing status endpoint...');
      const statusResponse = await fetch(`http://localhost:3000/api/seo-audit/status?auditId=${data.auditId}`);
      console.log('Status response:', statusResponse.status);
      const statusData = await statusResponse.json();
      console.log('Status data:', statusData);
    } else {
      console.log('❌ POST request failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuditAPI();