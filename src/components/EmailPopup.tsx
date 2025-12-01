import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailPopup = ({ isOpen, onClose, onSubmit }: EmailPopupProps) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
      setEmail("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10 max-w-md w-full mx-4 shadow-card animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Gold accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
          <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
            Enter your email to receive your product instantly.
          </h3>
          <p className="text-foreground/60 font-body mb-6">
            Your access link will be delivered immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-input border-border focus:border-gold focus:ring-gold/20"
          />
          <Button type="submit" variant="gold" size="xl" className="w-full">
            Send My Files
          </Button>
        </form>

        <p className="text-xs text-foreground/40 text-center mt-4 font-body">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
};

export default EmailPopup;
