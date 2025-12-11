import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Download, Mail, Shield, Clock, Star, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sendOrderEmails, OrderDetails } from "@/lib/emailService";

const handleNavClick = (path: string) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has purchase confirmation
    const paymentId = searchParams.get('paymentId');
    const email = searchParams.get('email');

    if (paymentId && email) {
      toast({
        title: "Purchase Successful!",
        description: "Your payment has been confirmed. Your bundle will be sent to your email shortly.",
      });

      // Show thank you modal
      setShowThankYouModal(true);

      // Auto-close thank you modal after a few seconds
      const timer = setTimeout(() => {
        setShowThankYouModal(false);
      }, 6000);

      // Trigger email with bundle.zip if not already sent in this session
      const emailSentKey = `emailSent_${email}_${paymentId}`;
      const alreadySent = sessionStorage.getItem(emailSentKey);

      if (!alreadySent) {
        const pendingOrderRaw = sessionStorage.getItem('pendingOrder');
        let orderDetails: OrderDetails | null = null;

        if (pendingOrderRaw) {
          try {
            const pendingOrder = JSON.parse(pendingOrderRaw);
            const now = new Date();
            orderDetails = {
              name: pendingOrder.name,
              email: pendingOrder.email,
              amount: pendingOrder.amount,
              orderBump: pendingOrder.orderBump,
              paymentId: paymentId,
              orderId: undefined,
              paymentMethod: "razorpay_payment_link",
              date: now.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }),
            };
          } catch (e) {
            console.error("Failed to parse pendingOrder from sessionStorage", e);
          }
        }

        if (orderDetails) {
          setIsSendingEmail(true);
          void sendOrderEmails(orderDetails)
            .then(() => {
              sessionStorage.setItem(emailSentKey, 'true');
              toast({
                title: "Bundle Emailed",
                description: "Your High-Ticket Sales Mastery bundle has been sent to your inbox.",
              });
            })
            .catch((err) => {
              console.error("Error sending order emails from ThankYou page", err);
              toast({
                title: "Email Error",
                description: "We could not send the email automatically. Please contact support if you don't receive it.",
                variant: "destructive",
              });
            })
            .finally(() => {
              setIsSendingEmail(false);
            });
        }

      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {showThankYouModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">Thank You for Your Purchase!</h2>
              <p className="text-gray-300 mb-4">
                Your payment was successful. Your High-Ticket Sales Mastery bundle will arrive in your inbox shortly.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                {isSendingEmail
                  ? 'We are sending your bundle via email...'
                  : 'If you do not see the email, please check your spam or promotions folder.'}
              </p>
              <Button
                variant="gold"
                className="w-full"
                onClick={() => setShowThankYouModal(false)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight">
              Stop Chasing Low-Ticket Clients.
              <br className="hidden sm:block" />
              <span className="text-yellow-400">Start Closing $2,000+</span>
              <br className="hidden sm:block" />
              <span className="text-yellow-400">High-Ticket Clients</span>
              <br className="hidden sm:block" />
              Consistently.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              The proven, results-based framework used by <span className="text-yellow-400 font-semibold">500+ professionals</span> to create consistent five-figure days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start mb-8 sm:mb-12">
              <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
                <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3">
                  Get the Ultimate Bundle — $897
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm">Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm">500+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-xs sm:text-sm">30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">
                You're Not <span className="text-yellow-400">Underqualified</span>.
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 px-2">
                You Just Lack a <span className="text-yellow-400 font-semibold">Repeatable System</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-yellow-400 mb-4 sm:mb-6">The Problem:</h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Undercharging and feeling burnt out</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Uncertain during sales conversations</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Struggling to attract premium clients</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Watching competitors close $2K–$10K deals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-yellow-400 mb-4 sm:mb-6">The Solution:</h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">A proven high-ticket closing framework</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Complete confidence in every sales call</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Authority positioning that attracts premium clients</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Consistent $2,000+ sales on repeat</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <p className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4 px-2">
                The issue isn't your talent. It's that you don't have a <span className="text-yellow-400 font-semibold">repeatable high-ticket system</span>.
              </p>
              <p className="text-xl sm:text-2xl font-heading font-bold text-yellow-400">
                This bundle is that system.
              </p>
            </div>
          </div>
        </section>

        {/* Bundle Contents */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">
                What's Inside the Bundle
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 px-2">
                Everything you need to position, pitch, and close high-ticket sales with complete confidence.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">High-Ticket Sales Workbook</h3>
                <p className="text-sm sm:text-base text-gray-300">Your exact call and conversation structure for closing $2,000+ clients with clarity and confidence.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Complete Toolstack</h3>
                <p className="text-sm sm:text-base text-gray-300">The essential tools and software stack you need to run a high-ticket business efficiently.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">AI Promptbook</h3>
                <p className="text-sm sm:text-base text-gray-300">50+ proven AI prompts to generate content, emails, and sales scripts in seconds.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Closing Checklist</h3>
                <p className="text-sm sm:text-base text-gray-300">Never miss a step with this comprehensive pre-call and post-call checklist.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">High-Ticket Guidebooks</h3>
                <p className="text-sm sm:text-base text-gray-300">Deep-dive guides on positioning, pricing, and packaging your high-ticket offers.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Sales Funnel Blueprint</h3>
                <p className="text-sm sm:text-base text-gray-300">A visual map of exactly how high-ticket clients discover, trust, and buy from you.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Authority Action Plan</h3>
                <p className="text-sm sm:text-base text-gray-300">Your daily roadmap for generating inbound premium leads without paid ads or cold outreach.</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 sm:px-3 py-1 bg-yellow-400/20 border border-yellow-400/40 rounded-full text-xs sm:text-sm font-body text-yellow-400 font-semibold">
                    BONUS
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">High-Ticket Messenger Conversion Scripts</h3>
                <p className="text-sm sm:text-base text-gray-300">Short but powerful chat templates that turn casual conversations into high-intent booked calls within minutes.</p>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4">
                  <span className="text-gray-400 line-through text-sm sm:text-base lg:text-lg">Total Value: $1600</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-yellow-400 mb-3 sm:mb-4">
                  Today: $897
                </div>
                <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
                  <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3">
                    Get Instant Access — $897
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">
                Real Results from Real Professionals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic leading-relaxed">
                  "I went from charging $297 to closing a $3,000 client in one call. This framework changed everything."
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">Sophia Williams</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Brand Strategist</div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic leading-relaxed">
                  "I applied the framework immediately and closed two high-ticket sales in one week. The scripts alone are worth 10x the price."
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">James Anderson</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Business Coach</div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic leading-relaxed">
                  "I finally understand how to present my value without feeling unsure or overwhelmed. My confidence skyrocketed."
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">Olivia Taylor</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Marketing Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-yellow-400 mb-3 sm:mb-4">
                Limited Time Offer Ends In: 14:55
              </h2>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Ready to Close <span className="text-yellow-400">$2,000+ Sales</span>
              <br className="hidden sm:block" />
              with Complete Confidence?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              Get instant access to the complete high-ticket sales framework for only $897.
            </p>

            <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
              <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3 mb-6 sm:mb-8">
                Get Instant Access — $897
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">30-Day Money-Back Guarantee</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Full refund if you don't feel more confident closing high-ticket sales
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default ThankYou;
