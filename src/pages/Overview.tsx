import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const handleNavClick = (path: string) => {
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Overview = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight">
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
                  Get Bundle — $147
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
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
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-red-400 mb-4 sm:mb-6">The Problem:</h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-red-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Undercharging and feeling burnt out</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-red-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Uncertain during sales conversations</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-red-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Struggling to attract premium clients</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-red-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Watching competitors close $2K–$10K deals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-green-400 mb-4 sm:mb-6">The Solution:</h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">A proven high-ticket closing framework</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Complete confidence in every sales call</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-400 mt-1 text-sm sm:text-base">•</span>
                    <span className="text-white text-sm sm:text-base">Authority positioning that attracts premium clients</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-400 mt-1 text-sm sm:text-base">•</span>
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

        {/* Navigation to Bundle Details */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-6">
              Ready to See What's Inside?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              Discover the complete bundle contents and real results from professionals already using this framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/bundle" onClick={() => handleNavClick('/bundle')}>
                <Button variant="gold" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3">
                  View Bundle Details
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
                <Button variant="outline" size="lg" className="text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto px-4 sm:px-6 py-3 border-gray-600 text-white hover:bg-gray-800 hover:text-white">
                  Get Instant Access
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Overview;
