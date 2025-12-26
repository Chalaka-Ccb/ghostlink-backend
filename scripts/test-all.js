/**
 * Master Test Script
 * Runs all tests in sequence
 */

const { exec } = require('child_process');
const path = require('path');

const tests = [
  'test-signup.js',
  'test-login.js',
  'test-url-shorten.js',
  'test-secret-encryption.js',
  'test-dashboard.js'
];

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║          🚀 GhostLink Test Suite Runner 🚀            ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

let currentTest = 0;

function runNextTest() {
  if (currentTest >= tests.length) {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║              ✅ All Tests Completed! ✅                ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    return;
  }

  const testFile = tests[currentTest];
  const testPath = path.join(__dirname, testFile);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running: ${testFile} [${currentTest + 1}/${tests.length}]`);
  console.log('='.repeat(60));

  exec(`node "${testPath}"`, (error, stdout, stderr) => {
    console.log(stdout);
    
    if (stderr) {
      console.error('Stderr:', stderr);
    }
    
    if (error) {
      console.error(`\n⚠️  Test ${testFile} encountered an error:`, error.message);
    }

    currentTest++;
    
    // Small delay between tests
    setTimeout(() => runNextTest(), 1000);
  });
}

// Start running tests
runNextTest();
