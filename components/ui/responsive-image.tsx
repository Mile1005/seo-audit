"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createImageFallback } from "@/lib/image-fallbacks";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  blurDataURL?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
  fallbackType?: "hero" | "mobile" | "general";
}

interface ImageFormat {
  format: "webp" | "avif" | "jpeg" | "png";
  supported: boolean;
}

// Detect format support
const detectFormatSupport = (): Promise<ImageFormat[]> => {
  if (typeof window === "undefined") {
    return Promise.resolve([
      { format: "jpeg", supported: true },
      { format: "png", supported: true },
      { format: "webp", supported: false },
      { format: "avif", supported: false },
    ]);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const formats: ImageFormat[] = [
    { format: "jpeg", supported: true },
    { format: "png", supported: true },
    { format: "webp", supported: false },
    { format: "avif", supported: false },
  ];

  return Promise.all([
    // Test WebP support
    new Promise<boolean>((resolve) => {
      const webpData = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
      const img = document.createElement("img");
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = webpData;
    }),
    // Test AVIF support
    new Promise<boolean>((resolve) => {
      const avifData =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
      const img = document.createElement("img");
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = avifData;
    }),
  ]).then(([webpSupported, avifSupported]) => {
    formats[2].supported = webpSupported;
    formats[3].supported = avifSupported;
    return formats;
  });
};

// Generate srcSet for different formats and sizes
const generateSrcSet = (src: string, formats: ImageFormat[], sizes: number[]) => {
  const supportedFormats = formats.filter((f) => f.supported);
  const srcSets: { [key: string]: string } = {};

  supportedFormats.forEach((format) => {
    const srcSet = sizes
      .map((size) => {
        const formatSrc = convertToFormat(src, format.format);
        return `${formatSrc}?w=${size}&q=75 ${size}w`;
      })
      .join(", ");

    srcSets[format.format] = srcSet;
  });

  return srcSets;
};

// Convert source to different format
const convertToFormat = (src: string, format: string) => {
  if (src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  // For Next.js Image Optimization API
  const url = new URL(src, window.location.origin);
  url.searchParams.set("format", format);
  return url.toString();
};

// Generate responsive sizes
const generateResponsiveSizes = (breakpoints: { [key: string]: string }) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(", ");
};

export function ResponsiveImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality = 75,
  className = "",
  sizes,
  aspectRatio,
  blurDataURL,
  objectFit = "cover",
  loading = "lazy",
  onLoad,
  onError,
  fallbackType = "general",
}: ResponsiveImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formats, setFormats] = useState<ImageFormat[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  // Detect format support on mount
  useEffect(() => {
    detectFormatSupport().then(setFormats);
  }, []);

  // Generate responsive sizes if not provided
  const responsiveSizes =
    sizes ||
    generateResponsiveSizes({
      "640px": "100vw",
      "768px": "100vw",
      "1024px": "100vw",
      "1280px": "100vw",
    });

  // Standard responsive breakpoints
  const responsiveBreakpoints = [400, 600, 800, 1200, 1600];

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Generate blur placeholder if not provided
  const generateBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL;

    // Create simple blur placeholder
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect width="100%" height="100%" fill="url(#shimmer)"/>
        <defs>
          <linearGradient id="shimmer">
            <stop offset="0%" stop-color="rgba(255,255,255,0)" />
            <stop offset="50%" stop-color="rgba(255,255,255,0.1)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString("base64")}`;
  };

  // Render fallback image
  if (imageError) {
    const fallbackSrc = createImageFallback(fallbackType, width, height);

    return (
      <div className={`relative ${className}`} style={{ aspectRatio }}>
        <Image
          ref={imgRef}
          src={fallbackSrc}
          alt={`${alt} (fallback)`}
          width={width}
          height={height}
          className="object-cover"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  // Modern browsers with picture element for better format support
  if (
    formats.length > 0 &&
    (formats.some((f) => f.format === "webp" && f.supported) ||
      formats.some((f) => f.format === "avif" && f.supported))
  ) {
    const srcSets = generateSrcSet(src, formats, responsiveBreakpoints);

    return (
      <div className={`relative ${className}`} style={{ aspectRatio }}>
        <picture>
          {/* AVIF format (highest priority) */}
          {formats.find((f) => f.format === "avif")?.supported && (
            <source srcSet={srcSets["avif"]} sizes={responsiveSizes} type="image/avif" />
          )}

          {/* WebP format */}
          {formats.find((f) => f.format === "webp")?.supported && (
            <source srcSet={srcSets["webp"]} sizes={responsiveSizes} type="image/webp" />
          )}

          {/* Fallback to original format */}
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            sizes={responsiveSizes}
            placeholder="blur"
            blurDataURL={generateBlurPlaceholder()}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ objectFit }}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>

        {/* Loading indicator */}
        {!isLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      </div>
    );
  }

  // Fallback for older browsers
  return (
    <div className={`relative ${className}`} style={{ aspectRatio }}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={responsiveSizes}
        placeholder="blur"
        blurDataURL={generateBlurPlaceholder()}
        className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ objectFit }}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Loading indicator */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
    </div>
  );
}

// Hook for preloading images
export function useImagePreloader() {
  const preloadImage = (src: string, priority: "high" | "low" = "low") => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;

    if (priority === "high") {
      link.setAttribute("fetchpriority", "high");
    }

    document.head.appendChild(link);
  };

  const preloadImageSet = (images: Array<{ src: string; priority?: "high" | "low" }>) => {
    images.forEach(({ src, priority = "low" }) => {
      preloadImage(src, priority);
    });
  };

  return { preloadImage, preloadImageSet };
}

export default ResponsiveImage;
