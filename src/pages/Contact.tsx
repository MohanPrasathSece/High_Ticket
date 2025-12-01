import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Mail, Send } from "lucide-react";

const handleNavClick = (path: string) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-black">
        <div className="max-w-2xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions? We're here to help.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300 font-medium mb-2 block">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-yellow-400 text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300 font-medium mb-2 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-yellow-400 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-300 font-medium mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-gray-800 border-gray-700 focus:border-yellow-400 text-white min-h-[120px]"
                  placeholder="How can we help you?"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@highticketsales.com</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default Contact;
