// Test script for email functionality
// Run with: node test-email.js

import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

async function testEmailService() {
  console.log('🚀 Testing email service...\n');
  
  // Check environment variables
  console.log('🔍 Environment Variables:');
  console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Set' : '❌ Missing');
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Set' : '❌ Missing');
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || '❌ Missing');
  console.log('VITE_SITE_URL:', process.env.VITE_SITE_URL || '❌ Missing');
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('\n❌ Gmail credentials not configured. Please set up your .env file:');
    console.log('GMAIL_USER=your-gmail@gmail.com');
    console.log('GMAIL_APP_PASSWORD=your-16-char-app-password');
    console.log('ADMIN_EMAIL=admin@example.com');
    return;
  }

  try {
    // Create transporter
    console.log('\n📨 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test connection
    console.log('🔗 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('\n📤 Sending test email...');
    const testOrderDetails = {
      name: 'Test Customer',
      email: process.env.GMAIL_USER, // Send to self for testing
      amount: 147,
      orderBump: false,
      paymentId: 'TEST_' + Date.now(),
      date: new Date().toLocaleDateString(),
    };

    const testEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧪 Test Email</h1>
          <p>Email Service Test</p>
        </div>
        <div class="content">
          <h2>Hi ${testOrderDetails.name},</h2>
          <p>This is a test email to verify the email service is working correctly.</p>
          <div style="background: white; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
            <h3>📋 Test Order Details</h3>
            <div><strong>Amount:</strong> $${testOrderDetails.amount}</div>
            <div><strong>Payment ID:</strong> ${testOrderDetails.paymentId}</div>
            <div><strong>Order Date:</strong> ${testOrderDetails.date}</div>
            <div><strong>Order Bump:</strong> ${testOrderDetails.orderBump ? 'Yes' : 'No'}</div>
          </div>
          <p><strong>Best regards,</strong><br>The High-Ticket Sales Team</p>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: `"High-Ticket Sales Test" <${process.env.GMAIL_USER}>`,
      to: testOrderDetails.email,
      subject: '🧪 Test Email - High-Ticket Sales System',
      html: testEmailHtml,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Sent to:', testOrderDetails.email);

  } catch (error) {
    console.error('❌ Error testing email service:', error);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Error - Possible solutions:');
      console.log('1. Enable 2-factor authentication on your Gmail account');
      console.log('2. Generate an App Password: https://myaccount.google.com/apppasswords');
      console.log('3. Use the 16-character App Password (not your regular password)');
      console.log('4. Make sure "Less secure app access" is enabled if not using App Password');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔧 Connection Error - Possible solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify SMTP settings (host: smtp.gmail.com, port: 587)');
      console.log('3. Check if firewall is blocking SMTP connections');
    }
  }
}

// Test Netlify function endpoint
async function testNetlifyFunction() {
  console.log('\n🌐 Testing Netlify function endpoint...');
  
  try {
    const testOrderDetails = {
      name: 'Test Customer',
      email: 'test@example.com',
      amount: 147,
      orderBump: false,
      paymentId: 'TEST_' + Date.now(),
      date: new Date().toLocaleDateString(),
    };

    const response = await fetch('http://localhost:8888/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderDetails),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Netlify function test successful:', result);
    } else {
      const error = await response.json();
      console.log('❌ Netlify function error:', error);
    }
  } catch (error) {
    console.log('❌ Netlify function test failed:', error.message);
    console.log('💡 Make sure the dev server is running: npm run dev');
  }
}

// Run tests
testEmailService()
  .then(() => {
    console.log('\n🎉 Email service test completed!');
    console.log('\n💡 Next steps:');
    console.log('1. If test passed, your email service is ready');
    console.log('2. Test the actual payment flow on your website');
    console.log('3. Check browser console and terminal logs during payment');
  })
  .catch(console.error);

export { testEmailService, testNetlifyFunction };
