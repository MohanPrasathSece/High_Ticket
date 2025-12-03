import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/bundle", label: "Features" },
    { path: "/checkout", label: "Pricing" },
    { path: "/currency", label: "Currency Converter" },
    { path: "/contact", label: "Support" },
  ];

  const handleNavClick = (path: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <h1 className="text-lg font-heading font-bold text-white whitespace-nowrap">
              <span className="text-yellow-400">High-Ticket</span> Sales
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`font-body text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                    isActive(item.path)
                      ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
              <Button variant="gold" size="sm" className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-gray-800 border border-gray-700"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block font-body text-sm font-medium transition-all duration-200 px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/checkout" onClick={() => handleNavClick('/checkout')}>
                <Button variant="gold" size="sm" className="w-full group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
