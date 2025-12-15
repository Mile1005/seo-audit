"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ga_consent_v2";
const COOKIE_KEY = "ga_consent_v2";

const GTM_ID = "GTM-K7SGKVC9";
const AHREFS_SRC = "https://analytics.ahrefs.com/analytics.js";
const AHREFS_DATA_KEY = "0AVrYH2zbA3TJwWbRnMwlg";

type ConsentChoice = "accepted" | "rejected" | "unset";

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

function getConsentChoice(): ConsentChoice {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (fromStorage === "accepted" || fromStorage === "rejected") return fromStorage;
  } catch {}

  const fromCookie = readCookieValue(COOKIE_KEY);
  if (fromCookie === "accepted" || fromCookie === "rejected") return fromCookie;

  return "unset";
}

function ensureGtmLoaded() {
  if (typeof document === "undefined") return;

  const existing = document.querySelector(`script[src^="https://www.googletagmanager.com/gtm.js?id="]`);
  if (existing) return;

  // Matches the official GTM bootstrap snippet behavior.
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function ensureAhrefsLoaded() {
  if (typeof document === "undefined") return;

  const existing = document.querySelector(`script[src^="${AHREFS_SRC}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = AHREFS_SRC;
  script.setAttribute("data-key", AHREFS_DATA_KEY);
  document.head.appendChild(script);
}

export function ConsentControlledScripts() {
  const [choice, setChoice] = useState<ConsentChoice>("unset");

  const shouldLoad = useMemo(() => choice === "accepted", [choice]);

  useEffect(() => {
    setChoice(getConsentChoice());

    function handler() {
      setChoice(getConsentChoice());
    }

    window.addEventListener("ga-consent-changed", handler);
    return () => window.removeEventListener("ga-consent-changed", handler);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    ensureGtmLoaded();
    ensureAhrefsLoaded();
  }, [shouldLoad]);

  return null;
}
