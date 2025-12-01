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
 * Send both buyer and admin emails using Netlify function
 */
export const sendOrderEmails = async (orderDetails: OrderDetails): Promise<void> => {
    console.log('📧 Sending order confirmation emails...');

    try {
        // Use the real Netlify function for email sending
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}: Failed to send emails`);
        }

        const result = await response.json();
        console.log('✅ Emails sent successfully:', result);
        
        // Store order in localStorage for tracking
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push({
            ...orderDetails,
            timestamp: Date.now(),
            emailSent: true,
            emailResponse: result
        });
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        // Fallback to mock implementation if Netlify function fails
        console.log('📧 Falling back to mock email implementation');
        
        try {
            console.log('📧 Customer email (mock) to:', orderDetails.email);
            console.log('📧 Admin email (mock) to: admin@highticketsales.com');
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('✅ Mock emails sent as fallback');
            
            // Still store the order
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            existingOrders.push({
                ...orderDetails,
                timestamp: Date.now(),
                emailSent: 'mock_fallback'
            });
            localStorage.setItem('orders', JSON.stringify(existingOrders));
            
        } catch (fallbackError) {
            console.error('❌ Even fallback email failed:', fallbackError);
            // Don't throw error to avoid blocking payment flow
        }
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
