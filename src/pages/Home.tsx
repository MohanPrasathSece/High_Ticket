import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <HeroSection />
        <ProblemSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </>
  );
};

export default Home;
