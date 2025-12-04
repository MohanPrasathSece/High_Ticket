import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface OrderDetails {
  name: string;
  email: string;
  amount: number;
  orderBump: boolean;
  paymentId: string;
  date: string;
}

const handler: Handler = async (event) => {
  console.log('🚀 Send email function called');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('❌ Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('📧 Parsing request body...');
    const orderDetails: OrderDetails = JSON.parse(event.body || '{}');
    console.log('📋 Order details received:', JSON.stringify(orderDetails, null, 2));

    // Validate required fields
    if (!orderDetails.email || !orderDetails.name || !orderDetails.paymentId) {
      console.log('❌ Missing required fields:', { email: !!orderDetails.email, name: !!orderDetails.name, paymentId: !!orderDetails.paymentId });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Check environment variables
    console.log('🔍 Checking environment variables...');
    console.log('GMAIL_USER exists:', !!process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
    console.log('ADMIN_EMAIL exists:', !!process.env.ADMIN_EMAIL);
    console.log('VITE_SITE_URL:', process.env.VITE_SITE_URL);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('❌ Gmail credentials not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' }),
      };
    }

    // Create transporter with Gmail SMTP
    console.log('📨 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test transporter connection
    console.log('🔗 Testing transporter connection...');
    await transporter.verify();
    console.log('✅ Transporter connection successful');

    // Get site URL from environment
    const siteUrl = process.env.VITE_SITE_URL || 'https://your-site.netlify.app';

    // Direct ZIP bundle link served from /public/bundle.zip
    const bundleZipUrl = `${siteUrl}/bundle.zip`;

    // Single direct download button for the full bundle plus plain text fallback link
    const downloadLinksHtml = `
            <div style="margin: 10px 0;">
              <a href="${bundleZipUrl}"
                 style="display: inline-block; background: #1a1a1a; color: #D4AF37; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s;">
                📦 Download Your Complete High-Ticket Mastery Bundle (ZIP)
              </a>
              <p style="margin-top: 8px; font-size: 13px; color: #555;">
                If the button above does not work, copy and paste this link into your browser:<br/>
                <a href="${bundleZipUrl}" style="color: #1a73e8; word-break: break-all;">${bundleZipUrl}</a>
              </p>
            </div>
        `;

    // Buyer email HTML
    const buyerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .details-box { background: white; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .download-section { background: white; border: 2px solid #1a1a1a; padding: 20px; margin: 20px 0; border-radius: 10px; }
          .download-note { background: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Payment Successful!</h1>
          <p>Thank you for your purchase</p>
        </div>
        <div class="content">
          <h2>Hi ${orderDetails.name},</h2>
          <p>Congratulations! Your payment has been successfully processed.</p>
          <div class="details-box">
            <h3>📋 Order Details</h3>
            <div class="detail-row"><strong>Product:</strong> ${orderDetails.orderBump ? 'Ultimate High-Ticket Sales Bundle + Advanced Outreach Scripts' : 'Ultimate High-Ticket Sales Bundle'}</div>
            <div class="detail-row"><strong>Amount Paid:</strong> $${orderDetails.amount}</div>
            <div class="detail-row"><strong>Payment ID:</strong> ${orderDetails.paymentId}</div>
            <div class="detail-row"><strong>Order Date:</strong> ${orderDetails.date}</div>
            <div class="detail-row"><strong>Order Bump:</strong> ${orderDetails.orderBump ? 'Yes' : 'No'}</div>
          </div>
          
          <div class="download-section">
            <h3 style="color: #1a1a1a; margin-top: 0;">📥 Download Your Bundle Files</h3>
            <p style="margin-bottom: 20px;">Click the buttons below to download all your materials. You have <strong>lifetime access</strong> to these files.</p>
            ${downloadLinksHtml}
          </div>

          <div class="download-note">
            <strong>💡 Important Notes:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>These download links are exclusively for you</li>
              <li>You can download the files anytime</li>
              <li>Save this email for future access</li>
              <li>If you have any issues downloading, contact support</li>
            </ul>
          </div>

          <h3>🚀 What's Next?</h3>
          <ol>
            <li>Download all your materials using the links above</li>
            <li>Review the materials at your own pace</li>
            <li>Start implementing the strategies immediately</li>
            <li>Reach out if you have any questions!</li>
          </ol>
          <p><strong>Best regards,</strong><br>The High-Ticket Sales Team</p>
        </div>
      </body>
      </html>
    `;

    // Admin email HTML
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .alert-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          .info-box { background: white; border: 1px solid #ddd; padding: 15px; margin: 20px 0; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💰 New Order Received!</h1>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⚡ Action Required:</strong> New order placed. Send access details to customer.
          </div>
          <div class="info-box">
            <h3>👤 Customer Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${orderDetails.name}</div>
            <div class="detail-row"><strong>Email:</strong> ${orderDetails.email}</div>
          </div>
          <div class="info-box">
            <h3>🛒 Order Details</h3>
            <div class="detail-row"><strong>Product:</strong> ${orderDetails.orderBump ? 'Ultimate High-Ticket Sales Bundle + Advanced Outreach Scripts' : 'Ultimate High-Ticket Sales Bundle'}</div>
            <div class="detail-row"><strong>Amount:</strong> ₹${orderDetails.amount}</div>
            <div class="detail-row"><strong>Payment ID:</strong> ${orderDetails.paymentId}</div>
            <div class="detail-row"><strong>Date:</strong> ${orderDetails.date}</div>
            <div class="detail-row"><strong>Order Bump:</strong> ${orderDetails.orderBump ? 'Yes' : 'No'}</div>
          </div>
          <h3>✅ Next Steps:</h3>
          <ol>
            <li>Verify payment in Razorpay Dashboard</li>
            <li>Send access credentials to ${orderDetails.email}</li>
            <li>Add customer to CRM</li>
          </ol>
        </div>
      </body>
      </html>
    `;

    // Send email to buyer with bundle.zip attached and download link in body
    console.log('📤 Sending buyer email to:', orderDetails.email);

    try {
      // Fetch bundle.zip as buffer for proper attachment
      const bundleResponse = await fetch(bundleZipUrl);
      const bundleBuffer = await bundleResponse.arrayBuffer();

      const buyerResult = await transporter.sendMail({
        from: `"High-Ticket Sales" <${process.env.GMAIL_USER}>`,
        to: orderDetails.email,
        subject: '🎉 Order Confirmed - High-Ticket Sales Bundle',
        html: buyerEmailHtml,
        attachments: [
          {
            filename: 'bundle.zip',
            content: Buffer.from(bundleBuffer),
          },
        ],
      });
      console.log('✅ Buyer email sent successfully:', buyerResult.messageId);
    } catch (buyerError) {
      console.error('❌ Buyer email failed:', buyerError);

      // Notify admin that buyer email failed so they can manually send the bundle
      if (process.env.ADMIN_EMAIL) {
        try {
          console.log('📤 Notifying admin about buyer email failure:', process.env.ADMIN_EMAIL);
          const fallbackAdminResult = await transporter.sendMail({
            from: `"High-Ticket Sales System" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `⚠️ ACTION REQUIRED: Failed to send bundle to ${orderDetails.email}`,
            html: `
              <p>The system failed to send the High-Ticket Sales bundle to the buyer.</p>
              <p><strong>Please manually send the bundle.zip to the customer and verify payment.</strong></p>
              <h3>Buyer Details</h3>
              <ul>
                <li><strong>Name:</strong> ${orderDetails.name}</li>
                <li><strong>Email:</strong> ${orderDetails.email}</li>
                <li><strong>Amount:</strong> ₹${orderDetails.amount}</li>
                <li><strong>Payment ID:</strong> ${orderDetails.paymentId}</li>
                <li><strong>Date:</strong> ${orderDetails.date}</li>
                <li><strong>Order Bump:</strong> ${orderDetails.orderBump ? 'Yes' : 'No'}</li>
              </ul>
              <p>You can also share this direct bundle link: <a href="${bundleZipUrl}">${bundleZipUrl}</a></p>
            `,
          });
          console.log('✅ Admin notified about buyer email failure:', fallbackAdminResult.messageId);
        } catch (notifyError) {
          console.error('❌ Failed to notify admin about buyer email failure:', notifyError);
        }
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to send buyer email. Admin has been notified to send the bundle manually.',
        }),
      };
    }

    // Send email to admin (standard order notification)
    console.log('📤 Sending admin email to:', process.env.ADMIN_EMAIL);
    const adminResult = await transporter.sendMail({
      from: `"High-Ticket Sales System" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `💰 New Order: ${orderDetails.name} - ₹${orderDetails.amount}`,
      html: adminEmailHtml,
    });
    console.log('✅ Admin email sent successfully:', adminResult.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Emails sent successfully'
      }),
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };
