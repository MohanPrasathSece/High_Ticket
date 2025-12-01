import { Gift, MessageCircle, Check } from "lucide-react";

const BonusSection = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold mb-6">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-body font-semibold">Exclusive Bonus</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Plus, Get This{" "}
              <span className="text-gradient-gold">High-Value Bonus</span>
            </h2>
          </div>

          {/* Bonus card */}
          <div className="bg-gradient-to-br from-gold/5 to-gold/10 border border-gold/30 rounded-2xl p-8 md:p-12 shadow-gold relative overflow-hidden">
            {/* Gold corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 blur-2xl" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-button">
                  <MessageCircle className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    High-Ticket Messenger Conversion Scripts
                  </h3>
                  <span className="px-3 py-1 bg-gold/20 border border-gold/40 rounded-full text-xs font-body font-semibold text-gold">
                    BONUS
                  </span>
                </div>
                
                <p className="text-foreground/70 font-body text-lg mb-6">
                  Short but powerful chat templates that turn casual conversations into high-intent booked calls within minutes.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "DM opener scripts that get responses",
                    "Qualification questions that filter tire-kickers",
                    "Call booking templates that convert",
                    "Follow-up sequences that close deals",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80 font-body">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-3">
                  <span className="text-foreground/50 font-body line-through text-lg">$97 Value</span>
                  <span className="text-gold font-heading font-bold text-xl">Included FREE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Value stack */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-card border border-border rounded-xl p-6 md:p-8">
              <p className="text-foreground/60 font-body text-sm uppercase tracking-widest mb-4">
                Total Value
              </p>
              <div className="flex items-baseline justify-center gap-4 mb-4">
                <span className="text-4xl md:text-5xl font-heading font-bold text-foreground/50 line-through">
                  $350+
                </span>
                <span className="text-5xl md:text-6xl font-heading font-bold text-gradient-gold">
                  $147 <span className="text-sm text-foreground/60 font-normal">(~₹12,201)</span>
                </span>
              </div>
              <p className="text-foreground/70 font-body">
                Save over <span className="text-gold font-semibold">$200</span> when you order today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
