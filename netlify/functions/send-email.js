const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Email service configuration
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nysa7133@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || GMAIL_USER;
const SITE_URL = process.env.URL || 'http://localhost:3000';

/**
 * Create SMTP transporter using Gmail
 */
async function createTransporter() {
    try {
        if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
            console.log('📧 No Gmail credentials found, using mock email sending');
            return null;
        }

        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false // For development
            }
        });

        // Verify connection
        await transporter.verify();
        console.log('✅ Gmail SMTP transporter created and verified');
        return transporter;
    } catch (error) {
        console.error('❌ Error creating Gmail transporter:', error);
        return null;
    }
}

/**
 * Send email using Gmail SMTP
 */
async function sendEmail(transporter, to, subject, htmlContent) {
    try {
        if (!transporter) {
            console.log('📧 No transporter available, using mock email sending');
            return { success: true, mock: true };
        }

        const mailOptions = {
            from: `"High-Ticket Sales Mastery" <${FROM_EMAIL}>`,
            to: to,
            subject: subject,
            html: htmlContent,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', result.messageId);
        return { success: true, result };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Generate customer email content
 */
function generateCustomerEmail(orderDetails) {
    return {
        to: orderDetails.email,
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
                    <a href="${SITE_URL}/download?paymentId=${orderDetails.paymentId}&email=${encodeURIComponent(orderDetails.email)}" 
                       style="background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Download Complete Bundle (ZIP)
                    </a>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 15px;">
                        This link is valid for 24 hours. After that, contact support for access.
                    </p>
                </div>
                
                <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px;">What's Included</h2>
                    <ul style="color: #fff; line-height: 1.6;">
                        <li>Complete Bundle ZIP (12.5 MB)</li>
                        <li>All 16 files included in single download</li>
                        <li>Both PDF and DOCX formats</li>
                        <li>Implementation guides and workbooks</li>
                        <li>AI prompts and checklists</li>
                        <li>Recommended tools and resources</li>
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
}

/**
 * Generate admin email content
 */
function generateAdminEmail(orderDetails) {
    return {
        to: ADMIN_EMAIL,
        subject: `New Order: ${orderDetails.name} - $${orderDetails.amount}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; color: #333;">
                <h1 style="color: #fbbf24; font-size: 24px; margin-bottom: 20px;">🎉 New Order Received!</h1>
                
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
                    <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Revenue Summary</h3>
                    <div style="line-height: 1.6;">
                        <p><strong>Base Bundle:</strong> $${orderDetails.orderBump ? '147' : '147'}</p>
                        ${orderDetails.orderBump ? '<p><strong>Order Bump:</strong> $37</p>' : ''}
                        <p><strong>Total Revenue:</strong> <span style="color: #28a745; font-weight: bold;">$${orderDetails.amount}</span></p>
                    </div>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p style="color: #666; font-size: 14px;">
                        This is an automated notification. Please keep this record for your files.
                    </p>
                </div>
            </div>
        `
    };
}

exports.handler = async (event, context) => {
    try {
        // Parse the incoming request body
        const orderDetails = JSON.parse(event.body);
        
        console.log('📧 Processing order email for:', orderDetails.email);
        
        // Create Gmail transporter
        const transporter = await createTransporter();
        
        // Prepare email content
        const customerEmailContent = generateCustomerEmail(orderDetails);
        const adminEmailContent = generateAdminEmail(orderDetails);
        
        // Send emails using Gmail SMTP
        const customerEmailResult = await sendEmail(transporter, customerEmailContent.to, customerEmailContent.subject, customerEmailContent.html);
        const adminEmailResult = await sendEmail(transporter, adminEmailContent.to, adminEmailContent.subject, adminEmailContent.html);
        
        // Log results
        console.log('📧 Customer email result:', customerEmailResult);
        console.log('📧 Admin email result:', adminEmailResult);
        
        // Return success response
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
                orderId: orderDetails.orderId,
                customerResult: customerEmailResult,
                adminResult: adminEmailResult
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
