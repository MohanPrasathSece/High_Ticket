import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download, Mail, ArrowRight, Calendar, Users, Target, CreditCard, Zap, ShieldCheck, TrendingUp } from "lucide-react";
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

  const nextSteps = [
    { icon: Download, title: "Download Your Materials", desc: "Instant access to all course materials and resources" },
    { icon: Calendar, title: "Book Your Strategy Call", desc: "Schedule a 1-on-1 call to maximize your results" },
    { icon: Users, title: "Join the Community", desc: "Connect with 500+ other high-ticket professionals" },
    { icon: Target, title: "Start Implementing", desc: "Begin closing high-ticket deals this week" }
  ];

  const bonuses = [
    { title: "Advanced Outreach Scripts", value: "$97", status: "Included" },
    { title: "AI Prompt Pack", value: "$47", status: "Included" },
    { title: "Priority Support", value: "$197", status: "Included" },
    { title: "Future Updates", value: "$297", status: "FREE" }
  ];

  useEffect(() => {
    // Auto-show popup after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (email: string) => {
    toast({
      title: "Email Confirmed!",
      description: "Check your inbox for access instructions.",
    });
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Success header */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full mb-8 backdrop-blur-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm font-body font-semibold text-green-400">
                  PAYMENT SUCCESSFUL
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Congratulations! You're Now{" "}
                <span className="text-gradient-gold">On Your Way</span>{" "}
                <br className="hidden lg:block" />
                To High-Ticket Success
              </h1>
              
              <p className="text-xl text-slate-300 font-body max-w-2xl mx-auto leading-relaxed mb-12">
                Your investment in the Ultimate High-Ticket Sales Bundle is complete. 
                <span className="text-gold font-semibold"> Get ready to transform your sales career.</span>
              </p>

              {/* Order details */}
              {orderDetails && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-12">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-gold" />
                    <h2 className="text-xl font-heading font-bold text-white">Order Confirmation</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <p className="text-slate-400 font-body text-sm mb-2">Order ID</p>
                      <p className="text-white font-body font-semibold">{paymentId || "HTS-" + Date.now()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 font-body text-sm mb-2">Total Paid</p>
                      <p className="text-gold font-heading font-bold text-lg">
                        ${orderBump ? "184" : "147"} <span className="text-sm text-slate-400 font-normal">(~₹{orderBump ? "15252" : "12201"})</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <Button variant="gold" size="xl" className="group">
                  <Download className="w-5 h-5 mr-2" />
                  Download Your Materials
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="border-gold/30 text-white hover:bg-gold/10">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  What Happens Next?
                </h2>
                <p className="text-xl text-slate-300 font-body max-w-2xl mx-auto">
                  Follow these steps to maximize your investment and start seeing results fast.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                      <step.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 font-body text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bonus breakdown */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-12 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl" />
                
                <div className="relative z-10 text-center">
                  <h2 className="text-3xl font-heading font-bold text-white mb-6">
                    You Got Access To Everything
                  </h2>
                  <p className="text-xl text-slate-300 font-body mb-8">
                    Including over $600 in exclusive bonuses
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {bonuses.map((bonus, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-white font-body font-semibold">{bonus.title}</p>
                          <p className="text-slate-400 font-body text-sm line-through">{bonus.value} value</p>
                        </div>
                        <div className="bg-gold/10 border border-gold/30 rounded-lg px-3 py-1">
                          <span className="text-gold font-body font-semibold text-sm">{bonus.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 font-body">Total Value Received</span>
                      <span className="text-2xl font-heading font-bold text-gold">$1,200+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-body">Your Investment</span>
                      <span className="text-2xl font-heading font-bold text-white">${orderBump ? "184" : "147"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-12">
                <Zap className="w-12 h-12 text-red-400 mx-auto mb-6" />
                <h2 className="text-3xl font-heading font-bold text-white mb-6">
                  Don't Let This Opportunity Slip Away
                </h2>
                <p className="text-xl text-slate-300 font-body mb-8">
                  The biggest mistake is investing in transformation and never implementing. 
                  <span className="text-gold font-semibold"> Start today.</span>
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <TrendingUp className="w-8 h-8 text-gold mx-auto mb-3" />
                    <div className="text-2xl font-heading font-bold text-gold mb-2">87%</div>
                    <p className="text-slate-400 font-body text-sm">Success rate for active users</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <Users className="w-8 h-8 text-gold mx-auto mb-3" />
                    <div className="text-2xl font-heading font-bold text-gold mb-2">500+</div>
                    <p className="text-slate-400 font-body text-sm">Professionals transformed</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                    <div className="text-2xl font-heading font-bold text-gold mb-2">30</div>
                    <p className="text-slate-400 font-body text-sm">Day guarantee period</p>
                  </div>
                </div>

                <Button variant="gold" size="xl" className="group">
                  Start Your Transformation Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

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
