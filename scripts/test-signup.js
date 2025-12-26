/**
 * Test Script: User Registration
 * Tests the signup functionality
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testSignup() {
  console.log('🧪 Testing User Registration...\n');
  
  const testUser = {
    username: `testuser_${Date.now()}`,
    password: 'TestPass123!'
  };

  try {
    // Test 1: Successful Registration
    console.log('Test 1: Valid Registration');
    const response = await axios.post(`${API_BASE}/auth/register`, testUser);
    
    if (response.data.token && response.data.username === testUser.username) {
      console.log('✅ PASSED: User registered successfully');
      console.log(`   Username: ${response.data.username}`);
      console.log(`   Token received: ${response.data.token.substring(0, 20)}...`);
    } else {
      console.log('❌ FAILED: Invalid response structure');
    }

  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
    if (!error.response) {
      console.log('   Connection Error - Is the backend server running?');
    }
  }

  console.log('\n---');

  try {
    // Test 2: Duplicate Username (should fail)
    console.log('\nTest 2: Duplicate Username (Expected to Fail)');
    await axios.post(`${API_BASE}/auth/register`, testUser);
    console.log('❌ FAILED: Duplicate username should not be allowed');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ PASSED: Duplicate username correctly rejected');
      console.log(`   Error: ${error.response.data.error}`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n---');

  try {
    // Test 3: Missing Fields (should fail)
    console.log('\nTest 3: Missing Password Field (Expected to Fail)');
    await axios.post(`${API_BASE}/auth/register`, { username: 'onlyusername' });
    console.log('❌ FAILED: Should require password');
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 500) {
      console.log('✅ PASSED: Missing fields correctly rejected');
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n========================================');
  console.log('User Registration Tests Completed!\n');
}

// Run the test
testSignup().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
