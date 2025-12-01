// Development API endpoint for email testing
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

export interface OrderDetails {
  name: string;
  email: string;
  amount: number;
  orderBump: boolean;
  paymentId: string;
  date: string;
}

export default async function handler(req: Request) {
  console.log('🚀 Dev API: Email handler called');
  console.log('🔍 Environment check:', {
    GMAIL_USER: !!process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
  });

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const orderDetails: OrderDetails = await req.json();
    console.log('📧 Dev API: Order details received:', orderDetails);

    // Validate required fields
    if (!orderDetails.email || !orderDetails.name || !orderDetails.paymentId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('❌ Gmail credentials not configured');
      return new Response(JSON.stringify({ 
        error: 'Email service not configured',
        details: 'Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create transporter
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
    await transporter.verify();
    console.log('✅ Dev API: SMTP connection successful');

    // Simple email content for testing
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .details-box { background: white; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Order Confirmation!</h1>
          <p>Thank you for your purchase</p>
        </div>
        <div class="content">
          <h2>Hi ${orderDetails.name},</h2>
          <p>Congratulations! Your payment has been successfully processed.</p>
          <div class="details-box">
            <h3>📋 Order Details</h3>
            <div><strong>Product:</strong> ${orderDetails.orderBump ? 'Ultimate High-Ticket Sales Bundle + Advanced Outreach Scripts' : 'Ultimate High-Ticket Sales Bundle'}</div>
            <div><strong>Amount Paid:</strong> $${orderDetails.amount}</div>
            <div><strong>Payment ID:</strong> ${orderDetails.paymentId}</div>
            <div><strong>Order Date:</strong> ${orderDetails.date}</div>
            <div><strong>Order Bump:</strong> ${orderDetails.orderBump ? 'Yes' : 'No'}</div>
          </div>
          
          <h3>🚀 What's Next?</h3>
          <ol>
            <li>Check your email for download links</li>
            <li>Review the materials at your own pace</li>
            <li>Start implementing the strategies immediately</li>
            <li>Reach out if you have any questions!</li>
          </ol>
          <p><strong>Best regards,</strong><br>The High-Ticket Sales Team</p>
        </div>
      </body>
      </html>
    `;

    // Send email
    const result = await transporter.sendMail({
      from: `"High-Ticket Sales" <${process.env.GMAIL_USER}>`,
      to: orderDetails.email,
      subject: '🎉 Order Confirmed - High-Ticket Sales Bundle',
      html: emailHtml,
    });

    console.log('✅ Dev API: Email sent successfully:', result.messageId);

    // Also send admin notification
    if (process.env.ADMIN_EMAIL) {
      const adminResult = await transporter.sendMail({
        from: `"High-Ticket Sales System" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `💰 New Order: ${orderDetails.name} - $${orderDetails.amount}`,
        html: `
          <h2>🎉 New Order Received!</h2>
          <p><strong>Customer:</strong> ${orderDetails.name}</p>
          <p><strong>Email:</strong> ${orderDetails.email}</p>
          <p><strong>Amount:</strong> $${orderDetails.amount}</p>
          <p><strong>Payment ID:</strong> ${orderDetails.paymentId}</p>
          <p><strong>Date:</strong> ${orderDetails.date}</p>
        `,
      });
      console.log('✅ Dev API: Admin email sent:', adminResult.messageId);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Emails sent successfully',
      messageId: result.messageId,
      customerEmail: orderDetails.email
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Dev API: Error sending email:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
