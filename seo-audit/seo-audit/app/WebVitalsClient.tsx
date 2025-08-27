"use client";
import { useEffect } from "react";

export default function WebVitalsClient() {
  useEffect(() => {
    import("web-vitals").then(({ getCLS, getFID, getLCP, getINP }) => {
      getCLS(console.log);
      getFID(console.log);
      getLCP(console.log);
      getINP && getINP(console.log);
      // In production, replace console.log with a function to POST to your backend for aggregation
    });
  }, []);
  return null;
}
