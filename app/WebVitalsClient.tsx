"use client";
import { useEffect } from "react";

export default function WebVitalsClient() {
  useEffect(() => {
    import("web-vitals")
      .then((webVitals) => {
        // Safely check if each function exists before calling
        if (webVitals.getCLS && typeof webVitals.getCLS === 'function') {
          webVitals.getCLS(console.log);
        }
        if (webVitals.getFID && typeof webVitals.getFID === 'function') {
          webVitals.getFID(console.log);
        }
        if (webVitals.getLCP && typeof webVitals.getLCP === 'function') {
          webVitals.getLCP(console.log);
        }
        if (webVitals.getINP && typeof webVitals.getINP === 'function') {
          webVitals.getINP(console.log);
        }
      })
      .catch((error) => {
        console.warn("Failed to load web-vitals:", error);
      });
  }, []);
  return null;
}
