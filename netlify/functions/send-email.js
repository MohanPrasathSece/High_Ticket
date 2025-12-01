const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Parse the incoming request body
    const orderDetails = JSON.parse(event.body);
    
    console.log('📧 Processing order email for:', orderDetails.email);
    
    // Email configuration (in production, use environment variables)
    const adminEmail = 'nysa7133@gmail.com';
    const fromEmail = 'noreply@highticketsales.com';
    
    // Prepare email content
    const customerEmailContent = {
      to: orderDetails.email,
      from: fromEmail,
      subject: `Order Confirmation - High-Ticket Sales Mastery Bundle`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #fbbf24; font-size: 28px; margin-bottom: 10px;">Order Confirmation</h1>
            <p style="color: #9ca3af;">Thank you for your purchase!</p>
          </div>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px;">Order Details</h2>
            <div style="color: #fff; line-height: 1.6;">
              <p><strong>Order ID:</strong> ${orderDetails.orderId || 'N/A'}</p>
              <p><strong>Payment ID:</strong> ${orderDetails.paymentId}</p>
              <p><strong>Amount:</strong> $${orderDetails.amount}</p>
              <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod || 'N/A'}</p>
              <p><strong>Date:</strong> ${orderDetails.date}</p>
              ${orderDetails.orderBump ? '<p><strong>Order Bump:</strong> Script Pack Added</p>' : ''}
            </div>
          </div>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px;">Download Your Bundle</h2>
            <p style="color: #fff; margin-bottom: 15px;">Your High-Ticket Sales Mastery bundle is ready for download!</p>
            <a href="${process.env.URL || 'http://localhost:3000'}/download?paymentId=${orderDetails.paymentId}&email=${encodeURIComponent(orderDetails.email)}" 
               style="background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Download Your Bundle (16 Files)
            </a>
            <p style="color: #9ca3af; font-size: 14px; margin-top: 15px;">
              This link is valid for 24 hours. After that, contact support for access.
            </p>
          </div>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px;">What's Included</h2>
            <ul style="color: #fff; line-height: 1.6;">
              <li>Complete Guide Book (PDF + DOCX)</li>
              <li>3-Part Guide Series (PDF + DOCX)</li>
              <li>Success Checklists (PDF + DOCX)</li>
              <li>AI Prompts Pack (PDF + DOCX)</li>
              <li>Recommended Tools (PDF + DOCX)</li>
              <li>Implementation Workbooks (PDF + DOCX)</li>
              ${orderDetails.orderBump ? '<li>BONUS: Script Pack (PDF + DOCX)</li>' : ''}
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #9ca3af; font-size: 14px;">
              If you have any questions, please contact us at:<br>
              <a href="mailto:support@highticketsales.com" style="color: #fbbf24;">support@highticketsales.com</a>
            </p>
          </div>
        </div>
      `
    };
    
    const adminEmailContent = {
      to: adminEmail,
      from: fromEmail,
      subject: `New Order: ${orderDetails.name} - $${orderDetails.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; color: #333;">
          <h1 style="color: #fbbf24; font-size: 24px; margin-bottom: 20px;">New Order Received!</h1>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #fbbf24;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">Customer Information</h2>
            <div style="line-height: 1.6;">
              <p><strong>Name:</strong> ${orderDetails.name}</p>
              <p><strong>Email:</strong> ${orderDetails.email}</p>
              <p><strong>Order ID:</strong> ${orderDetails.orderId || 'N/A'}</p>
              <p><strong>Payment ID:</strong> ${orderDetails.paymentId}</p>
              <p><strong>Amount:</strong> $${orderDetails.amount}</p>
              <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod || 'N/A'}</p>
              <p><strong>Date:</strong> ${orderDetails.date}</p>
              ${orderDetails.orderBump ? '<p><strong>Order Bump:</strong> Yes ($37)</p>' : ''}
            </div>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
            <p style="color: #666; font-size: 14px;">
              This is an automated notification. Please keep this record for your files.
            </p>
          </div>
        </div>
      `
    };
    
    // In production, you would use an email service like:
    // - SendGrid: require('@sendgrid/mail')
    // - Resend: require('resend')
    // - AWS SES: require('@aws-sdk/client-ses')
    
    // For now, just log the email content
    console.log('📧 Customer email would be sent to:', orderDetails.email);
    console.log('📧 Admin email would be sent to:', adminEmail);
    console.log('📧 Email contents prepared successfully');
    
    // Mock successful email sending
    // In production, replace this with actual email service calls
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Emails processed successfully',
        customerEmail: orderDetails.email,
        orderId: orderDetails.orderId
      })
    };
    
  } catch (error) {
    console.error('❌ Error processing email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: 'Failed to process email'
      })
    };
  }
};
