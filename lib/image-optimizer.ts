/**
 * Advanced Image Optimization Utilities
 * Handles AVIF/WebP conversion, responsive sizing, and blur placeholders
 */

interface ImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

interface OptimizedImageConfig {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  className?: string;
  fill?: boolean;
  loading?: "lazy" | "eager";
}

/**
 * Generate responsive image sizes string
 */
export function generateResponsiveSizes(breakpoints: Partial<ImageSizes> = {}): string {
  const defaultSizes: ImageSizes = {
    mobile: "100vw",
    tablet: "80vw",
    desktop: "60vw",
    wide: "50vw",
    ...breakpoints,
  };

  return `(max-width: 640px) ${defaultSizes.mobile}, (max-width: 1024px) ${defaultSizes.tablet}, (max-width: 1536px) ${defaultSizes.desktop}, ${defaultSizes.wide}`;
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurDataURL(width: number = 8, height: number = 6): string {
  // Create a minimal SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate optimized image configuration
 */
export function createOptimizedImageConfig(config: OptimizedImageConfig): OptimizedImageConfig {
  const optimized: OptimizedImageConfig = {
    ...config,
    quality: config.quality || 85,
    placeholder: config.placeholder || "blur",
    loading: config.loading || (config.priority ? "eager" : "lazy"),
  };

  // Auto-generate blur placeholder if not provided
  if (optimized.placeholder === "blur" && !optimized.blurDataURL) {
    optimized.blurDataURL = generateBlurDataURL();
  }

  // Auto-generate sizes if not provided and not using fill
  if (!optimized.sizes && !optimized.fill) {
    optimized.sizes = generateResponsiveSizes();
  }

  return optimized;
}

/**
 * Image format utilities
 */
export const ImageFormats = {
  /**
   * Check if browser supports AVIF
   */
  supportsAVIF(): boolean {
    if (typeof window === "undefined") return false;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
  },

  /**
   * Check if browser supports WebP
   */
  supportsWebP(): boolean {
    if (typeof window === "undefined") return false;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  },

  /**
   * Get optimal image format for current browser
   */
  getOptimalFormat(): "avif" | "webp" | "jpg" {
    if (this.supportsAVIF()) return "avif";
    if (this.supportsWebP()) return "webp";
    return "jpg";
  },
};

/**
 * Performance monitoring for images
 */
export class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics: Map<string, { startTime: number; endTime?: number; size?: number }> = new Map();

  static getInstance(): ImagePerformanceMonitor {
    if (!this.instance) {
      this.instance = new ImagePerformanceMonitor();
    }
    return this.instance;
  }

  startImageLoad(src: string): void {
    this.metrics.set(src, { startTime: performance.now() });
  }

  endImageLoad(src: string, size?: number): void {
    const metric = this.metrics.get(src);
    if (metric) {
      metric.endTime = performance.now();
      if (size) metric.size = size;
    }
  }

  getImageMetrics(src: string) {
    const metric = this.metrics.get(src);
    if (!metric || !metric.endTime) return null;

    return {
      loadTime: metric.endTime - metric.startTime,
      size: metric.size,
      efficiency: metric.size ? metric.size / (metric.endTime - metric.startTime) : null,
    };
  }

  getAllMetrics() {
    const results: Array<{ src: string; loadTime: number; size?: number; efficiency?: number }> =
      [];

    this.metrics.forEach((metric, src) => {
      if (metric.endTime) {
        results.push({
          src,
          loadTime: metric.endTime - metric.startTime,
          size: metric.size,
          efficiency: metric.size ? metric.size / (metric.endTime - metric.startTime) : undefined,
        });
      }
    });

    return results;
  }

  /**
   * Report metrics to analytics
   */
  reportMetrics() {
    const metrics = this.getAllMetrics();

    // Report to your analytics service
    if (typeof window !== "undefined" && "gtag" in window) {
      metrics.forEach((metric) => {
        // @ts-ignore
        window.gtag("event", "image_performance", {
          custom_parameter_1: metric.src,
          custom_parameter_2: metric.loadTime,
          custom_parameter_3: metric.size || 0,
        });
      });
    }
  }
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(images: string[]): void {
  if (typeof window === "undefined") return;

  images.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading(selector: string = "img[data-lazy]"): void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.lazy;

          if (src) {
            img.src = src;
            img.removeAttribute("data-lazy");
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "50px 0px", // Start loading 50px before entering viewport
      threshold: 0.01,
    }
  );

  document.querySelectorAll(selector).forEach((img) => {
    imageObserver.observe(img);
  });
}
