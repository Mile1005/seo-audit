// Use built-in fetch (Node.js 18+) or node-fetch
let fetch;
try {
  // Try built-in fetch first (Node.js 18+)
  fetch = globalThis.fetch;
} catch {
  // Fallback to node-fetch for older Node versions
  fetch = require('node-fetch');
}

async function testAPI() {
  try {
    console.log('🚀 Testing AISEOTurbo API Endpoints...\n');
    
    const baseUrl = 'http://localhost:3000';
    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': 'demo-user'
    };

    // Test 1: Projects List
    console.log('1. Testing Projects API (GET /api/projects)...');
    try {
      const response = await fetch(`${baseUrl}/api/projects`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log(`   ✅ Projects API working - Status: ${response.status}`);
        console.log(`   📊 Response:`, JSON.stringify(data, null, 2));
      } else {
        console.log(`   ❌ Projects API failed - Status: ${response.status}`);
        console.log(`   📊 Error:`, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.log(`   ❌ Projects API connection failed: ${error.message}`);
    }

    // Test 2: Keywords API
    console.log('\n2. Testing Keywords API (GET /api/keywords)...');
    try {
      const response = await fetch(`${baseUrl}/api/keywords?limit=5`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log(`   ✅ Keywords API working - Status: ${response.status}`);
      } else {
        console.log(`   ❌ Keywords API failed - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Keywords API connection failed: ${error.message}`);
    }

    // Test 3: Backlinks API
    console.log('\n3. Testing Backlinks API (GET /api/backlinks)...');
    try {
      const response = await fetch(`${baseUrl}/api/backlinks?limit=5`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log(`   ✅ Backlinks API working - Status: ${response.status}`);
      } else {
        console.log(`   ❌ Backlinks API failed - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Backlinks API connection failed: ${error.message}`);
    }

    console.log('\n🎯 API Testing Complete!');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAPI();
