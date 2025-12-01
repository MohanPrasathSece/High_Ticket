import { CreditCard, Globe2, ShieldCheck } from "lucide-react";

const InternationalPaymentNotice = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            🌍 International Payment Information
          </h3>
          
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Payment Processing</p>
                <p>While prices are shown in USD for your convenience, all transactions are securely processed in Indian Rupees (INR) through Razorpay - India's leading payment gateway.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Automatic Currency Conversion</p>
                <p>Your bank or credit card company will automatically handle the USD to INR conversion at the current exchange rate. No additional steps needed!</p>
              </div>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-3 mt-4">
              <p className="font-medium text-blue-900 mb-1">What this means for you:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Pay with your regular international credit/debit card</li>
                <li>• Your bank handles the currency conversion automatically</li>
                <li>• The exact INR amount may vary slightly based on your bank's exchange rate</li>
                <li>• You'll see the converted amount on your card statement</li>
              </ul>
            </div>
            
            <p className="text-xs text-blue-600 mt-3">
              <strong>Note:</strong> Razorpay is a secure, PCI-DSS compliant payment processor trusted by millions of customers worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalPaymentNotice;
