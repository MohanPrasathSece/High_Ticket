import TestimonialCard from "@/components/TestimonialCard";
import { Star, TrendingUp, Users, Award } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I went from charging $297 to closing a $3,000 client in one call. The sales worksheet completely changed how I present my value.",
      name: "Sarah Mitchell",
      role: "Business Coach",
      rating: 5,
      result: "10X Price Increase",
      avatar: "👩‍💼"
    },
    {
      quote: "I applied the framework immediately and closed two high-ticket sales in one week. The objection handling scripts alone are worth 10x the price.",
      name: "Marcus Johnson",
      role: "Agency Owner",
      rating: 5,
      result: "$8K in 1 Week",
      avatar: "👨‍💻"
    },
    {
      quote: "I finally understand how to present my value without feeling unsure or overwhelmed. My confidence on calls has completely transformed.",
      name: "Emily Rodriguez",
      role: "Digital Consultant",
      rating: 5,
      result: "100% Confidence Boost",
      avatar: "👩‍🎨"
    },
    {
      quote: "The funnel blueprint helped me structure my entire sales process. I'm now consistently closing $2K+ deals and have a waitlist.",
      name: "David Chen",
      role: "Marketing Consultant",
      rating: 5,
      result: "Consistent $2K+ Deals",
      avatar: "👨‍📊"
    },
    {
      quote: "Best investment I've made in my business. The AI prompts saved me hours and helped me craft the perfect pitch for high-ticket clients.",
      name: "Lisa Thompson",
      role: "Course Creator",
      rating: 5,
      result: "Hours Saved Weekly",
      avatar: "👩‍🏫"
    },
    {
      quote: "I was skeptical but the results speak for themselves. Three $5K deals in my first month using this system.",
      name: "James Wilson",
      role: "Sales Consultant",
      rating: 5,
      result: "$15K First Month",
      avatar: "👨‍💼"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Professionals", value: "500+" },
    { icon: TrendingUp, label: "Average Deal Size", value: "$2,000" },
    { icon: Star, label: "Success Rate", value: "87%" },
    { icon: Award, label: "Money Saved", value: "$1M+" }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gray-800/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-sm font-body font-semibold text-gold">
                REAL RESULTS FROM REAL PROFESSIONALS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Join 500+ Professionals{" "}
              <span className="text-gradient-gold">Closing High-Ticket Deals</span>
            </h2>
            <p className="text-xl text-slate-300 font-body max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. See what happens when you implement a proven system that actually works.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                <div className="text-2xl font-heading font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 font-body">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Featured testimonial */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-gold opacity-10 blur-3xl" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="text-4xl">👩‍💼</div>
                  <div>
                    <div className="text-white font-body font-semibold">Sarah Mitchell</div>
                    <div className="text-slate-400 font-body text-sm">Business Coach</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-white font-body leading-relaxed mb-6">
                  "I went from charging $297 to closing a $3,000 client in one call. The sales worksheet completely changed how I present my value."
                </blockquote>
                <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-2 inline-block">
                  <span className="text-gold font-body font-semibold">🎯 10X Price Increase</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-800/50 rounded-2xl p-8">
                  <div className="text-6xl font-heading font-bold text-gold mb-2">$3,000</div>
                  <div className="text-white font-body font-semibold mb-1">Single Deal</div>
                  <div className="text-slate-400 font-body text-sm">From $297 to $3,000</div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-white font-body font-semibold">{testimonial.name}</div>
                      <div className="bg-gold/10 border border-gold/30 rounded-full px-2 py-1">
                        <span className="text-xs font-body font-semibold text-gold">{testimonial.result}</span>
                      </div>
                    </div>
                    <div className="text-slate-400 font-body text-sm mb-3">{testimonial.role}</div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-slate-300 font-body text-sm leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Ready to Join Them?
              </h3>
              <p className="text-slate-300 font-body mb-6">
                Every single person above started exactly where you are now.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
                  <span className="text-gold font-body font-semibold">⏰ Limited Time: 75% OFF</span>
                </div>
                <div className="text-slate-400 font-body text-sm">
                  Only 12 spots left at this price
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
