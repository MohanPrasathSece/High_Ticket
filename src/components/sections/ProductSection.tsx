import ProductCard from "@/components/ProductCard";
import { FileText, BookOpen, GitBranch, Target, MessageSquare } from "lucide-react";

const ProductSection = () => {
  const products = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "High-Ticket Sales Worksheet",
      description: "Your exact call and conversation structure for closing $2,000+ clients with confidence.",
      features: [
        "Step-by-step call framework",
        "Discovery question templates",
        "Closing sequence blueprint",
      ],
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "High-Ticket Foundations Guidebook",
      description: "Learn how to position yourself as a premium authority that clients seek out.",
      features: [
        "Premium positioning strategies",
        "Value communication frameworks",
        "Authority-building tactics",
      ],
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Sales Funnel Blueprint",
      description: "A visual map of how high-ticket clients discover, trust, and buy from you.",
      features: [
        "Complete funnel architecture",
        "Traffic source strategies",
        "Conversion optimization tips",
      ],
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Authority-Building Action Plan",
      description: "Your daily roadmap for generating inbound premium leads on autopilot.",
      features: [
        "30-day implementation plan",
        "Daily action checklists",
        "Lead generation system",
      ],
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Toolstack Prompts Pack",
      description: "Scripts, prompts, and objection-handling frameworks for closing with complete confidence.",
      features: [
        "50+ ready-to-use scripts",
        "Objection handling templates",
        "AI prompt collection",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-sm font-body text-gold mb-6">
              What's Inside
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Everything You Need to Close{" "}
              <span className="text-gradient-gold">$2,000+ Sales</span>
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-3xl mx-auto">
              A complete, proven system designed to transform how you approach, present, and close high-ticket deals.
            </p>
          </div>

          {/* Products grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                icon={product.icon}
                title={product.title}
                description={product.description}
                features={product.features}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
