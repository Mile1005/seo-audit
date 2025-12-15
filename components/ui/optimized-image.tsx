"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import {
  createOptimizedImageConfig,
  generateResponsiveSizes,
  ImagePerformanceMonitor,
} from "@/lib/image-optimizer";
import { generateHeroDashboardFallback, generateMobileAuditFallback } from "@/lib/image-fallbacks";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  responsive?: boolean;
  performanceMonitoring?: boolean;
  fallbackSrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | string;
  containerClassName?: string;
}

/**
 * High-performance optimized image component
 * Features: AVIF/WebP support, blur placeholders, performance monitoring, error handling
 */
export function OptimizedImage({
  src,
  alt,
  responsive = true,
  performanceMonitoring = true,
  fallbackSrc,
  aspectRatio,
  containerClassName,
  className,
  priority = false,
  quality = 85,
  sizes,
  fill,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const monitor = ImagePerformanceMonitor.getInstance();

  // Generate optimized configuration
  const config = createOptimizedImageConfig({
    src: imageError && fallbackSrc ? fallbackSrc : src,
    alt,
    priority,
    quality: typeof quality === "number" ? quality : 85,
    sizes: sizes || (responsive ? generateResponsiveSizes() : undefined),
    fill,
  });

  // Aspect ratio styles
  const aspectRatioStyles: Record<string, string> = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const aspectRatioClass =
    aspectRatio && aspectRatioStyles[aspectRatio]
      ? aspectRatioStyles[aspectRatio]
      : aspectRatio?.includes("/")
        ? `aspect-[${aspectRatio}]`
        : "";

  // Performance monitoring
  useEffect(() => {
    if (performanceMonitoring) {
      monitor.startImageLoad(src);
    }
  }, [src, performanceMonitoring, monitor]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (performanceMonitoring) {
      monitor.endImageLoad(src);
    }
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);

    // Generate intelligent fallback based on image path
    let fallback = fallbackSrc;

    if (!fallback) {
      if (src.includes("hero-laptop-dashboard")) {
        fallback = generateHeroDashboardFallback(1200, 750);
      } else if (src.includes("mobile-audit-interface")) {
        fallback = generateMobileAuditFallback(375, 667);
      } else {
        // Generic fallback
        fallback = `data:image/svg+xml;base64,${btoa(`
          <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f1f5f9"/>
            <rect x="200" y="250" width="400" height="100" rx="8" fill="#e2e8f0"/>
            <circle cx="400" cy="200" r="30" fill="#94a3b8"/>
            <text x="400" y="310" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="18">Image Loading...</text>
          </svg>
        `)}`;
      }
    }

    setImageError(true);

    // Update src to fallback
    if (fallback && fallback !== src) {
      // Force re-render with fallback
      setTimeout(() => {
        const imgElement = document.querySelector(`img[alt="${alt}"]`) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = fallback!;
        }
      }, 100);
    }

    // Report error to monitoring
    if (performanceMonitoring && typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "image_error", {
        custom_parameter_1: src,
      });
    }
  };

  const imageElement = (
    <Image
      {...config}
      {...props}
      alt={alt || ""}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  // Return with container if aspect ratio is specified
  if (aspectRatio && !fill) {
    return (
      <div className={cn("relative overflow-hidden", aspectRatioClass, containerClassName)}>
        <Image
          {...config}
          {...props}
          alt={alt || ""}
          fill
          className={cn(
            "object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }

  return imageElement;
}

/**
 * Hero image component with optimal loading
 */
export function HeroImage({ src, alt, className, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority
      quality={90}
      sizes="100vw"
      className={cn("w-full h-auto", className)}
      performanceMonitoring
      {...props}
    />
  );
}

/**
 * Feature image component
 */
export function FeatureImage({
  src,
  alt,
  aspectRatio = "video",
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      responsive
      quality={85}
      className={cn("rounded-lg shadow-lg", className)}
      {...props}
    />
  );
}

/**
 * Avatar/Profile image component
 */
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  ...props
}: OptimizedImageProps & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      aspectRatio="square"
      quality={90}
      className={cn("rounded-full", className)}
      sizes={`${size}px`}
      {...props}
    />
  );
}

/**
 * Gallery image component with lazy loading
 */
export function GalleryImage({
  src,
  alt,
  aspectRatio = "square",
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      quality={80}
      className={cn("cursor-pointer transition-transform hover:scale-105", className)}
      {...props}
    />
  );
}

/**
 * Background image component
 */
export function BackgroundImage({
  src,
  alt,
  children,
  className,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        quality={85}
        {...props}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
