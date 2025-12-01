const FooterSection = () => {
  return (
    <footer className="py-12 bg-accent border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60 font-body text-sm mb-4">
            © {new Date().getFullYear()} The Ultimate High-Ticket Sales Bundle. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-body">
            <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
