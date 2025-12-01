import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import AuthorityLogos from "@/components/AuthorityLogos";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-body text-gold">
              Trusted by 500+ Sales Professionals
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Stop Chasing Low-Ticket Clients.{" "}
            <span className="text-gradient-gold">
              Start Closing $2,000+ High-Ticket Clients
            </span>{" "}
            Consistently.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-foreground/70 font-body max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            The proven, results-based framework used to create consistent five-figure days. 
            Join 500+ professionals who've transformed their sales approach.
          </p>

          {/* Countdown timer */}
          <div className="flex justify-center mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <p className="text-sm text-foreground/60 font-body uppercase tracking-widest mb-4">
                Limited Time Offer Ends In
              </p>
              <CountdownTimer hours={2} minutes={47} seconds={33} />
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/checkout">
              <Button variant="hero" size="xl" className="group">
                Get the Ultimate High-Ticket Sales Bundle — $147 <span className="text-sm text-foreground/60 font-normal">(~₹12,201)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-foreground/50 font-body mt-4">
              Instant access • 30-day guarantee • $350+ value
            </p>
          </div>

          {/* Authority logos */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <AuthorityLogos />
          </div>
        </div>

        {/* Bundle mockup placeholder */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl rounded-3xl" />
            <div className="relative bg-card border border-gold/30 rounded-2xl p-8 md:p-12 shadow-card">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Sales Worksheet", "Foundations Guide", "Funnel Blueprint", "Action Plan", "Prompt Pack", "Bonus Scripts"].map((item, i) => (
                  <div 
                    key={item}
                    className="bg-accent border border-border rounded-lg p-4 text-center hover:border-gold/50 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gold/10 flex items-center justify-center">
                      <span className="text-gold font-heading font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm font-body text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
