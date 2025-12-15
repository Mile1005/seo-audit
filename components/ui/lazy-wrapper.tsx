"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  fadeIn?: boolean;
  slideIn?: boolean;
  animationDuration?: number;
}

/**
 * Universal lazy loading wrapper using Intersection Observer
 * Can wrap any component for lazy loading with animation options
 */
export function LazyWrapper({
  children,
  fallback = null,
  className,
  rootMargin = "100px",
  threshold = 0.1,
  triggerOnce = true,
  fadeIn = false,
  slideIn = false,
  animationDuration = 300,
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [rootMargin, threshold, triggerOnce]);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const baseClasses = cn("transition-all ease-out", className);

  const animationClasses = cn({
    [`duration-${animationDuration}`]: fadeIn || slideIn,
    "opacity-0": fadeIn && !isVisible,
    "opacity-100": fadeIn && isVisible,
    "translate-y-4": slideIn && !isVisible,
    "translate-y-0": slideIn && isVisible,
  });

  const combinedClasses = cn(baseClasses, animationClasses);

  return (
    <div ref={elementRef} className={combinedClasses}>
      {isVisible ? children : fallback}
    </div>
  );
}
