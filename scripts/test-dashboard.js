/**
 * Test Script: Dashboard Functionality
 * Tests the dashboard/user links retrieval
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testDashboard() {
  console.log('🧪 Testing Dashboard Functionality...\n');
  
  let authToken = '';
  
  // Setup: Create and login a test user
  const testUser = {
    username: `dashtest_${Date.now()}`,
    password: 'DashTest123!'
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
    // Test 1: Get Empty Dashboard (no links yet)
    console.log('Test 1: Get Empty Dashboard');
    const response = await axios.get(`${API_BASE}/links/my-links`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (Array.isArray(response.data) && response.data.length === 0) {
      console.log('✅ PASSED: Empty dashboard returned correctly');
      console.log(`   Number of links: ${response.data.length}`);
    } else {
      console.log('❌ FAILED: Expected empty array');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 2: Create Multiple Links
    console.log('\nTest 2: Create Multiple Links');
    
    const links = [
      { originalContent: 'https://github.com', maxClicks: 5 },
      { originalContent: 'Secret Message 1', maxClicks: 1 },
      { originalContent: 'https://google.com', maxClicks: 10 },
      { originalContent: 'Secret Message 2', maxClicks: 1 }
    ];

    for (let i = 0; i < links.length; i++) {
      await axios.post(`${API_BASE}/links/create`, links[i], {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    }
    
    console.log('✅ PASSED: Created 4 test links');
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 3: Get Dashboard with Links
    console.log('\nTest 3: Retrieve Dashboard with Links');
    const response = await axios.get(`${API_BASE}/links/my-links`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (Array.isArray(response.data) && response.data.length === 4) {
      console.log('✅ PASSED: Dashboard returned all links');
      console.log(`   Number of links: ${response.data.length}`);
      console.log('\n   Links Summary:');
      response.data.forEach((link, index) => {
        const type = link.originalContent.startsWith('http') ? 'URL' : 'SECRET';
        const expires = link.expiresAt ? new Date(link.expiresAt).toLocaleString() : 'No expiration';
        console.log(`   ${index + 1}. [${type}] ${link.shortId} - Expires: ${expires}`);
      });
    } else {
      console.log(`❌ FAILED: Expected 4 links, got ${response.data.length}`);
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n---');

  try {
    // Test 4: Dashboard Without Authentication (should fail)
    console.log('\nTest 4: Access Dashboard Without Auth (Expected to Fail)');
    await axios.get(`${API_BASE}/links/my-links`);
    console.log('❌ FAILED: Should require authentication');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ PASSED: Correctly requires authentication');
      console.log(`   Error: ${error.response.data.error}`);
    } else {
      console.log('❌ FAILED: Unexpected error');
    }
  }

  console.log('\n---');

  try {
    // Test 5: Delete a Link
    console.log('\nTest 5: Delete a Link');
    
    // First get all links
    const linksResponse = await axios.get(`${API_BASE}/links/my-links`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const linkToDelete = linksResponse.data[0];
    
    // Delete the first link
    await axios.delete(`${API_BASE}/links/${linkToDelete._id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    // Verify deletion
    const afterDeleteResponse = await axios.get(`${API_BASE}/links/my-links`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (afterDeleteResponse.data.length === 3) {
      console.log('✅ PASSED: Link deleted successfully');
      console.log(`   Deleted: ${linkToDelete.shortId}`);
      console.log(`   Remaining links: ${afterDeleteResponse.data.length}`);
    } else {
      console.log('❌ FAILED: Link not deleted properly');
    }
  } catch (error) {
    console.log('❌ FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n========================================');
  console.log('Dashboard Tests Completed!\n');
}

// Run the test
testDashboard().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
