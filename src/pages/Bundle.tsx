import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import CurrencyConverter from "@/components/CurrencyConverter";

const handleNavClick = (path: string) => {
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Bundle = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 40,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Hero Section with Countdown */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto">
            {/* Countdown Timer */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-2 mb-6">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">Limited Time Offer Ends In:</span>
                <div className="flex items-center gap-1">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded font-mono font-bold text-sm">
                    {formatTime(timeLeft.hours)}
                  </span>
                  <span className="text-yellow-400">:</span>
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded font-mono font-bold text-sm">
                    {formatTime(timeLeft.minutes)}
                  </span>
                  <span className="text-yellow-400">:</span>
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded font-mono font-bold text-sm">
                    {formatTime(timeLeft.seconds)}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight break-words">
                Stop Chasing Low-Ticket Clients.
                <br className="hidden sm:block" />
                <span className="text-yellow-400">Start Closing</span> $2,000+ High-Ticket
                <br className="hidden sm:block" />
                Clients Consistently.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
                The proven, results-based framework used by <span className="text-yellow-400 font-semibold">500+ professionals</span> to create consistent five-figure days.
              </p>

              {/* Price and Features */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-yellow-400">
                  <span className="text-2xl font-bold">$147</span>
                  <span className="text-gray-400 line-through">$350+</span>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-gray-300 text-center">
                  <span className="whitespace-nowrap"><span className="text-yellow-400">✓</span> Instant Access</span>
                  <span className="whitespace-nowrap"><span className="text-yellow-400">✓</span> 500+ Users</span>
                  <span className="whitespace-nowrap"><span className="text-yellow-400">✓</span> 30-Day Guarantee</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-8">
                <Link to="/checkout" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:scale-105 whitespace-normal h-auto">
                    Get Bundle $147
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
                  </Button>
                </Link>
              </div>

              {/* Live Currency Converter */}
              <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 text-center">
                    Live Currency Converter
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 mb-4 text-center">
                    Check the bundle price in your local currency. Payments are processed securely in Indian Rupees (INR)
                    via Razorpay; your bank handles the final conversion.
                  </p>
                  <CurrencyConverter baseAmount={147} baseCurrency="USD" showConversionHistory={false} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                You're Not <span className="text-yellow-400">Underqualified.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                You Just Lack a <span className="text-yellow-400 font-semibold">Repeatable System.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Problem */}
              <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">The Problem:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Undercharging and feeling burnt out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Uncertain during sales conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Struggling to attract premium clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Watching competitors close $2K–$10K deals</span>
                  </li>
                </ul>
              </div>

              {/* Solution */}
              <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">The Solution:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>A proven high-ticket closing framework</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Complete confidence in every sales call</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Authority positioning that attracts premium clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Consistent $2,000+ sales on repeat</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-300 italic">
                The issue isn't your talent. It's that you don't have a
                <span className="text-yellow-400 font-semibold"> repeatable high-ticket system.</span>
              </p>
              <p className="text-2xl text-yellow-400 font-bold mt-4">
                This bundle <span className="text-white">is</span> that system.
              </p>
            </div>
          </div>
        </section>

        {/* What's Inside Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                What's Inside the Bundle
              </h2>
              <p className="text-xl text-gray-300">
                Everything you need to position, pitch, and close high-ticket sales with complete confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* High-Ticket Sales Worksheet */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">High-Ticket Sales Worksheet</h3>
                <p className="text-gray-300">
                  Your exact call and conversation structure for closing $2,000+ clients with clarity and confidence.
                </p>
              </div>

              {/* High-Ticket Foundations Guidebook */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">High-Ticket Foundations Guidebook</h3>
                <p className="text-gray-300">
                  How to position yourself as a premium authority that attracts high-value clients naturally.
                </p>
              </div>

              {/* Sales Funnel Blueprint */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Sales Funnel Blueprint</h3>
                <p className="text-gray-300">
                  A visual map of exactly how high-ticket clients discover, trust, and buy from you.
                </p>
              </div>

              {/* Authority-Building Action Plan */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Authority-Building Action Plan</h3>
                <p className="text-gray-300">
                  Your daily roadmap for generating inbound premium leads without paid ads or cold outreach.
                </p>
              </div>

              {/* Toolstack Prompts Pack */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Toolstack Prompts Pack</h3>
                <p className="text-gray-300">
                  Scripts, prompts, and objection-handling frameworks for closing with complete confidence.
                </p>
              </div>

              {/* BONUS */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-400/50 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold flex-shrink-0">BONUS</span>
                  <h3 className="text-xl font-bold text-yellow-400 break-words">High-Ticket Messenger Conversion Scripts</h3>
                </div>
                <p className="text-gray-300">
                  Short but powerful chat templates that turn casual conversations into high-intent booked calls within minutes.
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="text-center mt-12 bg-gray-800 border border-gray-700 rounded-xl p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="text-gray-400 line-through text-2xl">Total Value: $350+</div>
                <span className="text-yellow-400 text-3xl font-bold">Today: $147</span>
              </div>
              <Link to="/checkout">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105">
                  Get Instant Access Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Real Results from Real Professionals
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {/* Sarah Mitchell */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "I went from charging $297 to closing a $3,000 client in one call. This framework changed everything."
                </p>
                <div>
                  <p className="text-yellow-400 font-semibold">Sarah Mitchell</p>
                  <p className="text-gray-400 text-sm">Brand Strategist</p>
                </div>
              </div>

              {/* Marcus Thompson */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "I applied the framework immediately and closed two high-ticket sales in one week. The scripts alone are worth 10x the price."
                </p>
                <div>
                  <p className="text-yellow-400 font-semibold">Marcus Thompson</p>
                  <p className="text-gray-400 text-sm">Business Coach</p>
                </div>
              </div>

              {/* Jennifer Park */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "I finally understand how to present my value without feeling unsure or overwhelmed. My confidence skyrocketed."
                </p>
                <div>
                  <p className="text-yellow-400 font-semibold">Jennifer Park</p>
                  <p className="text-gray-400 text-sm">Marketing Consultant</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center mt-12">
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Start Closing $2,000+ Clients?
                </h3>
                <p className="text-gray-300 mb-6">
                  Join 500+ professionals who are already using this system to create consistent five-figure days.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <span className="text-2xl font-bold">$147</span>
                    <span className="text-gray-400 line-through">$350+</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-yellow-400">✓</span> Instant Access
                    <span className="text-yellow-400">✓</span> 30-Day Guarantee
                  </div>
                </div>
                <Link to="/checkout" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:scale-105 whitespace-normal h-auto">
                    Get the Bundle Now — $147
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Bundle;
