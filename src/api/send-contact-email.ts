// Development API endpoint for contact form emails
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: Request) {
  console.log('🚀 Dev API: Contact email handler called');
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
    const formData: ContactFormData = await req.json();
    console.log('📧 Dev API: Contact form data received:', formData);

    // Validate required fields
    if (!formData.email || !formData.name || !formData.message) {
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

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .message-box { background: white; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
          .contact-info { background: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; margin: 20px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
          <p>Customer inquiry received</p>
        </div>
        <div class="content">
          <h2>👤 Contact Details</h2>
          <div class="contact-info">
            <div><strong>Name:</strong> ${formData.name}</div>
            <div><strong>Email:</strong> ${formData.email}</div>
            <div><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
          </div>
          
          <h3>💬 Message</h3>
          <div class="message-box">
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <h3>🚀 Next Steps</h3>
          <ol>
            <li>Review the customer's message</li>
            <li>Respond within 24 hours</li>
            <li>Check if they need sales support or technical help</li>
            <li>Follow up if necessary</li>
          </ol>
          <p><strong>Best regards,</strong><br>Contact Form System</p>
        </div>
      </body>
      </html>
    `;

    // Customer auto-reply email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .message-box { background: white; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 Thank You for Contacting Us!</h1>
          <p>We've received your message</p>
        </div>
        <div class="content">
          <h2>Hi ${formData.name},</h2>
          <p>Thank you for reaching out to us! We've successfully received your message and our team will get back to you within 24 hours.</p>
          
          <div class="message-box">
            <h3>📋 Your Message Summary:</h3>
            <p><em>"${formData.message.length > 200 ? formData.message.substring(0, 200) + '...' : formData.message}"</em></p>
          </div>
          
          <h3>🚀 What Happens Next?</h3>
          <ol>
            <li>Our support team reviews your message</li>
            <li>We'll respond to your email: ${formData.email}</li>
            <li>Response time: Within 24 hours</li>
            <li>Check your inbox for our reply</li>
          </ol>
          
          <h3>📞 Need Immediate Help?</h3>
          <p>If you have urgent questions, feel free to reach out to us directly at <strong>support@highticketsales.com</strong></p>
          
          <p><strong>Best regards,</strong><br>The High-Ticket Sales Team</p>
        </div>
      </body>
      </html>
    `;

    // Send email to admin
    const adminResult = await transporter.sendMail({
      from: `"High-Ticket Sales System" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📬 New Contact: ${formData.name} - ${formData.email}`,
      html: adminEmailHtml,
    });
    console.log('✅ Dev API: Admin contact email sent:', adminResult.messageId);

    // Send auto-reply to customer
    const customerResult = await transporter.sendMail({
      from: `"High-Ticket Sales" <${process.env.GMAIL_USER}>`,
      to: formData.email,
      subject: '📧 Thank You for Contacting High-Ticket Sales',
      html: customerEmailHtml,
    });
    console.log('✅ Dev API: Customer auto-reply sent:', customerResult.messageId);

    return new Response(JSON.stringify({
      success: true,
      message: 'Contact emails sent successfully',
      adminMessageId: adminResult.messageId,
      customerMessageId: customerResult.messageId,
      customerEmail: formData.email
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Dev API: Error sending contact email:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send contact email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
