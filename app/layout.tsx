import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "SEO-Audit — AI Readiness Audit",
  description: "Free AI Visibility Audit for your page. Analyze SEO readiness and get quick wins.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className="min-h-full bg-bg-primary text-text-primary antialiased font-inter">
        {children}
      </body>
    </html>
  );
}
