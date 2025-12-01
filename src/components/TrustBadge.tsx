import { Shield, Lock, CreditCard, RefreshCcw } from "lucide-react";

type BadgeType = "secure" | "encrypted" | "guarantee" | "payment";

interface TrustBadgeProps {
  type: BadgeType;
  text?: string;
}

const badgeConfig = {
  secure: {
    icon: Shield,
    defaultText: "Secure Checkout",
  },
  encrypted: {
    icon: Lock,
    defaultText: "256-bit Encryption",
  },
  guarantee: {
    icon: RefreshCcw,
    defaultText: "30-Day Guarantee",
  },
  payment: {
    icon: CreditCard,
    defaultText: "Safe Payment",
  },
};

const TrustBadge = ({ type, text }: TrustBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
      <Icon className="w-5 h-5 text-gold" />
      <span className="text-sm font-body text-foreground/80">
        {text || config.defaultText}
      </span>
    </div>
  );
};

export default TrustBadge;
