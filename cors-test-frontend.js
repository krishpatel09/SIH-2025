// Simple CORS test script for frontend
// Run this in your browser console on https://sih-2025-steel.vercel.app

async function testCORS() {
  console.log('🧪 Testing CORS configuration...');
  
  const backendUrl = 'https://smart-india-hackthon-2025.onrender.com';
  
  try {
    // Test 1: Health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      headers: {
        'Origin': 'https://sih-2025-steel.vercel.app'
      }
    });
    
    console.log('Health Response Status:', healthResponse.status);
    console.log('Health Response Headers:', Object.fromEntries(healthResponse.headers.entries()));
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Data:', healthData);
    }
    
    // Test 2: Destinations endpoint
    console.log('\n2. Testing destinations endpoint...');
    const destinationsResponse = await fetch(`${backendUrl}/api/destinations`, {
      method: 'GET',
      headers: {
        'Origin': 'https://sih-2025-steel.vercel.app'
      }
    });
    
    console.log('Destinations Response Status:', destinationsResponse.status);
    console.log('Destinations Response Headers:', Object.fromEntries(destinationsResponse.headers.entries()));
    
    if (destinationsResponse.ok) {
      const destinationsData = await destinationsResponse.json();
      console.log('Destinations Data:', destinationsData);
    }
    
    // Test 3: Cultural endpoint
    console.log('\n3. Testing cultural endpoint...');
    const culturalResponse = await fetch(`${backendUrl}/api/cultural`, {
      method: 'GET',
      headers: {
        'Origin': 'https://sih-2025-steel.vercel.app'
      }
    });
    
    console.log('Cultural Response Status:', culturalResponse.status);
    console.log('Cultural Response Headers:', Object.fromEntries(culturalResponse.headers.entries()));
    
    if (culturalResponse.ok) {
      const culturalData = await culturalResponse.json();
      console.log('Cultural Data:', culturalData);
    }
    
    console.log('\n🎉 CORS test completed!');
    
  } catch (error) {
    console.error('❌ CORS test failed:', error);
  }
}

// Run the test
testCORS();
