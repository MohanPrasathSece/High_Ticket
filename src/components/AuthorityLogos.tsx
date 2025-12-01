const AuthorityLogos = () => {
  const logos = [
    "Forbes",
    "Inc.",
    "Business Insider",
    "Entrepreneur",
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-foreground/50 font-body uppercase tracking-widest mb-4">
        As Featured In
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50">
        {logos.map((logo) => (
          <div 
            key={logo}
            className="text-foreground/70 font-heading font-bold text-lg md:text-xl tracking-wide"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorityLogos;
