"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { StructuredData, generateBreadcrumbSchema } from "@/components/seo/StructuredData";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  includeHome?: boolean;
  darkMode?: boolean;
}

export function Breadcrumbs({
  items,
  className = "",
  includeHome = true,
  darkMode = true,
}: BreadcrumbsProps) {
  // Prepend home if requested
  const breadcrumbItems = includeHome
    ? [{ name: "Home", url: "https://www.aiseoturbo.com" }, ...items]
    : items;

  // Generate schema data
  const schemaData = generateBreadcrumbSchema(breadcrumbItems);

  // Use higher-contrast slate colors by default on dark backgrounds
  const textColor = darkMode
    ? "text-slate-300 hover:text-white"
    : "text-gray-600 hover:text-gray-900";
  const activeColor = darkMode ? "text-white" : "text-gray-900";
  const separatorColor = darkMode ? "text-slate-500" : "text-gray-400";

  return (
    <>
      <StructuredData data={schemaData} />
      <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isHome = item.name === "Home";

          return (
            <React.Fragment key={item.url}>
              {index > 0 && (
                <ChevronRight className={`w-4 h-4 ${separatorColor}`} aria-hidden="true" />
              )}

              {isLast ? (
                <span className={`font-medium ${activeColor}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url.replace("https://www.aiseoturbo.com", "")}
                  className={`transition-colors ${textColor}`}
                >
                  {isHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
