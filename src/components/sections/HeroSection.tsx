import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import AuthorityLogos from "@/components/AuthorityLogos";
import { ArrowRight, TrendingUp, Users, Target, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { icon: Users, label: "500+ Professionals", value: "500+" },
    { icon: TrendingUp, label: "Avg. Deal Size", value: "$2,000+" },
    { icon: Target, label: "Success Rate", value: "87%" },
    { icon: ShieldCheck, label: "Money Back", value: "30 Days" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-gold opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-purple-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/40 rounded-full mb-8 backdrop-blur-sm animate-fade-in-up">
                <Zap className="w-4 h-4 text-gold" />
                <span className="text-sm font-body font-semibold text-gold">
                  LIMITED TIME: 75% OFF - Only 12 Spots Left
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <span className="text-gradient-gold">Finally.</span> Stop Chasing{" "}
                <span className="text-gradient-gold">Low-Ticket</span> Clients{" "}
                <br className="hidden lg:block" />
                & Start Closing{" "}
                <span className="text-gradient-gold">$2,000+</span> Deals
              </h1>

              {/* Enhanced sub-headline */}
              <p className="text-lg md:text-xl text-slate-300 font-body max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                The exact framework 500+ sales professionals use to consistently close high-ticket deals. 
                <span className="text-gold font-semibold"> No more guesswork. Just proven results.</span>
              </p>

              {/* Social proof stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                {stats.map((stat, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
                    <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                    <div className="text-xl font-heading font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-body">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Urgency countdown */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-gold/30 rounded-2xl p-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <p className="text-sm font-body text-red-400 uppercase tracking-widest font-semibold">
                    ⚠️ Special Offer Expires In
                  </p>
                </div>
                <CountdownTimer hours={2} minutes={47} seconds={33} />
                <p className="text-xs text-slate-400 mt-3">Price increases to $497 after timer expires</p>
              </div>

              {/* Enhanced CTA */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link to="/checkout">
                  <Button variant="hero" size="xl" className="group text-lg px-8 py-6 h-auto mb-4">
                    <span className="flex items-center justify-center gap-3">
                      <ShieldCheck className="w-6 h-6" />
                      Get Instant Access Now — $147 <span className="text-sm text-slate-300 font-normal">(~₹12,201)</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-slate-400 font-body">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    30-Day Money Back Guarantee
                  </span>
                  <span>•</span>
                  <span>Instant Digital Access</span>
                  <span>•</span>
                  <span>$1,200+ Value</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main product showcase */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-gold opacity-30 blur-3xl rounded-3xl animate-pulse" />
                
                {/* Product card */}
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-gold/40 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/40 rounded-full mb-4">
                      <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                      <span className="text-sm font-body font-semibold text-gold">ULTIMATE BUNDLE</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      High-Ticket Sales System
                    </h3>
                    <p className="text-slate-400 font-body">Everything you need to succeed</p>
                  </div>

                  {/* Product grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { title: "Sales Worksheet", desc: "Perfect your pitch", icon: "📋" },
                      { title: "Foundations Guide", desc: "Master the basics", icon: "🎯" },
                      { title: "Funnel Blueprint", desc: "Build your system", icon: "🔄" },
                      { title: "Action Plan", desc: "Step-by-step guide", icon: "📈" },
                      { title: "AI Prompt Pack", desc: "50+ proven prompts", icon: "🤖" },
                      { title: "Bonus Scripts", desc: "$97 value free", icon: "🎁" }
                    ].map((item, i) => (
                      <div 
                        key={item.title}
                        className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 hover:border-gold/50 transition-all duration-300 hover:scale-105"
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm font-body font-semibold text-white mb-1">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Value proposition */}
                  <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-body mb-1">Total Value</p>
                        <p className="text-2xl font-heading font-bold text-gold">$1,200+</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-body mb-1">Today Only</p>
                        <p className="text-2xl font-heading font-bold text-white">$147</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gold text-slate-900 rounded-full w-16 h-16 flex items-center justify-center font-heading font-bold text-sm animate-bounce">
                75%
                <br />
                OFF
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-500 text-white rounded-full px-4 py-2 text-xs font-body font-bold animate-pulse">
                LIMITED
              </div>
            </div>
          </div>

          {/* Authority section */}
          <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <p className="text-sm text-slate-400 font-body mb-6">TRUSTED BY PROFESSIONALS AT</p>
              <AuthorityLogos />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
