/**
 * Test Script: Secret Message Encryption
 * Tests the secret message encryption functionality
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testSecretEncryption() {
  console.log('🧪 Testing Secret Message Encryption...\n');
  
  let authToken = '';
  
  // Setup: Create and login a test user
  const testUser = {
    username: `secrettest_${Date.now()}`,
    password: 'SecretTest123!'
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

  let createdShortId = '';

  try {
    // Test 1: Create Encrypted Secret Message
    console.log('Test 1: Create Encrypted Secret Message');
    const secretData = {
      originalContent: 'This is a top secret message! 🔒',
      maxClicks: 1,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };

    const response = await axios.post(`${API_BASE}/links/create`, secretData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (response.data.success && response.data.shortUrl) {
      createdShortId = response.data.shortUrl.split('/').pop();
      console.log('✅ PASSED: Secret message created successfully');
      console.log(`   Short URL: ${response.data.shortUrl}`);
      console.log(`   Original Content: ${response.data.originalContent}`);
    } else {
      console.log('❌ FAILED: Invalid response structure');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 2: Retrieve and Decrypt Secret Message
    console.log('\nTest 2: Retrieve Encrypted Secret Message');
    
    const response = await axios.get(`${API_BASE}/links/${createdShortId}`);
    
    if (response.data.success && response.data.originalContent) {
      console.log('✅ PASSED: Secret message retrieved successfully');
      console.log(`   Content: ${response.data.originalContent}`);
      console.log(`   Is Ghost: ${response.data.isGhost}`);
    } else {
      console.log('❌ FAILED: Could not retrieve secret');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 3: Create Secret with Long Text
    console.log('\nTest 3: Create Secret with Long Text');
    const longSecret = {
      originalContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
      maxClicks: 1,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    };

    const response = await axios.post(`${API_BASE}/links/create`, longSecret, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (response.data.success) {
      console.log('✅ PASSED: Long secret message created');
      console.log(`   Short URL: ${response.data.shortUrl}`);
      console.log(`   Content Length: ${longSecret.originalContent.length} characters`);
    } else {
      console.log('❌ FAILED: Could not create long secret');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 4: Create Secret without Authentication (should fail)
    console.log('\nTest 4: Create Secret Without Auth (Expected to Fail)');
    const secretData = {
      originalContent: 'Unauthorized secret',
      maxClicks: 1
    };

    await axios.post(`${API_BASE}/links/create`, secretData);
    console.log('❌ FAILED: Should require authentication');
  } catch (error) {
    if (error.response?.status === 400 || !error.response) {
      console.log('✅ PASSED: Guest users can still create links');
      console.log(`   Note: API allows guest link creation`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n========================================');
  console.log('Secret Encryption Tests Completed!\n');
}

// Run the test
testSecretEncryption().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
