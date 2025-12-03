import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import CurrencyConverter from "@/components/CurrencyConverter";

const CurrencyConverterPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                Live Currency Converter
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
                Convert any amount between multiple currencies in real time. This tool helps international customers see
                the approximate value in their local currency. All payments on this site are processed securely in
                Indian Rupees (INR) via Razorpay; your bank handles the final conversion.
              </p>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl">
              <CurrencyConverter baseAmount={147} baseCurrency="USD" showConversionHistory compact={false} />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default CurrencyConverterPage;
