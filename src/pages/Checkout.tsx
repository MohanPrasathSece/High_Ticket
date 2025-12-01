import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import TrustBadge from "@/components/TrustBadge";
import CurrencyBanner from "@/components/CurrencyBanner";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Lock, Shield, Loader2, ArrowLeft, Home, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { initiateRazorpayPayment, RazorpayResponse } from "@/lib/razorpay";
import { sendOrderEmails } from "@/lib/emailService";

const Checkout = () => {
  const navigate = useNavigate();
  const [orderBump, setOrderBump] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const basePrice = 147;
  const bumpPrice = 37;
  const total = orderBump ? basePrice + bumpPrice : basePrice;
  
  // Currency conversion (1 USD ≈ 83 INR as of current rate)
  const usdToInrRate = 83;
  const basePriceINR = basePrice * usdToInrRate;
  const bumpPriceINR = bumpPrice * usdToInrRate;
  const totalINR = total * usdToInrRate;

  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    console.log("✅ Payment successful:", response);

    setIsProcessing(true);

    try {
      // Prepare order details
      const orderDetails = {
        name: formData.name,
        email: formData.email,
        amount: total,
        orderBump,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        date: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };

      // Send emails to buyer and admin
      await sendOrderEmails(orderDetails);

      toast({
        title: "Payment Successful! 🎉",
        description: "Check your email for order confirmation and access details.",
      });

      // Navigate to thank you page
      setTimeout(() => {
        navigate("/thank-you", {
          state: {
            orderBump,
            paymentId: response.razorpay_payment_id,
            orderDetails
          }
        });
      }, 1500);
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Payment Successful",
        description: "But there was an issue sending confirmation email. We'll send it shortly.",
        variant: "default",
      });

      // Still navigate to thank you page
      setTimeout(() => {
        navigate("/thank-you", {
          state: {
            orderBump,
            paymentId: response.razorpay_payment_id
          }
        });
      }, 1500);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentFailure = () => {
    setIsProcessing(false);
    toast({
      title: "Payment Cancelled",
      description: "Your payment was not completed. Please try again.",
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if Razorpay key is configured
    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast({
        title: "Configuration Error",
        description: "Payment system is not configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Initiate Razorpay payment
      await initiateRazorpayPayment(
        {
          name: formData.name,
          email: formData.email,
          amount: total,
          orderBump,
        },
        handlePaymentSuccess,
        handlePaymentFailure
      );
    } catch (error) {
      console.error("Error initiating payment:", error);
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Navigation header */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                className="border-gold/30 hover:bg-gold/10 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-white">
                <span className="text-gradient-gold">High-Ticket</span> Sales Bundle
              </h1>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <TrustBadge type="secure" />
              <TrustBadge type="encrypted" />
              <TrustBadge type="guarantee" />
            </div>

            {/* Urgency banner */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-8 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-400 font-body font-semibold">
                  ⚠️ LIMITED TIME: 75% OFF - Only 12 spots remaining!
                </p>
              </div>
            </div>

            {/* Currency banner - only show once */}
            <CurrencyBanner />

            {/* Checkout card */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
              {/* Order summary header */}
              <div className="bg-gradient-to-r from-gold/10 to-gold/5 p-6 md:p-8 border-b border-slate-700">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-white mb-6">
                  Order Summary
                </h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <p className="font-body font-semibold text-white text-lg">
                      Ultimate High-Ticket Sales Bundle
                    </p>
                    <p className="text-sm text-slate-400 font-body">
                      Complete system + Bonus Scripts
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gold/10 border border-gold/30 rounded-full text-xs font-body text-gold">
                        Instant Access
                      </span>
                      <span className="px-2 py-1 bg-gold/10 border border-gold/30 rounded-full text-xs font-body text-gold">
                        30-Day Guarantee
                      </span>
                      <span className="px-2 py-1 bg-gold/10 border border-gold/30 rounded-full text-xs font-body text-gold">
                        Premium Support
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-slate-900/50 rounded-lg px-4 py-2">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-gold">
                        ${basePrice} <span className="text-sm text-slate-400 font-normal">(~₹{basePriceINR.toLocaleString()})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order bump */}
              <div className="p-6 md:p-8 border-b border-slate-700 bg-gradient-to-r from-gold/5 to-transparent">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <Checkbox
                    checked={orderBump}
                    onCheckedChange={(checked) => setOrderBump(checked as boolean)}
                    className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-body text-red-400 font-semibold animate-pulse">
                        ONE-TIME OFFER - SAVE 75%
                      </span>
                    </div>
                    <p className="font-body font-semibold text-white mb-2">
                      Yes — Add the Advanced Outreach Script Pack for just $37 <span className="text-sm text-slate-400 font-normal">(~₹{bumpPriceINR.toLocaleString()})</span>
                    </p>
                    <p className="text-sm text-slate-400 font-body mb-3">
                      DM, email, and call-opening scripts that help book high-intent prospects within 24 hours.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-10 border border-blue-30 rounded-full text-xs font-body text-blue">
                        50+ Scripts
                      </span>
                      <span className="px-2 py-1 bg-blue-10 border border-blue-30 rounded-full text-xs font-body text-blue">
                        Templates Included
                      </span>
                      <span className="px-2 py-1 bg-blue-10 border border-blue-30 rounded-full text-xs font-body text-blue">
                        AI Prompts
                      </span>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg px-3 py-2 inline-block">
                      <span className="text-xs text-slate-400 font-body line-through">$97 Value</span>
                      <span className="text-xs text-gold font-body font-semibold ml-2">Included for $37</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-slate-900/50 rounded-lg px-4 py-2">
                      <span className="font-heading font-bold text-gold text-lg">+$37 <span className="text-sm text-slate-400 font-normal">(~₹{bumpPriceINR.toLocaleString()})</span></span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                {/* Contact info */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-white flex items-center gap-3 text-lg">
                    <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm text-gold border border-gold/30">1</span>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-300 font-body font-medium mb-2 block">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-900/50 border-slate-700 focus:border-gold focus:ring-gold/20 h-12 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300 font-body font-medium mb-2 block">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-900/50 border-slate-700 focus:border-gold focus:ring-gold/20 h-12 text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Total and CTA */}
                <div className="pt-6 border-t border-slate-700">
                  <div className="bg-gradient-to-r from-gold/5 to-transparent rounded-xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <span className="font-heading font-semibold text-white text-lg">Total Today</span>
                      <div className="text-right">
                        <span className="text-3xl md:text-4xl font-heading font-bold text-gold">${total}</span>
                        <p className="text-sm text-slate-400 font-normal mt-1">(~₹{totalINR.toLocaleString()} INR)</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="xl"
                    className="w-full group h-14 text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-3" />
                        Pay Securely with Razorpay
                      </>
                    )}
                  </Button>

                  <div className="flex flex-col items-center gap-3 mt-6">
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-body">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout • 30-day money-back guarantee</span>
                    </div>
                    <div className="text-xs text-slate-500 font-body">
                      Powered by Razorpay - India's most trusted payment gateway
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default Checkout;
