// Test Netlify function endpoint
import { config } from 'dotenv';

config();

async function testNetlifyFunction() {
  console.log('🌐 Testing Netlify function endpoint...');
  
  const testOrderDetails = {
    name: 'Test Customer',
    email: 'test@example.com',
    amount: 147,
    orderBump: false,
    paymentId: 'TEST_' + Date.now(),
    date: new Date().toLocaleDateString(),
  };

  try {
    const response = await fetch('http://localhost:5173/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderDetails),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Netlify function test successful:', result);
    } else {
      const error = await response.json();
      console.log('❌ Netlify function error:', error);
      console.log('📡 Full response:', await response.text());
    }
  } catch (error) {
    console.log('❌ Netlify function test failed:', error.message);
    console.log('💡 Make sure the dev server is running: npm run dev');
    console.log('💡 Or try accessing: http://localhost:5173/.netlify/functions/send-email');
  }
}

testNetlifyFunction();
