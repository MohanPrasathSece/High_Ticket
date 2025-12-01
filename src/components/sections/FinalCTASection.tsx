import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
      </div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Ready to Start Closing{" "}
            <span className="text-gradient-gold">$2,000+ Sales?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/70 font-body mb-10 max-w-2xl mx-auto">
            Get instant access to the complete high-ticket sales system and start transforming your sales approach today.
          </p>

          {/* Countdown */}
          <div className="flex justify-center mb-10">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <p className="text-sm text-foreground/60 font-body uppercase tracking-widest mb-4">
                This Offer Expires In
              </p>
              <CountdownTimer hours={2} minutes={47} seconds={33} />
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Link to="/checkout">
              <Button variant="hero" size="xl" className="group">
                Get Instant Access — $147 <span className="text-sm text-foreground/60 font-normal">(~₹12,201)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Guarantee */}
          <div className="flex justify-center">
            <GuaranteeBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
