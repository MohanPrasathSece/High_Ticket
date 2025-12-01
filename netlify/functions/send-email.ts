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
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const orderDetails: OrderDetails = JSON.parse(event.body || '{}');

        // Validate required fields
        if (!orderDetails.email || !orderDetails.name || !orderDetails.paymentId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

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
            <div class="detail-row"><strong>Amount Paid:</strong> ₹${orderDetails.amount}</div>
            <div class="detail-row"><strong>Payment ID:</strong> ${orderDetails.paymentId}</div>
            <div class="detail-row"><strong>Order Date:</strong> ${orderDetails.date}</div>
            <div class="detail-row"><strong>Order Bump:</strong> ${orderDetails.orderBump ? 'Yes' : 'No'}</div>
          </div>
          <h3>📥 What's Next?</h3>
          <ol>
            <li>You'll receive another email with your access links shortly</li>
            <li>Download all your materials</li>
            <li>Start implementing immediately!</li>
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

        // Send email to buyer
        await transporter.sendMail({
            from: `"High-Ticket Sales" <${process.env.GMAIL_USER}>`,
            to: orderDetails.email,
            subject: '🎉 Order Confirmed - High-Ticket Sales Bundle',
            html: buyerEmailHtml,
        });

        console.log('✅ Buyer email sent to:', orderDetails.email);

        // Send email to admin
        await transporter.sendMail({
            from: `"High-Ticket Sales System" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `💰 New Order: ${orderDetails.name} - ₹${orderDetails.amount}`,
            html: adminEmailHtml,
        });

        console.log('✅ Admin email sent to:', process.env.ADMIN_EMAIL);

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
