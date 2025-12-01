import { Check } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
}

const ProductCard = ({ title, description, icon, features }: ProductCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card transition-all duration-500 hover:border-gold/50 hover:shadow-gold group relative overflow-hidden">
      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-gold opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
      
      {/* Icon */}
      {icon && (
        <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
          <div className="text-gold">{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-all duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground/70 font-body leading-relaxed mb-4">
        {description}
      </p>

      {/* Features list */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/80 font-body">
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export default ProductCard;
