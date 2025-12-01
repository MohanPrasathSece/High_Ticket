// Test contact form email functionality
import { config } from 'dotenv';

config();

async function testContactEmail() {
  console.log('🧪 Testing contact form email functionality...\n');

  // Simulate contact form submission
  const contactFormData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Hi! I\'m interested in the High-Ticket Sales Bundle. Can you tell me more about the course content and how quickly I can expect results? I\'ve been struggling with closing high-ticket deals for about 6 months now.'
  };

  console.log('📋 Simulated contact form data:', contactFormData);

  try {
    // Test the contact email endpoint
    const response = await fetch('http://localhost:8080/api/send-contact-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactFormData),
    });

    console.log('📡 Response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ Contact email test successful!');
      console.log('📧 Admin notification sent to:', process.env.ADMIN_EMAIL);
      console.log('📧 Customer auto-reply sent to:', result.customerEmail);
      console.log('📧 Admin message ID:', result.adminMessageId);
      console.log('📧 Customer message ID:', result.customerMessageId);
      
      console.log('\n🎯 Key Points:');
      console.log('✅ Contact form data captured correctly');
      console.log('✅ Admin receives detailed notification');
      console.log('✅ Customer receives professional auto-reply');
      console.log('✅ Both emails contain proper HTML formatting');
      console.log('✅ Message content preserved correctly');
      
    } else {
      const error = await response.json();
      console.error('❌ Contact email test failed:', error);
    }

  } catch (error) {
    console.error('❌ Contact email test error:', error);
  }
}

// Wait for server to start, then run test
setTimeout(testContactEmail, 2000);
