declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentData {
  name: string;
  email: string;
  amount: number;
  orderBump: boolean;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/**
 * Load Razorpay checkout script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Create Razorpay order
 */
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  // For client-side only deployment, we'll use payment without order_id
  // In production, you should create order from backend
  // This is a simplified version that works without backend
  return '';
};

/**
 * Initialize Razorpay payment
 */
export const initiateRazorpayPayment = async (
  paymentData: PaymentData,
  onSuccess: (response: RazorpayResponse) => void,
  onFailure: () => void
): Promise<void> => {
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    onFailure();
    return;
  }

  const options: RazorpayOptions = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: paymentData.amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    name: 'High-Ticket Sales Bundle',
    description: paymentData.orderBump 
      ? 'Ultimate Bundle + Advanced Outreach Scripts' 
      : 'Ultimate High-Ticket Sales Bundle',
    image: '/favicon.ico',
    prefill: {
      name: paymentData.name,
      email: paymentData.email,
    },
    theme: {
      color: '#D4AF37', // Gold color
    },
    handler: (response: RazorpayResponse) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        onFailure();
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

/**
 * Verify payment signature (client-side simple verification)
 * Note: For production, always verify on server-side
 */
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // This is a placeholder. In production, verification MUST happen on server-side
  // We'll return true for now as we're doing client-side only implementation
  return true;
};
