import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-gray-100">
            {/* Page Header */}
            <header className="mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-3 font-semibold">Product Overview</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                High-Ticket Sales Bundle
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl">
                A complete digital bundle that gives you the frameworks, scripts, and worksheets to consistently close
                <span className="text-yellow-400 font-semibold"> $2,000+ clients</span>. This is a one-time purchase
                digital product delivered instantly after payment.
              </p>
            </header>

            {/* 6-Figure Commission Blueprint Visual */}
            <div className="mb-10 sm:mb-12 flex flex-col lg:flex-row items-center gap-6 bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-6">
              <div className="w-full lg:w-1/2">
                <img
                  src="/product.jpg"
                  alt="6-Figure Commission Blueprint - Your complete high ticket affiliate system"
                  className="w-full h-auto rounded-xl object-cover shadow-lg"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.25em] text-purple-300 mb-2 font-semibold">
                  Included Inside This Bundle
                </p>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
                  6-Figure Commission Blueprint
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-2">
                  Your complete high ticket affiliate system to generate hundreds or even thousands of dollars per day in
                  commissions.
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Trusted by creators and packed with implementation templates, this blueprint is part of the High-Ticket
                  Sales Bundle and helps you close more premium offers with a proven system.
                </p>
              </div>
            </div>

            {/* What is Included */}
            <section className="mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">What You Get Inside</h2>
              <p className="text-gray-300 mb-4">
                The bundle includes multiple step-by-step resources designed to help coaches, consultants, freelancers,
                and service providers move from low-ticket offers to high-ticket clients.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">High-Ticket Sales Worksheet</h3>
                  <p className="text-gray-300 text-sm">
                    A structured worksheet that gives you the exact call and conversation flow for closing $2,000+
                    clients with clarity and confidence.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">High-Ticket Foundations Guidebook</h3>
                  <p className="text-gray-300 text-sm">
                    A guide that shows you how to position yourself as a premium authority that naturally attracts
                    higher-paying clients.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Sales Funnel Blueprint</h3>
                  <p className="text-gray-300 text-sm">
                    A visual map that explains exactly how high-ticket clients discover you, build trust, and decide to
                    buy.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Authority-Building Action Plan</h3>
                  <p className="text-gray-300 text-sm">
                    A practical daily roadmap for generating inbound premium leads without relying on paid ads or cold
                    outreach.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Toolstack Prompts &amp; Scripts</h3>
                  <p className="text-gray-300 text-sm">
                    Scripts, prompts, and objection-handling frameworks so you always know what to say in DMs, emails,
                    and calls.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-400/60 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">BONUS</span>
                    <h3 className="text-xl font-bold text-yellow-300">High-Ticket Messenger Conversion Scripts</h3>
                  </div>
                  <p className="text-gray-100 text-sm">
                    Short but powerful chat templates that turn casual conversations into high-intent booked calls within
                    minutes.
                  </p>
                </div>
              </div>
            </section>

            {/* Who it is For / Benefits */}
            <section className="mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Who This Product Is For</h2>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                This digital bundle is ideal for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                <li>Coaches, consultants, and experts selling services above $1,000.</li>
                <li>Freelancers who are tired of low-ticket work and want premium clients.</li>
                <li>Creators and agency owners who want a repeatable high-ticket closing system.</li>
              </ul>
            </section>

            {/* Price & Guarantee */}
            <section className="mb-10 sm:mb-12">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white mb-2">Pricing &amp; Access</h2>
                  <p className="text-gray-300 text-sm sm:text-base mb-4">
                    The High-Ticket Sales Bundle is a <span className="text-yellow-400 font-semibold">one-time digital purchase</span>.
                    You get lifetime access to all materials and downloads.
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-yellow-400">$147</span>
                    <span className="text-gray-500 line-through text-base">$350+</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Secure online payment is processed via Razorpay. International customers can pay with cards and their
                    bank will convert from their local currency to INR.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>

                <div className="w-full md:w-auto md:text-right">
                  <Link to="/checkout">
                    <Button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base px-6 py-3 rounded-lg inline-flex items-center justify-center">
                      Get Instant Access — $147
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <p className="text-xs text-gray-400 mt-3 max-w-xs md:ml-auto">
                    This is a digital product. After successful payment, you will be redirected to a thank you page and
                    receive immediate access to download the bundle.
                  </p>
                </div>
              </div>
            </section>

            {/* Simple FAQ */}
            <section className="mb-4 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-300">
                <div>
                  <p className="font-semibold text-white mb-1">Is this a digital product?</p>
                  <p>Yes. The High-Ticket Sales Bundle is 100% digital and delivered online. Nothing physical is shipped.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">How do I get access after payment?</p>
                  <p>
                    After you complete your payment via Razorpay, you will be redirected to a thank you page and your
                    download will start automatically. You will also receive details by email.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Which currencies and payment methods are supported?</p>
                  <p>
                    Payments are processed in INR via Razorpay. International customers can pay using credit/debit cards,
                    netbanking, UPI, and supported wallets. Your bank handles the conversion from your local currency.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Product;
