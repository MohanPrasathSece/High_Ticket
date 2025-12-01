import ProductSection from "@/components/sections/ProductSection";
import BonusSection from "@/components/sections/BonusSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";

const Products = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Hero section for products page */}
        <section className="py-20 md:py-32 bg-background relative w-full">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-sm font-body text-gold mb-6">
                What You Get
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Everything You Need to Close{" "}
                <span className="text-gradient-gold">$2,000+ Sales</span>
              </h1>
              <p className="text-lg text-foreground/70 font-body max-w-3xl mx-auto mb-8">
                A complete, proven system designed to transform how you approach, present, and close high-ticket deals.
              </p>
            </div>
          </div>
        </section>

        <ProductSection />
        <BonusSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Products;
