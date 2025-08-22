import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsClient from "./WebVitalsClient";
import Navigation from "../components/common/Navigation";

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
    <html lang="en" className={inter.variable}>
      <body>
        <Navigation />
        {children}
        <Analytics />
        <SpeedInsights />
        <WebVitalsClient />
      </body>
    </html>
  );
}
