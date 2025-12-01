import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download, Mail, ArrowRight, Calendar, Users, Target, CreditCard } from "lucide-react";
import { useLocation } from "react-router-dom";
import EmailPopup from "@/components/EmailPopup";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { toast } from "@/hooks/use-toast";

const ThankYou = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const orderBump = location.state?.orderBump || false;
  const paymentId = location.state?.paymentId || "";
  const orderDetails = location.state?.orderDetails || null;

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (email: string) => {
    toast({
      title: "Access Sent!",
      description: `We've sent your download link to ${email}`,
    });
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold mb-6 shadow-gold">
              <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Your Order Is Complete —{" "}
              <span className="text-gradient-gold">Thank You!</span>
            </h1>
            <p className="text-lg text-foreground/70 font-body">
              Your access is being delivered to your email right now.
            </p>
          </div>

          {/* Payment Confirmation */}
          {paymentId && (
            <div className="bg-gradient-to-br from-gold/5 to-gold/10 border border-gold/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-gold" />
                <h2 className="text-lg font-heading font-bold text-foreground">
                  Payment Confirmed
                </h2>
              </div>
              <div className="grid gap-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Payment ID:</span>
                  <span className="text-foreground font-mono">{paymentId}</span>
                </div>
                {orderDetails && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Amount:</span>
                      <span className="text-foreground font-semibold">{orderDetails.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Date:</span>
                      <span className="text-foreground">{orderDetails.date}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* What happens next */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">
              What Happens Next
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Check Your Email",
                  description: "Look for an email from us with your download/login link.",
                },
                {
                  icon: Download,
                  title: "Access Your Bundle",
                  description: "Click the link to instantly access all your materials.",
                },
                {
                  icon: Target,
                  title: "Start Implementing",
                  description: "Begin with the Sales Worksheet and apply the framework immediately.",
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{step.title}</h3>
                    <p className="text-foreground/60 font-body text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support note */}
          <div className="text-center mb-12">
            <p className="text-foreground/60 font-body">
              Didn't receive your email? Check your spam folder or{" "}
              <a href="#" className="text-gold hover:underline">contact support</a>.
            </p>
          </div>

          {/* Upsell section */}
          <div className="bg-gradient-hero border-2 border-gold/30 rounded-2xl p-8 md:p-12 shadow-gold relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-gold/20 border border-gold/40 rounded-full text-xs font-body font-semibold text-gold uppercase tracking-wider">
                  Exclusive Offer
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Upgrade to a 60-Minute 1:1 Strategy Call
              </h2>

              <p className="text-foreground/70 font-body text-lg mb-6">
                Get personalized guidance to accelerate your high-ticket success.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Target, text: "Personalized offer restructuring" },
                  { icon: Calendar, text: "Custom 30-day high-ticket plan" },
                  { icon: Users, text: "Script refinement & practice" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-card/50 rounded-lg p-4">
                    <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-sm font-body text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="gold" size="xl" className="group">
                  Book Your Strategy Call — $497
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <span className="text-foreground/50 font-body text-sm">
                  Limited spots available this month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email popup */}
      <EmailPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleEmailSubmit}
      />
      </main>
      <FooterSection />
    </>
  );
};

export default ThankYou;
