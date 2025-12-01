import { Shield } from "lucide-react";

const GuaranteeBadge = () => {
  return (
    <div className="inline-flex flex-col items-center p-6 bg-card border-2 border-gold/30 rounded-2xl shadow-gold">
      <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mb-4">
        <Shield className="w-8 h-8 text-primary-foreground" />
      </div>
      <span className="text-gold font-heading font-bold text-lg mb-1">
        30-Day Money-Back
      </span>
      <span className="text-foreground/70 font-body text-sm text-center max-w-[200px]">
        Full refund if you don't feel more confident closing high-ticket sales within 30 days.
      </span>
    </div>
  );
};

export default GuaranteeBadge;
