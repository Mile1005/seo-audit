"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    // Web Vitals reporting
    import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
      onINP(console.log);
    });
  }, []);

  return null;
}
