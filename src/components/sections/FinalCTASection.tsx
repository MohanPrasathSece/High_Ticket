import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import { ArrowRight, ShieldCheck, Clock, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  const benefits = [
    { icon: TrendingUp, text: "Increase your prices 10x" },
    { icon: Users, text: "Attract premium clients" },
    { icon: Clock, text: "Save hours on sales calls" },
    { icon: ShieldCheck, text: "30-day money-back guarantee" }
  ];

  const comparison = [
    { before: "Charging $297", after: "Closing $3,000+" },
    { before: "10+ calls/day", after: "3-5 high-ticket calls/week" },
    { before: "80% rejection rate", after: "87% success rate" },
    { before: "Burnout & stress", after: "Confidence & flow" }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-gold opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-gray-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gray-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA content */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full mb-8 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-body font-semibold text-yellow-400">
                ⚠️ FINAL CHANCE - OFFER EXPIRES SOON
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
              Your Choice:{" "}
              <span className="text-gradient-gold">Transform Today</span>{" "}
              <br className="hidden xl:block" />
              Or Keep Losing{" "}
              <span className="text-gradient-red">Thousands Monthly</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 font-body max-w-3xl mx-auto leading-relaxed mb-12">
              500+ professionals have already made the decision.
              <span className="text-gold font-semibold"> The question is: will you join them or keep watching from the sidelines?</span>
            </p>

            {/* Urgency countdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/30 rounded-3xl p-8 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <p className="text-lg font-body text-yellow-400 uppercase tracking-widest font-bold">
                  🚨 PRICE INCREASES IN
                </p>
              </div>
              <CountdownTimer hours={2} minutes={47} seconds={33} />
              <p className="text-slate-400 mt-4">Price jumps from $897 to $497 when timer hits zero</p>
            </div>
          </div>

          {/* Comparison section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-2xl font-heading font-bold text-yellow-400 mb-6">If You Leave This Page</h3>
              <div className="space-y-4">
                {comparison.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold">✗</span>
                    </div>
                    <div>
                      <p className="text-slate-400 font-body line-through">{item.before}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-heading font-bold text-yellow-400">$10K-20K</div>
                <p className="text-slate-400 font-body">Lost monthly</p>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-3xl p-8">
              <h3 className="text-2xl font-heading font-bold text-gold mb-6">When You Join Today</h3>
              <div className="space-y-4">
                {comparison.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-body font-semibold">{item.after}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-heading font-bold text-gold">$897</div>
                <p className="text-slate-400 font-body">One-time investment</p>
              </div>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <p className="text-white font-body font-semibold">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-12 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  Make Your Decision Now
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-heading font-bold text-gold mb-2">$897</div>
                    <p className="text-slate-400 font-body">Today Only</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-slate-400 mb-2 line-through">$497</div>
                    <p className="text-slate-400 font-body">Future Price</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-gold mb-2">75%</div>
                    <p className="text-slate-400 font-body">Discount</p>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full max-w-xl mx-auto">
                  <Button variant="hero" size="xl" className="group w-full px-4 sm:px-6 py-4 sm:py-5 h-auto mb-6">
                    <div className="flex flex-col items-center gap-1.5 text-center w-full">
                      <div className="flex items-center gap-2 justify-center">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        <span className="font-bold text-sm sm:text-base md:text-lg">Get Access $897</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-normal">
                        <span>(~₹12,201)</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Button>
                </Link>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-400 font-body">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    30-Day Money Back Guarantee
                  </span>
                  <span>•</span>
                  <span>Instant Digital Access</span>
                  <span>•</span>
                  <span>Only 12 Spots Left</span>
                </div>
              </div>
            </div>

            {/* Final guarantee */}
            <div className="mt-12">
              <GuaranteeBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
