import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, QrCode, CheckCircle, AlertCircle, Copy, Smartphone, ArrowRight } from "lucide-react";
import { UPIData, createUPIPaymentQR, formatAmount } from "@/lib/upi";

interface UPIPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: UPIData;
  onSuccess: (transactionId?: string) => void;
  onFailure: () => void;
}

const UPIPaymentModal: React.FC<UPIPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentData,
  onSuccess,
  onFailure,
}) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [upiUrl, setUpiUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'verifying' | 'completed'>('pending');
  const [orderId] = useState(`UPI-${Date.now()}`);

  useEffect(() => {
    if (isOpen && paymentData) {
      preparePayment();
    }
  }, [isOpen, paymentData]);

  const preparePayment = async () => {
    setIsGenerating(true);
    try {
      // Generate UPI URL for copying (but use static images for QR display)
      const amountInINR = paymentData.amount * 83;
      const upiOptions = {
        upiId: 'nysa7133@okicici',
        businessName: 'High-Ticket Sales Mastery',
        amount: amountInINR,
        orderId: orderId,
        transactionNote: paymentData.orderBump
          ? 'Ultimate Bundle + Advanced Scripts'
          : 'Ultimate High-Ticket Sales Bundle',
      };

      const params = new URLSearchParams({
        pa: upiOptions.upiId,
        pn: upiOptions.businessName,
        am: upiOptions.amount.toString(),
        cu: 'INR',
        tn: upiOptions.orderId,
      });

      const upiUrl = `upi://pay?${params.toString()}`;
      setUpiUrl(upiUrl);
    } catch (error) {
      console.error('Failed to prepare payment:', error);
      toast({
        title: "Payment Error",
        description: "Failed to prepare UPI payment. Please try again.",
        variant: "destructive",
      });
      onFailure();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyUPIUrl = () => {
    navigator.clipboard.writeText(upiUrl);
    toast({
      title: "UPI Link Copied",
      description: "UPI payment link copied to clipboard",
    });
  };

  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your UPI transaction ID/reference number",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setPaymentStatus('verifying');

    // Simulate payment verification (in production, integrate with UPI verification API)
    setTimeout(() => {
      setIsVerifying(false);
      setPaymentStatus('completed');

      toast({
        title: "Payment Successful!",
        description: "Your UPI payment has been verified successfully",
      });

      // Send confirmation emails and complete order
      onSuccess(transactionId);

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  const amountInINR = paymentData.amount * 83;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Pay via UPI</h2>
            <p className="text-gray-300">
              Scan the QR code or copy the UPI link to complete payment
            </p>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mb-4" />
                <p className="text-gray-300">Preparing Payment...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img
                      src={paymentData.orderBump ? "/addon.jpg" : "/standard.jpg"}
                      alt="UPI Payment QR Code"
                      className="w-72 h-72 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Scan with Google Pay, PhonePe, or Paytm
                  </p>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-yellow-400 font-semibold">
                      {formatAmount(amountInINR)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-white">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Merchant:</span>
                    <span className="text-white">High-Ticket Sales Mastery</span>
                  </div>
                </div>

                {/* Copy UPI Link */}
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">UPI Payment Link</Label>
                  <div className="flex gap-2">
                    <Input
                      value={upiUrl}
                      readOnly
                      className="bg-gray-700 border-gray-600 text-white text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyUPIUrl}
                      className="flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Verification Section */}
          {upiUrl && (
            <div className="space-y-4">
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-yellow-400 font-medium mb-1">After Payment:</p>
                    <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Complete payment using your UPI app</li>
                      <li>Note the transaction ID/reference number</li>
                      <li>Enter it below for verification</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Transaction ID Input */}
              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-gray-300 text-sm">
                  Transaction ID / Reference Number
                </Label>
                <Input
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter UPI transaction ID..."
                  className="bg-gray-700 border-gray-600 focus:border-yellow-400 text-white"
                  disabled={isVerifying || paymentStatus === 'completed'}
                />
              </div>

              {/* Payment Status */}
              {paymentStatus === 'completed' && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Payment Successful!</p>
                      <p className="text-gray-300 text-sm">Your order has been confirmed</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isVerifying}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyPayment}
                  disabled={isVerifying || paymentStatus === 'completed'}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-white mb-2">Important:</p>
                <ul className="space-y-1">
                  <li>• Amount is pre-filled but editable in UPI apps</li>
                  <li>• Keep your transaction ID for records</li>
                  <li>• Payment confirmation may take 1-2 minutes</li>
                  <li>• Contact support if you face any issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPIPaymentModal;
