import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ProductSection from "@/components/sections/ProductSection";
import BonusSection from "@/components/sections/BonusSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <BonusSection />
      <TestimonialsSection />
      <FinalCTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
