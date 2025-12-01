import { X, ArrowRight, TrendingDown, Users, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProblemSection = () => {
  const problems = [
    {
      title: "Undercharging Your Expertise",
      description: "You know you're worth more but struggle to communicate premium value confidently",
      impact: "Leaving $1,000+ on the table per deal",
      icon: TrendingDown
    },
    {
      title: "Sales Call Anxiety",
      description: "Feeling uncertain and unprepared during calls, hoping clients don't notice your lack of structure",
      impact: "Losing 80% of qualified opportunities",
      icon: AlertCircle
    },
    {
      title: "Wrong Client Attraction",
      description: "Watching competitors close $2K–$10K deals while you chase low-ticket clients",
      impact: "Working 10x harder for 1/10th the results",
      icon: Users
    },
    {
      title: "Burnout & Inefficiency",
      description: "Burning out chasing dozens of small sales just to make ends meet",
      impact: "No time for high-value activities",
      icon: Clock
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full mb-8 backdrop-blur-sm">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-body font-semibold text-red-400">
                THE PAIN IS REAL (AND EXPENSIVE)
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Are You Stuck in{" "}
              <span className="text-gradient-red">Low-Ticket Hell?</span>
            </h2>
            <p className="text-xl text-slate-300 font-body max-w-3xl mx-auto leading-relaxed">
              The struggle is real, but it's costing you more than you think. 
              <span className="text-red-400 font-semibold"> Every month you wait, you're losing thousands.</span>
            </p>
          </div>

          {/* Problems grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                    <problem.icon className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-slate-400 font-body text-sm leading-relaxed mb-4">
                    {problem.description}
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    <p className="text-xs font-body font-semibold text-red-400">
                      {problem.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost calculator */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-3xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Calculate Your Monthly Loss
              </h3>
              <p className="text-slate-300 font-body">
                How much is this problem costing you every month?
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-heading font-bold text-red-400 mb-2">$2,000</div>
                <p className="text-sm text-slate-400 font-body">Lost per high-ticket deal</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-heading font-bold text-red-400 mb-2">5-10</div>
                <p className="text-sm text-slate-400 font-body">Deals lost monthly</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-heading font-bold text-red-400 mb-2">$10K-20K</div>
                <p className="text-sm text-slate-400 font-body">Total monthly loss</p>
              </div>
            </div>
          </div>

          {/* Solution transition */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-gold opacity-10 blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Here's The Truth{" "}
                <span className="text-gradient-gold">It's Not Your Fault</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <p className="text-white font-body font-semibold">Not Your Talent</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <p className="text-white font-body font-semibold">Not Your Offer</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <p className="text-white font-body font-semibold">Not The Market</p>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl p-6 mb-8">
                <p className="text-xl md:text-2xl text-white font-body leading-relaxed mb-4">
                  You're missing a{" "}
                  <span className="text-gradient-gold font-bold">repeatable high-ticket system</span>
                </p>
                <p className="text-lg text-slate-300 font-body">
                  A proven framework that works consistently, every single time
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/products">
                  <Button variant="gold" size="xl" className="group">
                    See The System That Works
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-slate-400 font-body text-sm">
                  500+ professionals are already using this
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
