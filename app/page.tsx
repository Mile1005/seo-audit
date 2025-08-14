"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "../components/common/Hero";
import ModernForm from "../components/common/ModernForm";
import ModernGscPanel from "../components/common/ModernGscPanel";
import FeaturesSection from "../components/common/FeaturesSection";

interface FormErrors {
  pageUrl?: string;
  targetKeyword?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    pageUrl: "",
    targetKeyword: "",
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
          targetKeyword: data.targetKeyword.trim() || undefined,
          email: data.email.trim() || undefined,
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
    </div>
  );
}
