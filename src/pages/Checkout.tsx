import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Lock, Shield, AlertCircle, CreditCard, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { initiateRazorpayPayment, RazorpayResponse } from "@/lib/razorpay";
import { sendOrderEmails } from "@/lib/emailService";

const Checkout = () => {
  const navigate = useNavigate();
  const [orderBump, setOrderBump] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const basePrice = 147;
  const bumpPrice = 37;
  const total = orderBump ? basePrice + bumpPrice : basePrice;
  
  // Currency conversion (1 USD ≈ 83 INR as of current rate)
  const usdToInrRate = 83;
  const basePriceINR = basePrice * usdToInrRate;
  const bumpPriceINR = bumpPrice * usdToInrRate;
  const totalINR = total * usdToInrRate;

  const features = [
    { icon: CreditCard, text: "High-Ticket Sales Worksheet" },
    { icon: CreditCard, text: "High-Ticket Foundations Guidebook" },
    { icon: CreditCard, text: "Sales Funnel Blueprint" },
    { icon: CreditCard, text: "Authority-Building Action Plan" },
    { icon: CreditCard, text: "Toolstack Prompts Pack" },
    { icon: CreditCard, text: "BONUS: Messenger Conversion Scripts" },
  ];

  const testimonials = [
    { name: "Sarah Mitchell", text: "Brand Strategist" },
    { name: "Marcus Thompson", text: "Business Coach" },
    { name: "Jennifer Park", text: "Marketing Consultant" },
  ];

  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    console.log("✅ Payment successful:", response);

    setIsProcessing(true);

    try {
      // Prepare order details
      const orderDetails = {
        name: formData.name,
        email: formData.email,
        amount: total,
        orderBump: orderBump,
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
        title: "Payment Successful!",
        description: "Thank you for your purchase. Check your email for access details.",
      });

      // Redirect to thank you page
      navigate("/thank-you");
    } catch (error) {
      console.error("Error processing payment success:", error);
      toast({
        title: "Processing Error",
        description: "Payment was successful but there was an error sending confirmation. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentFailure = () => {
    console.log("❌ Payment failed or cancelled");
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
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, email, and phone).",
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
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
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
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/5 via-transparent to-black/5" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
          <div className="w-full max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Product Details */}
              <div className="space-y-6">
                {/* Flash Sale Banner */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-body font-semibold text-red-400">
                    ⚡ FLASH SALE - 75% OFF - Only 8 Spots Left!
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                    Stop Chasing Low-Ticket Clients.
                    <br className="hidden sm:block" />
                    <span className="text-yellow-400">Start Closing $2,000+</span>
                    <br className="hidden sm:block" />
                    <span className="text-yellow-400">High-Ticket Clients</span>
                    <br className="hidden sm:block" />
                    Consistently.
                  </h1>
                  <p className="text-base sm:text-lg text-gray-300 font-body leading-relaxed">
                    The proven, results-based framework used by <span className="text-yellow-400 font-semibold">500+ professionals</span> to create consistent five-figure days.
                  </p>
                </div>

                {/* Product Features */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">What You'll Get:</h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <feature.icon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Success Stories</h3>
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="border-l-2 border-yellow-400 pl-4">
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Checkout Form */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl">
                  {/* Trust badges */}
                  <div className="flex justify-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-yellow-400" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Lock className="w-4 h-4 text-yellow-400" />
                      <span>Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Guarantee</span>
                    </div>
                  </div>

                  {/* Currency banner */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 mb-6 text-center">
                    <p className="text-sm text-gray-300">
                      💰 Price displayed in USD (~₹{totalINR.toLocaleString()} INR)
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 font-body font-medium mb-2 block text-sm">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-gray-700 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400/20 h-11 text-white text-sm"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300 font-body font-medium mb-2 block text-sm">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-gray-700 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400/20 h-11 text-white text-sm"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-gray-300 font-body font-medium mb-2 block text-sm">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-gray-700 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400/20 h-11 text-white text-sm"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-gray-300 font-body font-medium mb-2 block text-sm">Company Name</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-gray-700 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400/20 h-11 text-white text-sm"
                          placeholder="Your company (optional)"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" className="text-gray-300 font-body font-medium mb-2 block text-sm">Message (Optional)</Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-gray-700 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400/20 h-16 text-white text-sm rounded-lg p-3 w-full resize-none"
                        placeholder="Tell us about your sales goals..."
                        rows={2}
                      />
                    </div>

                    {/* Order Bump */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={orderBump}
                          onCheckedChange={(checked) => setOrderBump(checked as boolean)}
                          className="mt-1 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs font-body text-red-400 font-semibold animate-pulse">
                              ONE-TIME OFFER - 75% OFF
                            </span>
                          </div>
                          <h3 className="text-white font-semibold">
                            Add Advanced Script Pack - Just $37
                          </h3>
                          <p className="text-xs text-gray-300">
                            50+ outreach scripts for DM, email, and calls
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Ultimate Bundle</span>
                        <span className="text-white font-medium">${basePrice}</span>
                      </div>
                      {orderBump && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Script Pack</span>
                          <span className="text-white font-medium">${bumpPrice}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Total</span>
                          <span className="text-2xl font-heading font-bold text-yellow-400">${total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={isProcessing}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-4"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          🚀 Get Instant Access — ${total}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>

                    {/* Guarantee */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full">
                        <Shield className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">30-Day Money-Back Guarantee</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default Checkout;
