const axios = require('axios');

// Test CORS configuration
async function testCORS() {
  const baseURL = 'https://smart-india-hackthon-2025.onrender.com';
  const testOrigin = 'https://sih-2025-steel.vercel.app';
  
  console.log('🧪 Testing CORS configuration...');
  console.log('Backend URL:', baseURL);
  console.log('Frontend Origin:', testOrigin);
  console.log('---');
  
  try {
    // Test CORS debug endpoint
    console.log('1. Testing CORS debug endpoint...');
    const debugResponse = await axios.get(`${baseURL}/cors-debug`, {
      headers: {
        'Origin': testOrigin
      }
    });
    
    console.log('✅ CORS Debug Response:');
    console.log(JSON.stringify(debugResponse.data, null, 2));
    console.log('---');
    
    // Test CORS test endpoint
    console.log('2. Testing CORS test endpoint...');
    const testResponse = await axios.get(`${baseURL}/cors-test`, {
      headers: {
        'Origin': testOrigin
      }
    });
    
    console.log('✅ CORS Test Response:');
    console.log(JSON.stringify(testResponse.data, null, 2));
    console.log('---');
    
    // Test actual API endpoint
    console.log('3. Testing destinations API...');
    const apiResponse = await axios.get(`${baseURL}/api/destinations`, {
      headers: {
        'Origin': testOrigin
      }
    });
    
    console.log('✅ API Response Status:', apiResponse.status);
    console.log('✅ API Response Headers:', apiResponse.headers);
    console.log('---');
    
    console.log('🎉 All CORS tests passed!');
    
  } catch (error) {
    console.error('❌ CORS Test Failed:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the test
testCORS();
