# GhostLink Test Scripts

This folder contains automated test scripts for validating the core functionalities of the GhostLink application.

## Prerequisites

Before running these tests, ensure:
1. The backend server is running on `http://localhost:5000`
2. MongoDB is connected
3. Node.js is installed
4. axios package is installed in the backend folder

## Test Scripts

### Individual Test Scripts

1. **test-signup.js** - Tests user registration
   - Valid registration
   - Duplicate username handling
   - Missing field validation

2. **test-login.js** - Tests user authentication
   - Successful login
   - Wrong password handling
   - Non-existent user handling

3. **test-url-shorten.js** - Tests URL shortening functionality
   - Creating shortened URLs
   - Different duration settings
   - Authentication requirements

4. **test-secret-encryption.js** - Tests secret message encryption
   - Creating encrypted messages
   - Retrieving encrypted data
   - Long text handling
   - Authentication requirements

5. **test-dashboard.js** - Tests dashboard functionality
   - Retrieving user's links
   - Creating multiple links
   - Deleting links
   - Authentication requirements

6. **test-all.js** - Master script that runs all tests sequentially

## Running the Tests

**IMPORTANT:** Make sure the backend server is running on http://localhost:5000 before running tests!

### Start Backend Server First
Open a terminal and run:
```bash
cd ghostlink-backend
npm run dev
```
Keep this terminal open.

### Run Tests in a New Terminal

#### Run Individual Test
```bash
node scripts/test-signup.js
node scripts/test-login.js
node scripts/test-url-shorten.js
node scripts/test-secret-encryption.js
node scripts/test-dashboard.js
```

#### Run All Tests
```bash
node scripts/test-all.js
```

#### Using NPM Scripts (from scripts folder)
```bash
cd scripts
npm test                 # Run all tests
npm run test:signup      # Test signup only
npm run test:login       # Test login only
npm run test:url         # Test URL shortening only
npm run test:secret      # Test secret encryption only
npm run test:dashboard   # Test dashboard only
```

## Test Output

Each test will display:
- ✅ PASSED - Test succeeded
- ❌ FAILED - Test failed with error details
- Test summary at the end

## Notes

- Tests create temporary users with timestamps to avoid conflicts
- Each test is independent and creates its own test data
- Tests verify both successful operations and proper error handling
- All tests require the backend server to be running
