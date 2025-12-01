import { X, ArrowRight } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    "Undercharging for your expertise because you're unsure how to communicate premium value",
    "Feeling uncertain and unprepared during sales calls, hoping the client doesn't notice",
    "Struggling to attract premium clients while competitors close $2K–$10K deals",
    "Burning out chasing dozens of low-ticket sales just to make ends meet",
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-body mb-6">
              Sound Familiar?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              The Real Reason You're Stuck in{" "}
              <span className="text-destructive">Low-Ticket Hell</span>
            </h2>
          </div>

          {/* Problems list */}
          <div className="space-y-4 mb-16">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-destructive/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-foreground/80 font-body text-lg leading-relaxed pt-1.5">
                  {problem}
                </p>
              </div>
            ))}
          </div>

          {/* Transition statement */}
          <div className="text-center bg-card border border-gold/30 rounded-2xl p-8 md:p-12 shadow-gold">
            <p className="text-xl md:text-2xl text-foreground/90 font-body leading-relaxed mb-6">
              Here's the truth: <span className="text-foreground font-semibold">It's not your talent.</span> It's not your offer. 
              It's not the market.
            </p>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              You're missing a{" "}
              <span className="text-gradient-gold">repeatable high-ticket system.</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-gold font-heading font-semibold">
              <span>This bundle is that exact system</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
