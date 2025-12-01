import TestimonialCard from "@/components/TestimonialCard";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I went from charging $297 to closing a $3,000 client in one call. The sales worksheet completely changed how I present my value.",
      name: "Sarah Mitchell",
      role: "Business Coach",
      rating: 5,
    },
    {
      quote: "I applied the framework immediately and closed two high-ticket sales in one week. The objection handling scripts alone are worth 10x the price.",
      name: "Marcus Johnson",
      role: "Agency Owner",
      rating: 5,
    },
    {
      quote: "I finally understand how to present my value without feeling unsure or overwhelmed. My confidence on calls has completely transformed.",
      name: "Emily Rodriguez",
      role: "Digital Consultant",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-sm font-body text-gold mb-6">
              Real Results
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Join 500+ Professionals{" "}
              <span className="text-gradient-gold">Closing High-Ticket Deals</span>
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              See what others are saying about their transformation with The Ultimate High-Ticket Sales Bundle.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
