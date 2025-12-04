/**
 * Razorpay Payment Links Integration
 * 
 * This module provides a workaround for Razorpay's rejection of digital bundle sales
 * by using payment links instead of direct checkout integration.
 */

export interface PaymentLinkData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  amount: number; // in USD
  orderBump: boolean;
}

export interface PaymentLinkConfig {
  // These should be created manually in Razorpay dashboard
  standardBundleLink: string; // $147 payment link
  bundleWithBumpLink: string; // $184 payment link ($147 + $37)
}

/**
 * Generate Razorpay payment link based on order details
 */
export const generatePaymentLink = (
  paymentData: PaymentLinkData,
  config: PaymentLinkConfig
): string => {
  const link = paymentData.orderBump 
    ? config.bundleWithBumpLink 
    : config.standardBundleLink;
  
  // You can add UTM parameters to track the source
  const utmParams = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'checkout',
    utm_campaign: 'high-ticket-bundle',
    customer_name: encodeURIComponent(paymentData.name),
    customer_email: encodeURIComponent(paymentData.email),
    customer_phone: encodeURIComponent(paymentData.phone)
  });
  
  return `${link}?${utmParams.toString()}`;
};

/**
 * Open payment link in new window
 */
export const openPaymentLink = (link: string): void => {
  window.open(link, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
};

/**
 * Handle payment link click with form validation
 */
export const handlePaymentLinkClick = (
  paymentData: PaymentLinkData,
  config: PaymentLinkConfig,
  onSuccess: () => void,
  onError: (error: string) => void
): void => {
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

    // Generate and open payment link
    const paymentLink = generatePaymentLink(paymentData, config);
    
    // Store order details for later processing
    sessionStorage.setItem('pendingOrder', JSON.stringify({
      ...paymentData,
      paymentLink,
      timestamp: Date.now()
    }));

    // Open payment link
    openPaymentLink(paymentLink);
    
    // Show success message
    onSuccess();
    
    // Also store for admin notification
    localStorage.setItem('lastPaymentRequest', JSON.stringify({
      ...paymentData,
      paymentLink,
      timestamp: Date.now()
    }));

  } catch (error) {
    console.error('Payment link error:', error);
    onError('Failed to generate payment link. Please try again.');
  }
};

/**
 * Check if user has completed payment (manual verification)
 * This would typically be handled by webhooks or manual verification
 */
export const checkPaymentStatus = (email: string): boolean => {
  // In a real implementation, this would check with your backend
  // For now, we'll check sessionStorage for demo purposes
  const paymentCompleted = sessionStorage.getItem(`payment_${email}`);
  return paymentCompleted === 'completed';
};

/**
 * Mark payment as completed (for demo/manual verification)
 */
export const markPaymentCompleted = (email: string, paymentId: string): void => {
  sessionStorage.setItem(`payment_${email}`, 'completed');
  sessionStorage.setItem(`payment_id_${email}`, paymentId);
};

/**
 * Default payment link configuration
 * Updated with actual Razorpay payment link
 */
export const defaultPaymentLinkConfig: PaymentLinkConfig = {
  standardBundleLink: 'https://rzp.io/rzp/Vs1st9B', // Main payment link
  bundleWithBumpLink: 'https://rzp.io/rzp/Vs1st9B', // Same link for now (can be split later)
};
