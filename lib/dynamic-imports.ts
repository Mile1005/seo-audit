"use client";

import { lazy, Suspense, ComponentType, ReactNode, createElement } from "react";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

interface DynamicImportOptions {
  fallback?: ReactNode;
  loading?: ReactNode;
  errorFallback?: ReactNode;
  enableLazyLoading?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Default loading component
 */
const DefaultLoading = () =>
  createElement(
    "div",
    {
      className: "flex items-center justify-center p-8",
    },
    createElement(
      "div",
      {
        className: "flex items-center space-x-2",
      },
      [
        createElement("div", {
          key: "spinner",
          className:
            "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        }),
        createElement("span", { key: "text" }, "Loading..."),
      ]
    )
  );

/**
 * Default fallback component
 */
const DefaultFallback = () =>
  createElement("div", {
    className: "animate-pulse bg-gray-200 rounded h-32 w-full",
  });

/**
 * Enhanced dynamic import with lazy loading and error boundaries
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
) {
  const {
    fallback = createElement(DefaultFallback),
    loading = createElement(DefaultLoading),
    errorFallback = createElement(
      "div",
      {
        className: "p-4 text-center text-destructive",
      },
      createElement("p", {}, "Failed to load component")
    ),
    enableLazyLoading = true,
    rootMargin = "100px 0px",
    threshold = 0.1,
  } = options;

  // Create lazy component
  const LazyComponent = lazy(importFn);

  // Return wrapped component
  const DynamicComponent = (props: any) => {
    const content = createElement(
      Suspense,
      { fallback: loading },
      createElement(LazyComponent, props)
    );

    // Wrap with lazy loading if enabled
    if (enableLazyLoading) {
      // eslint-disable-next-line react/no-children-prop
      return createElement(LazyWrapper, {
        fallback,
        rootMargin,
        threshold,
        fadeIn: true,
        children: content,
      });
    }

    return content;
  };

  // Add display name for debugging
  DynamicComponent.displayName = `Dynamic(Component)`;

  return DynamicComponent;
}

/**
 * Preload a dynamic component
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): Promise<{ default: T }> {
  return importFn();
}

/**
 * Create a route-based dynamic component
 */
export function createDynamicRoute<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  routeName: string
) {
  const routeLoading = () =>
    createElement(
      "div",
      {
        className: "flex items-center justify-center min-h-[400px]",
      },
      createElement(
        "div",
        {
          className: "text-center",
        },
        [
          createElement("div", {
            key: "spinner",
            className:
              "h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent mx-auto mb-2",
          }),
          createElement(
            "p",
            {
              key: "text",
              className: "text-sm text-muted-foreground",
            },
            `Loading ${routeName}...`
          ),
        ]
      )
    );

  return createDynamicComponent(importFn, {
    loading: createElement(routeLoading),
    enableLazyLoading: false, // Routes don't need intersection observer
  });
}

/**
 * Create a chart/visualization dynamic component
 */
export function createDynamicChart<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  const chartFallback = () =>
    createElement(
      "div",
      {
        className:
          "h-64 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse flex items-center justify-center",
      },
      createElement(
        "div",
        {
          className: "text-center",
        },
        [
          createElement("div", {
            key: "spinner",
            className:
              "h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent mx-auto mb-2",
          }),
          createElement(
            "p",
            {
              key: "text",
              className: "text-sm text-gray-600",
            },
            "Loading chart..."
          ),
        ]
      )
    );

  return createDynamicComponent(importFn, {
    fallback: createElement(chartFallback),
    loading: null, // Use fallback instead
    enableLazyLoading: true,
    rootMargin: "200px 0px", // Load charts earlier
  });
}

/**
 * Performance-aware dynamic import with resource hints
 */
export function createOptimizedDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  priority: "high" | "medium" | "low" = "medium"
) {
  // Add resource hints based on priority
  if (typeof window !== "undefined" && priority === "high") {
    // Preload high-priority components
    setTimeout(() => {
      importFn().catch(() => {
        // Silently handle preload failures
      });
    }, 100);
  }

  return createDynamicComponent(importFn, {
    enableLazyLoading: priority !== "high",
    rootMargin: priority === "high" ? "300px 0px" : "100px 0px",
  });
}

/**
 * Bundle-aware dynamic import for large dependencies
 */
export function createBundleOptimizedComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  bundleName: string
) {
  const bundleLoading = () =>
    createElement(
      "div",
      {
        className: "flex items-center justify-center p-8",
      },
      createElement(
        "div",
        {
          className: "text-center",
        },
        [
          createElement("div", {
            key: "spinner",
            className:
              "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mx-auto mb-2",
          }),
          createElement(
            "p",
            {
              key: "text",
              className: "text-xs text-muted-foreground",
            },
            `Loading ${bundleName}...`
          ),
        ]
      )
    );

  const component = createDynamicComponent(importFn, {
    loading: createElement(bundleLoading),
  });

  // Track bundle loading performance
  if (typeof window !== "undefined" && "performance" in window) {
    const startTime = performance.now();
    importFn().then(() => {
      const loadTime = performance.now() - startTime;

      // Report to analytics if available
      if ("gtag" in window) {
        // @ts-ignore
        window.gtag("event", "bundle_load", {
          bundle_name: bundleName,
          load_time: Math.round(loadTime),
        });
      }
    });
  }

  return component;
}
