export interface OrderDetails {
    name: string;
    email: string;
    amount: number;
    orderBump: boolean;
    paymentId: string;
    orderId?: string;
    date: string;
    paymentMethod?: string;
}

/**
 * Send both buyer and admin emails (mock implementation for demo)
 * In production, this would use a real email service like SendGrid, Resend, or Netlify functions
 */
export const sendOrderEmails = async (orderDetails: OrderDetails): Promise<void> => {
    console.log('📧 Sending order confirmation emails...');

    try {
        // Mock email sending for demo purposes
        // In production, replace this with actual email service integration
        
        console.log('📧 Customer email would be sent to:', orderDetails.email);
        console.log('📧 Admin email would be sent to: admin@highticketsales.com');
        
        // Log order details for demo
        const emailContent = {
            customerEmail: orderDetails.email,
            customerName: orderDetails.name,
            amount: orderDetails.amount,
            paymentMethod: orderDetails.paymentMethod || 'Unknown',
            paymentId: orderDetails.paymentId,
            orderId: orderDetails.orderId,
            orderBump: orderDetails.orderBump,
            date: orderDetails.date,
            downloadLink: `${window.location.origin}/download?paymentId=${orderDetails.paymentId}&email=${encodeURIComponent(orderDetails.email)}`
        };
        
        console.log('📧 Email content prepared:', emailContent);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ Emails sent successfully (mock implementation)');
        
        // Optional: Store order in localStorage for demo purposes
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push({
            ...orderDetails,
            timestamp: Date.now(),
            emailSent: true
        });
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        // Don't throw error to avoid blocking payment flow
        console.log('📧 Email error handled - payment will continue');
    }
};

/**
 * Real email service integration example (for production)
 */
export const sendRealEmails = async (orderDetails: OrderDetails): Promise<void> => {
    // This would be the real implementation using:
    // - SendGrid API
    // - Resend API  
    // - Netlify functions
    // - Or any other email service
    
    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to send emails');
        }

        console.log('✅ Real emails sent successfully');
    } catch (error) {
        console.error('❌ Error sending real emails:', error);
        throw error;
    }
};
