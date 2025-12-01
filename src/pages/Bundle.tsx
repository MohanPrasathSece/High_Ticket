import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const handleNavClick = (path: string) => {
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Bundle = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Bundle Header */}
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
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">High-Ticket Sales Worksheet</h3>
                <p className="text-sm sm:text-base text-gray-300">Your exact call and conversation structure for closing $2,000+ clients with clarity and confidence.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">High-Ticket Foundations Guidebook</h3>
                <p className="text-sm sm:text-base text-gray-300">How to position yourself as a premium authority that attracts high-value clients naturally.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Sales Funnel Blueprint</h3>
                <p className="text-sm sm:text-base text-gray-300">A visual map of exactly how high-ticket clients discover, trust, and buy from you.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Authority-Building Action Plan</h3>
                <p className="text-sm sm:text-base text-gray-300">Your daily roadmap for generating inbound premium leads without paid ads or cold outreach.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-yellow-400 mb-2">Toolstack Prompts Pack</h3>
                <p className="text-sm sm:text-base text-gray-300">Scripts, prompts, and objection-handling frameworks for closing with complete confidence.</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs sm:text-sm font-body text-red-400 font-semibold">
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
                  <span className="text-gray-400 line-through text-sm sm:text-base lg:text-lg">Total Value: $350+</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-yellow-400 mb-3 sm:mb-4">
                  Today: $147
                </div>
                <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
                  <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3">
                    Get Instant Access — $147
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
                  <div className="text-white font-semibold text-sm sm:text-base">Alexandra Chen</div>
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
                  <div className="text-white font-semibold text-sm sm:text-base">David Rodriguez</div>
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
                  <div className="text-white font-semibold text-sm sm:text-base">Isabella Martinez</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Marketing Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-red-400 mb-3 sm:mb-4">
                Limited Time Offer Ends In: 14:55
              </h2>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Ready to Close <span className="text-yellow-400">$2,000+ Sales</span>
              <br className="hidden sm:block" />
              with Complete Confidence?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              Get instant access to the complete high-ticket sales framework for only $147.
            </p>
            
            <Link to="/checkout">
              <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3 mb-6 sm:mb-8">
                Get Instant Access — $147
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

export default Bundle;
