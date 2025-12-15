"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/analytics";

export function ClientAnalytics() {
  const pathname = usePathname();

  // Track page views on route changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const page_path = pathname || "/";
    const page_title = document.title;
    const page_location = window.location.href;

    // If gtag exists (e.g., GA4 loaded by GTM), use config call
    if (typeof window.gtag !== "undefined") {
      pageview({ page_path, page_title, page_location });
      return;
    }

    // Otherwise push a GTM dataLayer event; GA4 tag in GTM should map this to a page_view
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "page_view",
        page_path,
        page_title,
        page_location,
      });
    } catch {}
  }, [pathname]);

  return null;
}
