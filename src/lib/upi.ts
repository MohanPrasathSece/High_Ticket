import QRCode from 'qrcode';

export interface UPIData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  amount: number;
  orderBump: boolean;
}

export interface UPIOptions {
  upiId: string;
  businessName: string;
  amount: number;
  orderId: string;
  transactionNote?: string;
}

// UPI configuration - replace with your actual UPI details
export const UPI_CONFIG = {
  upiId: 'nysa7133@okicici', // Replace with your actual UPI ID
  businessName: 'High-Ticket Sales Mastery',
  merchantCode: '123456', // Optional merchant code
};

/**
 * Generate UPI payment URL
 */
export const generateUPIURL = (options: UPIOptions): string => {
  const params = new URLSearchParams({
    pa: options.upiId,
    pn: options.businessName,
    am: options.amount.toString(),
    cu: 'INR',
    tn: options.orderId,
    // Optional parameters
    ...(options.transactionNote && { tn: options.transactionNote }),
  });

  return `upi://pay?${params.toString()}`;
};

/**
 * Generate QR code for UPI payment
 */
export const generateUPIQRCode = async (upiUrl: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(upiUrl, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Create UPI payment QR code with order details
 */
export const createUPIPaymentQR = async (
  paymentData: UPIData,
  orderId: string
): Promise<{ qrCode: string; upiUrl: string }> => {
  const amountInINR = paymentData.amount * 83; // Convert USD to INR (approximate rate)
  
  const upiOptions: UPIOptions = {
    upiId: UPI_CONFIG.upiId,
    businessName: UPI_CONFIG.businessName,
    amount: amountInINR,
    orderId: orderId,
    transactionNote: paymentData.orderBump 
      ? 'Ultimate Bundle + Advanced Scripts' 
      : 'Ultimate High-Ticket Sales Bundle',
  };

  const upiUrl = generateUPIURL(upiOptions);
  const qrCode = await generateUPIQRCode(upiUrl);

  return { qrCode, upiUrl };
};

/**
 * Validate UPI ID format
 */
export const validateUPIId = (upiId: string): boolean => {
  const upiIdRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  return upiIdRegex.test(upiId);
};

/**
 * Format amount for display
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
