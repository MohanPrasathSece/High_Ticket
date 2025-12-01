import { AlertCircle, Globe } from "lucide-react";

const CurrencyBanner = () => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Globe className="w-5 h-5 text-gray-800 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            International Customers Welcome! 🌍
          </h3>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              <strong>Important:</strong> Prices are displayed in USD for your convenience, but payments are processed in Indian Rupees (INR) through Razorpay - India's secure payment gateway.
            </p>
            <p className="text-gray-700">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Your bank will automatically handle the currency conversion. No need to worry - you can pay using your regular credit/debit card!
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Exchange rate: 1 USD ≈ 83 INR (approximate, may vary based on your bank's rate)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyBanner;
