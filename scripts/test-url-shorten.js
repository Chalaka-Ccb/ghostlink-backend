/**
 * Test Script: URL Shortening
 * Tests the URL shortening functionality
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testURLShorten() {
  console.log('🧪 Testing URL Shortening...\n');
  
  let authToken = '';
  
  // Setup: Create and login a test user
  const testUser = {
    username: `urltest_${Date.now()}`,
    password: 'URLTest123!'
  };

  try {
    console.log('Setup: Creating and logging in test user...');
    await axios.post(`${API_BASE}/auth/register`, testUser);
    const loginRes = await axios.post(`${API_BASE}/auth/login`, testUser);
    authToken = loginRes.data.token;
    console.log('✅ Test user authenticated\n');
  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    return;
  }

  console.log('---\n');

  try {
    // Test 1: Create Short URL Link
    console.log('Test 1: Create URL Shortener Link');
    const urlData = {
      originalContent: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      maxClicks: 5,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };

    const response = await axios.post(`${API_BASE}/links/create`, urlData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (response.data.success && response.data.shortUrl) {
      console.log('✅ PASSED: URL link created successfully');
      console.log(`   Short URL: ${response.data.shortUrl}`);
      console.log(`   Original URL: ${response.data.originalContent}`);
    } else {
      console.log('❌ FAILED: Invalid response structure');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 2: Create URL with Different Duration
    console.log('\nTest 2: Create URL with 24h Duration');
    const urlData = {
      originalContent: 'https://github.com',
      maxClicks: 10,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    const response = await axios.post(`${API_BASE}/links/create`, urlData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (response.data.success) {
      console.log('✅ PASSED: Long duration URL created');
      console.log(`   Short URL: ${response.data.shortUrl}`);
    } else {
      console.log('❌ FAILED: Could not create link');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 3: Create URL without Authentication (should fail)
    console.log('\nTest 3: Create URL Without Auth (Expected to Fail)');
    const urlData = {
      originalContent: 'https://example.com',
      maxClicks: 5
    };

    await axios.post(`${API_BASE}/links/create`, urlData);
    console.log('❌ FAILED: Should require authentication');
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      console.log('✅ PASSED: Correctly requires authentication');
      console.log(`   Error: ${error.response.data.error || 'No auth token'}`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n========================================');
  console.log('URL Shortening Tests Completed!\n');
}

// Run the test
testURLShorten().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
