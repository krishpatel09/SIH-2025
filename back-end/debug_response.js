#!/usr/bin/env node

/**
 * Debug script to test response handling
 */

function testResponseHandling() {
  console.log('🔍 Testing Response Handling Logic');
  console.log('=' .repeat(50));
  
  // Test different response scenarios
  const testCases = [
    { name: 'Empty string', response: '' },
    { name: 'Empty object', response: {} },
    { name: 'Object with empty response', response: { response: '', success: true } },
    { name: 'Object with null response', response: { response: null, success: true } },
    { name: 'Object with undefined response', response: { response: undefined, success: true } },
    { name: 'Object with no response property', response: { success: true } },
    { name: 'Valid response', response: { response: 'Hello world', success: true } },
  ];
  
  for (const testCase of testCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log('Response:', JSON.stringify(testCase.response));
    
    const response = testCase.response;
    const condition = !response || typeof response === 'string' || !response.response || response.response === "" || !response.success;
    
    console.log('Condition result:', condition);
    console.log('Should use fallback:', condition ? 'YES' : 'NO');
  }
}

testResponseHandling();
