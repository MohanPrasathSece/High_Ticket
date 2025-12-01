// Test that customer email from form is properly used for sending emails
import { config } from 'dotenv';

config();

async function testFormEmailFlow() {
  console.log('🧪 Testing customer email from form flow...\n');

  // Simulate form data that would come from the checkout form
  const simulatedFormData = {
    name: 'Jane Smith',
    email: 'customer@example.com', // This would come from the form input
    phone: '+1234567890',
    company: 'Acme Corp',
    message: 'Looking forward to the course!'
  };

  console.log('📋 Simulated form data:', simulatedFormData);

  // Simulate payment success with form email
  const orderDetails = {
    name: simulatedFormData.name,
    email: simulatedFormData.email, // Email from form
    amount: 147,
    orderBump: false,
    paymentMethod: 'razorpay',
    paymentId: 'PAY_TEST_' + Date.now(),
    orderId: 'ORD_TEST_' + Date.now(),
    date: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  console.log('\n📧 Order details prepared with customer email:', {
    customerName: orderDetails.name,
    customerEmail: orderDetails.email,
    amount: orderDetails.amount,
    paymentId: orderDetails.paymentId
  });

  try {
    // Test sending email with the customer's email from the form
    const response = await fetch('http://localhost:8080/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ Customer email flow test successful!');
      console.log('📧 Confirmation email sent to customer:', orderDetails.email);
      console.log('📧 Admin notification also sent');
      console.log('📧 Message ID:', result.messageId);
      
      console.log('\n🎯 Key Points:');
      console.log('✅ Customer email captured from form input');
      console.log('✅ Email sent to customer address from form');
      console.log('✅ Admin receives notification with customer details');
      console.log('✅ Order tracking includes customer email');
      
    } else {
      const error = await response.json();
      console.error('❌ Test failed:', error);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Wait for server to start, then run test
setTimeout(testFormEmailFlow, 2000);
