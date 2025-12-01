// Test the complete payment flow with email functionality
import { config } from 'dotenv';

config();

async function testPaymentFlow() {
  console.log('🚀 Testing complete payment flow with email functionality...\n');

  // Simulate a successful payment
  const testOrderDetails = {
    name: 'John Doe',
    email: 'zyradigitalsofficial@gmail.com', // Use the actual configured email
    amount: 147,
    orderBump: false,
    paymentId: 'PAY_TEST_' + Date.now(),
    date: new Date().toLocaleDateString(),
    paymentMethod: 'razorpay'
  };

  console.log('📋 Simulating payment with details:', {
    name: testOrderDetails.name,
    email: testOrderDetails.email,
    amount: testOrderDetails.amount,
    paymentId: testOrderDetails.paymentId
  });

  try {
    // Test the email service via API endpoint
    console.log('\n📧 Sending order confirmation emails via API...');
    
    const response = await fetch('http://localhost:8080/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderDetails),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ Payment flow test completed successfully!');
      console.log('📧 Emails sent with message ID:', result.messageId);
      console.log('📧 Customer email sent to:', result.customerEmail);
      console.log('📧 Admin notification sent to:', process.env.ADMIN_EMAIL);
      console.log('📧 Check your email inbox for confirmation messages');
    } else {
      const error = await response.json();
      console.error('❌ API Error:', error);
    }

  } catch (error) {
    console.error('❌ Payment flow test failed:', error);
  }
}

// Wait a bit for the server to start, then run the test
setTimeout(testPaymentFlow, 2000);
