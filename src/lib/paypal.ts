/**
 * PayPal Payment Integration
 * 
 * This module provides PayPal payment processing functionality
 */

export interface PayPalOrderData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  amount: number; // in USD
  orderBump: boolean;
}

export interface PayPalConfig {
  clientId: string;
  currency: string;
  environment: 'sandbox' | 'production';
}

/**
 * Load PayPal SDK script
 */
export const loadPayPalScript = (clientId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.paypal) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load PayPal SDK'));
    };

    document.body.appendChild(script);
  });
};

/**
 * Create PayPal order
 */
export const createPayPalOrder = async (paymentData: PayPalOrderData): Promise<string> => {
  // In a real implementation, this would call your backend to create an order
  // For now, we'll simulate order creation
  const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('PayPal Order Created:', {
    orderId,
    amount: paymentData.amount,
    currency: 'USD',
    customer: {
      name: paymentData.name,
      email: paymentData.email,
      phone: paymentData.phone
    }
  });

  return orderId;
};

/**
 * Approve PayPal payment
 */
export const approvePayPalPayment = async (orderId: string, paymentData: PayPalOrderData): Promise<void> => {
  // In a real implementation, this would call your backend to capture the payment
  console.log('PayPal Payment Approved:', {
    orderId,
    customer: paymentData.email,
    amount: paymentData.amount
  });

  // Store payment completion
  sessionStorage.setItem(`paypal_payment_${paymentData.email}`, JSON.stringify({
    orderId,
    status: 'completed',
    timestamp: Date.now(),
    amount: paymentData.amount
  }));
};

/**
 * Handle PayPal payment flow
 */
export const handlePayPalPayment = async (
  paymentData: PayPalOrderData,
  onSuccess: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    // Validate required fields
    if (!paymentData.name || !paymentData.email || !paymentData.phone) {
      onError('Please fill in all required fields (name, email, phone).');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentData.email)) {
      onError('Please enter a valid email address.');
      return;
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(paymentData.phone) || paymentData.phone.length < 10) {
      onError('Please enter a valid phone number.');
      return;
    }

    // Load PayPal SDK
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) {
      onError('PayPal is not configured. Please contact support.');
      return;
    }

    await loadPayPalScript(clientId);

    // Create order
    const orderId = await createPayPalOrder(paymentData);

    // Store order details for later processing
    sessionStorage.setItem('pendingPayPalOrder', JSON.stringify({
      ...paymentData,
      orderId,
      timestamp: Date.now()
    }));

    // Render PayPal buttons
    const container = document.getElementById('paypal-button-container');
    if (!container) {
      onError('PayPal container not found. Please refresh the page.');
      return;
    }

    container.innerHTML = ''; // Clear previous buttons

    window.paypal.Buttons({
      createOrder: async () => {
        return orderId;
      },
      onApprove: async (data: any) => {
        try {
          await approvePayPalPayment(data.orderID, paymentData);
          onSuccess();
        } catch (error) {
          console.error('PayPal approval error:', error);
          onError('Payment approval failed. Please try again.');
        }
      },
      onError: (err: any) => {
        console.error('PayPal error:', err);
        onError('PayPal payment failed. Please try again.');
      },
      onCancel: () => {
        onError('Payment was cancelled.');
      }
    }).render(container);

  } catch (error) {
    console.error('PayPal payment error:', error);
    onError('Failed to initialize PayPal. Please try again.');
  }
};

/**
 * Check PayPal payment status
 */
export const checkPayPalPaymentStatus = (email: string): boolean => {
  const paymentData = sessionStorage.getItem(`paypal_payment_${email}`);
  return paymentData ? JSON.parse(paymentData).status === 'completed' : false;
};

/**
 * Generate PayPal payment link (alternative to buttons)
 */
export const generatePayPalPaymentLink = (paymentData: PayPalOrderData): string => {
  // This would generate a PayPal.me or PayPal payment link
  const baseUrl = 'https://www.paypal.com/paypalme/yourbusiness';
  const params = new URLSearchParams({
    amount: paymentData.amount.toString(),
    currency: 'USD',
    note: `High-Ticket Sales Mastery Bundle - ${paymentData.name}`,
    invoice_id: `INV-${Date.now()}`
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Open PayPal payment link in new window
 */
export const openPayPalPaymentLink = (paymentData: PayPalOrderData): void => {
  const paymentLink = generatePayPalPaymentLink(paymentData);
  window.open(paymentLink, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
};

// Extend Window interface for PayPal
declare global {
  interface Window {
    paypal: any;
  }
}
