// Quick test of PSI integration
import { fetchPageSpeed } from './lib/psi.js';

async function testPSI() {
  console.log('Testing PSI integration...');
  
  try {
    const result = await fetchPageSpeed(
      'https://example.com',
      'AIzaSyA9x1N0poqiewfF6YL2Cyqcty57MhzrMPU',
      'mobile'
    );
    
    console.log('PSI Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('PSI Error:', error);
  }
}

testPSI();
