"use client";

import React from "react";
import { AdaptiveNavigation } from "@/components/navigation/adaptive-navigation";
import Footer from "@/components/layout/Footer";
import { VariantProvider } from "@/lib/ab";

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <VariantProvider>
      <div className={`min-h-screen bg-slate-950 ${className}`}>
        {/* Screen reader announcements region */}
        <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only"></div>

        {/* Navigation */}
        <AdaptiveNavigation />

        {/* Main Content with top padding for fixed nav */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Client-side Analytics now mounted globally in app/layout.tsx */}
      </div>
    </VariantProvider>
  );
}
