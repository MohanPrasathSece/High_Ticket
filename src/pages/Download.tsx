import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, FileText, Book, CheckCircle, ArrowRight, Mail, Shield, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface BundleFile {
  name: string;
  displayName: string;
  description: string;
  type: "pdf" | "docx";
  size: string;
  category: string;
}

const Download = () => {
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Bundle files configuration
  const bundleFiles: BundleFile[] = [
    {
      name: "High-Ticket Affiliate Marketing - Book.pdf",
      displayName: "Complete Guide Book",
      description: "Comprehensive high-ticket affiliate marketing strategies",
      type: "pdf",
      size: "1.9 MB",
      category: "Main Content"
    },
    {
      name: "High-Ticket Affiliate Marketing - Book.docx",
      displayName: "Complete Guide Book (Editable)",
      description: "Editable version of the complete guide",
      type: "docx",
      size: "3.0 MB",
      category: "Main Content"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 1_3.pdf",
      displayName: "Part 1: Foundation Guide",
      description: "Building your high-ticket affiliate foundation",
      type: "pdf",
      size: "289 KB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 1_3.docx",
      displayName: "Part 1: Foundation Guide (Editable)",
      description: "Editable foundation guide",
      type: "docx",
      size: "1.6 MB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 2_3.pdf",
      displayName: "Part 2: Advanced Strategies",
      description: "Advanced affiliate marketing techniques",
      type: "pdf",
      size: "292 KB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 2_3.docx",
      displayName: "Part 2: Advanced Strategies (Editable)",
      description: "Editable advanced strategies guide",
      type: "docx",
      size: "1.6 MB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 3_3.pdf",
      displayName: "Part 3: Scaling & Automation",
      description: "Scale your affiliate business effectively",
      type: "pdf",
      size: "379 KB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Guide 3_3.docx",
      displayName: "Part 3: Scaling & Automation (Editable)",
      description: "Editable scaling and automation guide",
      type: "docx",
      size: "1.7 MB",
      category: "Guides"
    },
    {
      name: "High-Ticket Affiliate Marketing - Checklist.pdf",
      displayName: "Success Checklist",
      description: "Step-by-step implementation checklist",
      type: "pdf",
      size: "160 KB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Checklist.docx",
      displayName: "Success Checklist (Editable)",
      description: "Editable implementation checklist",
      type: "docx",
      size: "1.6 MB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Prompts.pdf",
      displayName: "AI Prompts Pack",
      description: "Ready-to-use AI prompts for marketing",
      type: "pdf",
      size: "111 KB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Prompts.docx",
      displayName: "AI Prompts Pack (Editable)",
      description: "Editable AI prompts collection",
      type: "docx",
      size: "1.6 MB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Toolstack.pdf",
      displayName: "Recommended Tools",
      description: "Complete toolstack recommendations",
      type: "pdf",
      size: "65 KB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Toolstack.docx",
      displayName: "Recommended Tools (Editable)",
      description: "Editable tools and resources list",
      type: "docx",
      size: "1.6 MB",
      category: "Resources"
    },
    {
      name: "High-Ticket Affiliate Marketing - Workbook.pdf",
      displayName: "Implementation Workbook",
      description: "Practical exercises and worksheets",
      type: "pdf",
      size: "204 KB",
      category: "Workbook"
    },
    {
      name: "workbook2.docx",
      displayName: "Advanced Workbook",
      description: "Additional exercises and templates",
      type: "docx",
      size: "1.7 MB",
      category: "Workbook"
    }
  ];

  // Group files by category
  const filesByCategory = bundleFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, BundleFile[]>);

  useEffect(() => {
    // Check if user has valid access token
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    // Simple authentication check (in production, this would be more secure)
    if (token && email) {
      setIsAuthenticated(true);
    } else {
      // Check if user came from thank you page with session
      const sessionData = sessionStorage.getItem('purchaseSession');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session.email && session.timestamp > Date.now() - 24 * 60 * 60 * 1000) { // 24 hour access
          setIsAuthenticated(true);
        }
      }
    }
    
    setIsLoading(false);

    if (!token && !email && !sessionStorage.getItem('purchaseSession')) {
      toast({
        title: "Access Required",
        description: "Please complete your purchase to access the bundle files.",
        variant: "destructive",
      });
      navigate('/checkout');
    }
  }, [searchParams, navigate]);

  const handleDownload = async (fileName: string) => {
    try {
      // Mark file as downloaded
      setDownloadedFiles(prev => new Set([...prev, fileName]));
      
      // Initiate download
      const response = await fetch(`/bundle/${fileName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Started",
        description: `${fileName} is being downloaded.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadAll = async () => {
    toast({
      title: "Downloading All Files",
      description: "Starting download of all bundle files...",
    });
    
    for (const file of bundleFiles) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between downloads
      handleDownload(file.name);
    }
  };

  const getFileIcon = (type: "pdf" | "docx") => {
    return type === "pdf" ? FileText : Book;
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Verifying access...</p>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 text-center">
            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Required</h1>
            <p className="text-gray-300 mb-6">
              Please complete your purchase to access the High-Ticket Sales Mastery bundle files.
            </p>
            <Button 
              onClick={() => navigate('/checkout')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full"
            >
              Complete Purchase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-black">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Purchase Confirmed - Download Your Bundle
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              High-Ticket Sales Mastery <span className="text-yellow-400">Bundle</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Download your complete bundle with 16 files including guides, workbooks, checklists, and resources.
            </p>
          </div>

          {/* Download All Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={handleDownloadAll}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3"
            >
              <Download className="w-5 h-5 mr-2" />
              Download All Files (16 Total)
            </Button>
          </div>

          {/* Files by Category */}
          <div className="space-y-8">
            {Object.entries(filesByCategory).map(([category, files]) => (
              <div key={category}>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  {category === "Main Content" && <Book className="w-5 h-5 text-yellow-400" />}
                  {category === "Guides" && <FileText className="w-5 h-5 text-yellow-400" />}
                  {category === "Resources" && <Download className="w-5 h-5 text-yellow-400" />}
                  {category === "Workbook" && <Book className="w-5 h-5 text-yellow-400" />}
                  {category}
                  <span className="text-sm text-gray-400">({files.length} files)</span>
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => {
                    const Icon = getFileIcon(file.type);
                    const isDownloaded = downloadedFiles.has(file.name);
                    
                    return (
                      <Card key={file.name} className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-white text-sm font-medium leading-tight">
                                {file.displayName}
                              </CardTitle>
                              <p className="text-xs text-gray-400 mt-1">
                                {file.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {file.type.toUpperCase()} • {file.size}
                            </span>
                            <Button
                              onClick={() => handleDownload(file.name)}
                              variant="outline"
                              size="sm"
                              className={`border-gray-600 hover:bg-gray-800 ${
                                isDownloaded ? 'border-green-500 text-green-400' : 'text-white'
                              }`}
                            >
                              {isDownloaded ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Downloaded
                                </>
                              ) : (
                                <>
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If you have any issues downloading your files, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="mailto:support@highticketsales.com" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300">
                  <Mail className="w-4 h-4" />
                  support@highticketsales.com
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  Response within 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default Download;
