// A simple script to test our API without a Frontend
const BASE_URL = 'http://localhost:5000/api/links';

async function runTest() {
    console.log('Starting GhostLink System Test...\n');

    // --- STEP 1: Create a Link ---
    console.log('1. Creating a new Ghost Link (Max Clicks: 2)...');
    
    const createResponse = await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            originalContent: "This is a Top Secret Message! Handle with care.",
            maxClicks: 2 // We allow 2 clicks, then it dies
        })
    });

    const createData = await createResponse.json();
    
    if (!createData.success) {
        console.error(' Failed to create link:', createData);
        return;
    }

    const shortId = createData.shortUrl.split('/').pop(); // Extract the ID
    console.log(` Link Created! ID: ${shortId}`);
    console.log(`   Full URL: ${createData.shortUrl}\n`);


    // --- STEP 2: First Visit (Should be Alive) ---
    console.log('2. Simulating FIRST Click...');
    const visit1 = await fetch(`${BASE_URL}/${shortId}`);
    const data1 = await visit1.json();
    console.log(`   Status: ${visit1.status}`);
    console.log(`   Message: ${data1.message}`);
    
    if(visit1.status === 200) console.log(' First click successful.\n');


    // --- STEP 3: Second Visit (Should be Alive but Warning) ---
    console.log('3. Simulating SECOND Click (Last one!)...');
    const visit2 = await fetch(`${BASE_URL}/${shortId}`);
    const data2 = await visit2.json();
    console.log(`   Status: ${visit2.status}`);
    console.log(`   Message: ${data2.message}`);
    // Ideally, the message should say "Link has been destroyed"
    if(visit2.status === 200) console.log(' Second click successful (Link should be gone now).\n');


    // --- STEP 4: Third Visit (Should FAIL) ---
    console.log('4. Simulating THIRD Click (Should fail)...');
    const visit3 = await fetch(`${BASE_URL}/${shortId}`);
    const data3 = await visit3.json();
    console.log(`   Status: ${visit3.status} (Expected: 404)`);
    console.log(`   Error: ${data3.error}`);

    if(visit3.status === 404) {
        console.log('\n🎉 TEST PASSED: The link successfully ghosted! 👻');
    } else {
        console.log('\n TEST FAILED: The link is still alive.');
    }
}

runTest();