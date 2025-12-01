import ProductSection from "@/components/sections/ProductSection";
import BonusSection from "@/components/sections/BonusSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const quickStats = [
    { icon: Target, label: "Success Rate", value: "87%" },
    { icon: TrendingUp, label: "Avg Deal Size", value: "$2,000+" },
    { icon: ShieldCheck, label: "Guarantee", value: "30 Days" },
    { icon: Zap, label: "Implementation", value: "Instant" }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Hero section for products page */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full mb-8 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="text-sm font-body font-semibold text-gold">
                    THE COMPLETE SYSTEM FOR HIGH-TICKET SUCCESS
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
                  Everything You Need to{" "}
                  <span className="text-gradient-gold">Close $2,000+ Sales</span>{" "}
                  <br className="hidden xl:block" />
                  Consistently & Confidently
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-body max-w-3xl mx-auto leading-relaxed mb-12">
                  A complete, proven system designed to transform how you approach, present, and close high-ticket deals.
                  <span className="text-gold font-semibold"> No guesswork required.</span>
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                      <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                      <div className="text-2xl font-heading font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400 font-body">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/checkout">
                    <Button variant="gold" size="xl" className="group">
                      Get Full Access Now — $147
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <div className="text-slate-400 font-body text-sm">
                    Limited time: 75% off + $97 bonus included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductSection />
        <BonusSection />

        {/* Final CTA section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-12 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl" />
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                    Ready to Transform Your Sales Career?
                  </h2>
                  <p className="text-xl text-slate-300 font-body mb-8">
                    Join 500+ professionals who are already closing high-ticket deals with confidence.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 rounded-xl p-6">
                      <div className="text-3xl font-heading font-bold text-gold mb-2">$147</div>
                      <p className="text-slate-400 font-body">One-time investment</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-6">
                      <div className="text-3xl font-heading font-bold text-gold mb-2">$1,200+</div>
                      <p className="text-slate-400 font-body">Total value</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-6">
                      <div className="text-3xl font-heading font-bold text-gold mb-2">30</div>
                      <p className="text-slate-400 font-body">Day guarantee</p>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button variant="hero" size="xl" className="group">
                      Get Instant Access Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <p className="text-slate-400 font-body text-sm mt-4">
                    Immediate access • No risk • Transform your results today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Products;
