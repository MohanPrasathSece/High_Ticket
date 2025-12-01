import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, FileText, Book, CheckCircle, ArrowRight, Mail, Shield, Clock, Archive } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface BundleFile {
  name: string;
  displayName: string;
  description: string;
  type: "pdf" | "docx" | "zip";
  size: string;
  category: string;
}

const Download = () => {
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  // Bundle files configuration - only ZIP file
  const bundleFiles: BundleFile[] = [
    {
      name: "bundle.zip",
      displayName: "Complete Bundle (All Files)",
      description: "Download all 16 files in a single ZIP package",
      type: "zip",
      size: "12.5 MB",
      category: "Complete Bundle"
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
      // Prevent multiple downloads
      if (isDownloading || downloadedFiles.has(fileName)) {
        if (downloadedFiles.has(fileName)) {
          toast({
            title: "Already Downloaded",
            description: "This file has already been downloaded.",
          });
        }
        return;
      }
      
      // Set downloading state
      setIsDownloading(true);
      
      // Show download modal
      setShowDownloadModal(true);
      setDownloadProgress(0);
      
      // Simulate preparation progress
      for (let i = 0; i <= 100; i += 20) {
        setDownloadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Mark file as downloaded FIRST to prevent multiple clicks
      setDownloadedFiles(prev => new Set([...prev, fileName]));
      
      // For ZIP file, trigger automatic download
      if (fileName === 'bundle.zip') {
        // Create a single download link
        const downloadUrl = '/bundle.zip';
        
        // Use a direct approach to prevent multiple windows
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'bundle.zip';
        link.style.display = 'none';
        
        // Add to DOM, click once, and immediately remove
        document.body.appendChild(link);
        link.click();
        
        // Remove immediately to prevent multiple triggers
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 100);
        
        // Show completion message
        setDownloadProgress(100);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowDownloadModal(false);
          setIsDownloading(false);
          toast({
            title: "Download Complete",
            description: "bundle.zip has been downloaded to your device.",
          });
        }, 2000);
        
        return;
      }
      
      // Fallback for other files (if any)
      const response = await fetch(`/bundle/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: File not found`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowDownloadModal(false);
        setIsDownloading(false);
        toast({
          title: "Download Complete",
          description: `${fileName} has been downloaded to your device.`,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Download error:', error);
      setShowDownloadModal(false);
      setIsDownloading(false);
      toast({
        title: "Download Failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadAll = async () => {
    // Since we only have one file, just download the ZIP
    await handleDownload('bundle.zip');
  };

  const getFileIcon = (type: "pdf" | "docx" | "zip") => {
    switch (type) {
      case "pdf":
        return FileText;
      case "docx":
        return Book;
      case "zip":
        return Archive;
      default:
        return DownloadIcon;
    }
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
              Download your complete bundle with all 16 files in a single ZIP package.
            </p>
          </div>

          {/* Download All Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={() => handleDownload('bundle.zip')}
              disabled={isDownloading || downloadedFiles.has('bundle.zip')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Downloading...
                </>
              ) : downloadedFiles.has('bundle.zip') ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Downloaded
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Complete Bundle (ZIP)
                </>
              )}
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
                              disabled={isDownloading || isDownloaded}
                              variant="outline"
                              size="sm"
                              className={`border-gray-600 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${
                                isDownloaded ? 'border-green-500 text-green-400' : 'text-white'
                              }`}
                            >
                              {isDownloading ? (
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                              ) : isDownloaded ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Downloaded
                                </>
                              ) : (
                                <>
                                  <DownloadIcon className="w-3 h-3 mr-1" />
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
      
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Preparing Your Download</h3>
              <p className="text-gray-300 mb-6">
                Your High-Ticket Sales Mastery bundle is being prepared for download...
              </p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{downloadProgress}% Complete</p>
              </div>
              
              {/* Download Details */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">File:</span>
                    <span className="text-white">bundle.zip</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-white">12.5 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contents:</span>
                    <span className="text-white">16 files</span>
                  </div>
                </div>
              </div>
              
              {downloadProgress === 100 && (
                <div className="text-green-400 text-sm font-medium">
                  ✓ Download started! Check your downloads folder.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Download;
