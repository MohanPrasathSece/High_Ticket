export interface OrderDetails {
    name: string;
    email: string;
    amount: number;
    orderBump: boolean;
    paymentId: string;
    orderId?: string;
    date: string;
}

/**
 * Send both buyer and admin emails via serverless function
 */
export const sendOrderEmails = async (orderDetails: OrderDetails): Promise<void> => {
    console.log('📧 Sending order confirmation emails...');

    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details || 'Failed to send emails');
        }

        const result = await response.json();
        console.log('✅ Emails sent successfully:', result);
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        throw error;
    }
};
