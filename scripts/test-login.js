/**
 * Test Script: User Login
 * Tests the login functionality
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testLogin() {
  console.log('🧪 Testing User Login...\n');
  
  // First, create a test user
  const testUser = {
    username: `logintest_${Date.now()}`,
    password: 'SecurePass456!'
  };

  try {
    console.log('Setup: Creating test user...');
    await axios.post(`${API_BASE}/auth/register`, testUser);
    console.log('✅ Test user created\n');
  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    return;
  }

  console.log('---\n');

  try {
    // Test 1: Successful Login
    console.log('Test 1: Valid Login');
    const response = await axios.post(`${API_BASE}/auth/login`, testUser);
    
    if (response.data.token && response.data.username === testUser.username) {
      console.log('✅ PASSED: Login successful');
      console.log(`   Username: ${response.data.username}`);
      console.log(`   Token received: ${response.data.token.substring(0, 20)}...`);
    } else {
      console.log('❌ FAILED: Invalid response structure');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 2: Wrong Password
    console.log('\nTest 2: Wrong Password (Expected to Fail)');
    await axios.post(`${API_BASE}/auth/login`, {
      username: testUser.username,
      password: 'WrongPassword123'
    });
    console.log('❌ FAILED: Wrong password should be rejected');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ PASSED: Wrong password correctly rejected');
      console.log(`   Error: ${error.response.data.error}`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n---');

  try {
    // Test 3: Non-existent User
    console.log('\nTest 3: Non-existent User (Expected to Fail)');
    await axios.post(`${API_BASE}/auth/login`, {
      username: 'nonexistentuser9999',
      password: 'SomePassword'
    });
    console.log('❌ FAILED: Non-existent user should be rejected');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ PASSED: Non-existent user correctly rejected');
      console.log(`   Error: ${error.response.data.error}`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n========================================');
  console.log('User Login Tests Completed!\n');
}

// Run the test
testLogin().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
