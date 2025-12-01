import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

const TestimonialCard = ({ quote, name, role, rating = 5 }: TestimonialCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card transition-all duration-300 hover:border-gold/50 hover:shadow-gold group">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-gold text-gold"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground/90 text-lg leading-relaxed mb-6 font-body">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
          <span className="text-primary-foreground font-heading font-bold text-lg">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-heading font-semibold text-foreground">{name}</p>
          <p className="text-sm text-foreground/60 font-body">{role}</p>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
    </div>
  );
};

export default TestimonialCard;
