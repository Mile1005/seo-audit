"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import ModernForm from "../components/common/ModernForm";
import ModernGscPanel from "../components/common/ModernGscPanel";
import FeaturesSection from "../components/common/FeaturesSection";
import LoginForm from "../components/auth/LoginForm";
import UserDashboard from "../components/auth/UserDashboard";

interface FormErrors {
  pageUrl?: string;
  email?: string;
}

// Utility function to add HTTPS if missing
function ensureHttps(url: string): string {
  if (!url) return url;
  url = url.trim();
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(ensureHttps(url));
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    pageUrl: "",
    email: "",
  });

  // GSC Authentication state
  const [isGscAuthenticated, setIsGscAuthenticated] = useState(false);
  const [isGscLoading, setIsGscLoading] = useState(true);
  const [isGscConnecting, setIsGscConnecting] = useState(false);
  const [gscValidationData, setGscValidationData] = useState<any>(null);

  useEffect(() => {
    checkGscAuthStatus();
    
    // Check for URL parameters indicating GSC auth result
    const urlParams = new URLSearchParams(window.location.search);
    const gscSuccess = urlParams.get('gsc_success');
    const gscError = urlParams.get('gsc_error');
    
    if (gscSuccess === 'true') {
      console.log('GSC authentication successful');
      setIsGscAuthenticated(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (gscError) {
      console.error('GSC authentication failed:', gscError);
      setIsGscAuthenticated(false);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check localStorage for GSC auth completion (backup method)
    const checkLocalStorageAuth = () => {
      const gscAuthCompleted = localStorage.getItem('gsc_auth_completed');
      if (gscAuthCompleted) {
        console.log('Main window: Found GSC auth completion in localStorage');
        localStorage.removeItem('gsc_auth_completed');
        setIsGscConnecting(false);
        checkGscAuthStatus().then(() => {
          console.log('Main window: Auth status refreshed from localStorage signal');
        });
      }
    };

    checkLocalStorageAuth();
    const storageCheckInterval = setInterval(checkLocalStorageAuth, 1000);
    
    setTimeout(() => {
      clearInterval(storageCheckInterval);
    }, 180000);

    // Set up message listener for GSC auth
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'GSC_AUTH_SUCCESS') {
        console.log('Main window: Received GSC_AUTH_SUCCESS message');
        setIsGscConnecting(false);
        checkGscAuthStatus().then(() => {
          console.log('Main window: Auth status refreshed from postMessage');
        });
      } else if (event.data === 'GSC_AUTH_ERROR') {
        console.log('Main window: Received GSC_AUTH_ERROR message');
        setIsGscConnecting(false);
        setIsGscAuthenticated(false);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      clearInterval(storageCheckInterval);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const checkGscAuthStatus = async () => {
    try {
      const response = await fetch("/api/debug/gsc-config");
      if (response.ok) {
        const data = await response.json();
        setIsGscAuthenticated(data.isAuthenticated);
        setGscValidationData(data);
      }
    } catch (error) {
      console.error("Error checking GSC auth status:", error);
    } finally {
      setIsGscLoading(false);
    }
  };

  const handleGscConnect = async () => {
    setIsGscConnecting(true);
    try {
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const response = await fetch("/api/auth/gsc/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await response.json();
      
      if (data.authUrl) {
        const authWindow = window.open(data.authUrl, "gsc-auth", "width=600,height=700");
        
        if (!authWindow) {
          alert("Please allow popups for this site to connect to Google Search Console.");
          setIsGscConnecting(false);
          return;
        }

        // Poll for window closure and check auth status
        const pollInterval = setInterval(async () => {
          if (authWindow.closed) {
            clearInterval(pollInterval);
            await checkGscAuthStatus();
            setIsGscConnecting(false);
          }
        }, 1000);

        // Timeout after 5 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
          if (!authWindow.closed) {
            authWindow.close();
          }
          setIsGscConnecting(false);
        }, 300000);
      }
    } catch (error) {
      console.error("Error connecting to GSC:", error);
      setIsGscConnecting(false);
    }
  };

  const handleGscDisconnect = async () => {
    try {
      const response = await fetch("/api/debug/gsc-config", {
        method: "DELETE",
      });
      if (response.ok) {
        setIsGscAuthenticated(false);
        setGscValidationData(null);
      }
    } catch (error) {
      console.error("Error disconnecting from GSC:", error);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (data: typeof formData) => {
    // Validate form
    const newErrors: FormErrors = {};
    
    if (!data.pageUrl.trim()) {
      newErrors.pageUrl = "Page URL is required";
    } else if (!isValidUrl(data.pageUrl)) {
      newErrors.pageUrl = "Please enter a valid URL";
    }
    
    if (data.email && !isValidEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/audit/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageUrl: ensureHttps(data.pageUrl),
          email: data.email.trim() || undefined,
          userId: (session?.user as any)?.id,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const responseData = contentType.includes("application/json") ? await response.json() : {};

      if (response.ok && responseData.runId) {
        if ((responseData as any).result) {
          try {
            sessionStorage.setItem(`audit:${(responseData as any).runId}`, JSON.stringify((responseData as any).result));
          } catch {}
          setTimeout(() => router.push(`/audit/${(responseData as any).runId}?inline=true`), 0);
          return;
        }
        router.push(`/audit/${(responseData as any).runId}`);
      } else {
        setErrors({ pageUrl: (responseData as any).error || "Failed to start audit. Please try again." });
      }
    } catch (error) {
      console.error("Audit error:", error);
      setErrors({ pageUrl: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      {/* Authentication Section - Show login form if not authenticated */}
      {status === "loading" ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : !session ? (
        <div className="flex items-center justify-center min-h-screen px-4">
          <LoginForm />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          {/* User Dashboard Section */}
          <section className="py-20 bg-bg-secondary">
            <div className="container-width">
              <UserDashboard className="max-w-4xl mx-auto" />
            </div>
          </section>

          {/* Hero Section */}
          <Hero 
            title="AI Visibility Audit"
            subtitle="Get comprehensive SEO analysis of your web pages with actionable insights and recommendations powered by artificial intelligence"
          >
            <ModernForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              errors={errors}
              formData={formData}
              onInputChange={handleInputChange}
            />
          </Hero>

      {/* GSC Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-width">
          <ModernGscPanel
            isAuthenticated={isGscAuthenticated}
            isLoading={isGscLoading}
            isConnecting={isGscConnecting}
            validationData={gscValidationData}
            onConnect={handleGscConnect}
            onDisconnect={handleGscDisconnect}
          />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <section className="container-width my-16">
        <div className="glass-card-enhanced p-8 md:p-12 mb-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">How It Works</h2>
          <ol className="list-decimal list-inside text-lg text-text-secondary space-y-3">
            <li><strong>Enter your page URL</strong> and (optionally) your email address above.</li>
            <li><strong>Click Start</strong> to begin your AI-powered SEO audit.</li>
            <li><strong>Our engine crawls your page</strong> and analyzes technical SEO, content, accessibility, and more.</li>
            <li><strong>Get a detailed, actionable report</strong> with prioritized fixes, code snippets, and accessibility insights.</li>
            <li><strong>Download, share, or export</strong> your results and track improvements over time.</li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-width my-16">
        <div className="glass-card-enhanced p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="group rounded-lg border border-accent-primary/30 bg-bg-secondary/50 p-4 transition-all">
              <summary className="cursor-pointer text-lg font-semibold text-accent-primary flex items-center justify-between">
                What is an AI SEO audit?
                <span className="ml-2 text-accent-primary">+</span>
              </summary>
              <div className="mt-2 text-text-secondary">
                An AI SEO audit uses artificial intelligence to analyze your website for technical, content, and accessibility issues, providing actionable recommendations to improve your search visibility and user experience.
              </div>
            </details>
            <details className="group rounded-lg border border-accent-primary/30 bg-bg-secondary/50 p-4 transition-all">
              <summary className="cursor-pointer text-lg font-semibold text-accent-primary flex items-center justify-between">
                What does this tool check for?
                <span className="ml-2 text-accent-primary">+</span>
              </summary>
              <div className="mt-2 text-text-secondary">
                We check for missing or weak meta tags, heading structure, content quality, schema markup, image alt text, internal links, accessibility/ARIA issues, and more. You get a prioritized list of fixes with code snippets and explanations.
              </div>
            </details>
            <details className="group rounded-lg border border-accent-primary/30 bg-bg-secondary/50 p-4 transition-all">
              <summary className="cursor-pointer text-lg font-semibold text-accent-primary flex items-center justify-between">
                Is this tool free?
                <span className="ml-2 text-accent-primary">+</span>
              </summary>
              <div className="mt-2 text-text-secondary">
                Yes! You can run unlimited audits for free. We believe in making advanced SEO and accessibility insights available to everyone.
              </div>
            </details>
            <details className="group rounded-lg border border-accent-primary/30 bg-bg-secondary/50 p-4 transition-all">
              <summary className="cursor-pointer text-lg font-semibold text-accent-primary flex items-center justify-between">
                How is this different from other SEO tools?
                <span className="ml-2 text-accent-primary">+</span>
              </summary>
              <div className="mt-2 text-text-secondary">
                Our audits are powered by AI, provide accessibility/ARIA checks, and deliver clear, actionable fixes with code snippets. The interface is modern, mobile-friendly, and designed for both beginners and experts.
              </div>
            </details>
            <details className="group rounded-lg border border-accent-primary/30 bg-bg-secondary/50 p-4 transition-all">
              <summary className="cursor-pointer text-lg font-semibold text-accent-primary flex items-center justify-between">
                Will this tool help me rank higher on Google?
                <span className="ml-2 text-accent-primary">+</span>
              </summary>
              <div className="mt-2 text-text-secondary">
                While no tool can guarantee rankings, fixing the issues we identify will make your site more search-friendly, accessible, and user-focused—key factors for better SEO performance.
              </div>
            </details>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
}
