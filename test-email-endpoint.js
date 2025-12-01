// Test email endpoint
import { config } from 'dotenv';

config();

async function testEmailEndpoint() {
  console.log('🌐 Testing email endpoint...');
  
  const testOrderDetails = {
    name: 'Test Customer',
    email: 'test@example.com',
    amount: 147,
    orderBump: false,
    paymentId: 'TEST_' + Date.now(),
    date: new Date().toLocaleDateString(),
  };

  try {
    const response = await fetch('http://localhost:8080/api/send-email', {
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
      console.log('✅ Email test successful:', result);
    } else {
      const error = await response.json();
      console.log('❌ Email test error:', error);
      console.log('📡 Full response:', await response.text());
    }
  } catch (error) {
    console.log('❌ Email test failed:', error.message);
    console.log('💡 Make sure the dev server is running: npm run dev');
    console.log('💡 Try accessing: http://localhost:8080/api/send-email');
  }
}

// Wait a bit for the server to start
setTimeout(testEmailEndpoint, 3000);
