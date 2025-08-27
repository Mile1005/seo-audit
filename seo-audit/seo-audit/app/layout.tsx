import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsClient from "./WebVitalsClient";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "aiseoturbo.com — AI-Powered SEO Audits and Optimization",
  description: "Instantly audit and improve your website's SEO with AI-driven insights. Get a free audit and actionable recommendations to boost your rankings and visibility.",
  metadataBase: new URL("https://aiseoturbo.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>aiseoturbo.com</title>
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {/* Add Web Vitals Client Collector */}
        <WebVitalsClient />
      </body>
    </html>
  );
}
