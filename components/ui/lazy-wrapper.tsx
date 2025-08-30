'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
  rootMargin = '50px 0px',
  threshold = 0.1,
  triggerOnce = true,
  fadeIn = true,
  slideIn = false,
  animationDuration = 300,
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            if (triggerOnce) {
              observer.unobserve(element);
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

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, triggerOnce]);

  // Handle animation completion
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, animationDuration]);

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${animationDuration} ease-out`;
    
    if (!isVisible) {
      const hiddenClasses = [];
      if (fadeIn) hiddenClasses.push('opacity-0');
      if (slideIn) hiddenClasses.push('translate-y-8');
      return cn(baseClasses, hiddenClasses.join(' '));
    }
    
    const visibleClasses = [];
    if (fadeIn) visibleClasses.push('opacity-100');
    if (slideIn) visibleClasses.push('translate-y-0');
    return cn(baseClasses, visibleClasses.join(' '));
  };

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClasses(), className)}
    >
      {isVisible ? children : fallback}
    </div>
  );
}

/**
 * Lazy loading section wrapper
 */
export function LazySection({
  children,
  className,
  ...props
}: LazyWrapperProps) {
  return (
    <LazyWrapper
      className={cn('w-full', className)}
      fadeIn
      slideIn
      animationDuration={500}
      {...props}
    >
      {children}
    </LazyWrapper>
  );
}

/**
 * Lazy loading card wrapper
 */
export function LazyCard({
  children,
  className,
  ...props
}: LazyWrapperProps) {
  return (
    <LazyWrapper
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      fadeIn
      slideIn
      animationDuration={300}
      {...props}
    >
      {children}
    </LazyWrapper>
  );
}

/**
 * Performance-optimized lazy loading for heavy components
 */
export function LazyComponent({
  children,
  loadingComponent,
  errorComponent,
  className,
  onLoad,
  onError,
  ...props
}: LazyWrapperProps & {
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}) {
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  const handleVisibilityChange = (visible: boolean) => {
    if (visible && loadState === 'idle') {
      setLoadState('loading');
      
      // Simulate component loading (replace with actual async loading logic)
      setTimeout(() => {
        try {
          setLoadState('loaded');
          onLoad?.();
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Failed to load component');
          setError(error);
          setLoadState('error');
          onError?.(error);
        }
      }, 100);
    }
  };

  if (loadState === 'error') {
    return (
      <div className={cn('p-4 text-center text-destructive', className)}>
        {errorComponent || <p>Failed to load component: {error?.message}</p>}
      </div>
    );
  }

  if (loadState === 'loading') {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        {loadingComponent || (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <LazyWrapper
      className={className}
      {...props}
    >
      <div onLoad={() => handleVisibilityChange(true)}>
        {children}
      </div>
    </LazyWrapper>
  );
}

/**
 * Intersection Observer hook for custom implementations
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}
