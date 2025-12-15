"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  size = "md",
  label,
  showLabel = true,
  animated = true,
}) => {
  const sizes = {
    sm: { container: "w-16 h-16", text: "text-lg", strokeWidth: 4 },
    md: { container: "w-24 h-24", text: "text-2xl", strokeWidth: 5 },
    lg: { container: "w-32 h-32", text: "text-3xl", strokeWidth: 6 },
    xl: { container: "w-40 h-40", text: "text-4xl", strokeWidth: 7 },
  };

  const normalizedScore = useMemo(() => {
    if (Number.isNaN(score)) return 0;
    return Math.min(100, Math.max(0, score));
  }, [score]);

  const getScoreColor = (value: number) => {
    if (value >= 90) return "stroke-emerald-400";
    if (value >= 70) return "stroke-sky-400";
    if (value >= 50) return "stroke-amber-400";
    return "stroke-rose-400";
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Smooth mount animation without requiring external animation libs.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!animated) return;
    const id = window.requestAnimationFrame(() => setIsMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, [animated]);

  const resolvedDashOffset = animated
    ? isMounted
      ? strokeDashoffset
      : circumference
    : strokeDashoffset;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("relative", sizes[size].container)}>
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90" aria-hidden="true">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-white/10"
            strokeWidth={sizes[size].strokeWidth}
            fill="none"
          />
          {/* Score Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className={cn(
              getScoreColor(normalizedScore),
              "transition-all duration-1000"
            )}
            strokeWidth={sizes[size].strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={resolvedDashOffset}
            strokeLinecap="round"
            style={{
              transition: animated ? "stroke-dashoffset 1s ease-in-out" : "none",
            }}
          />
        </svg>
        {/* Score Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold text-white", sizes[size].text)}>{normalizedScore}</span>
        </div>
      </div>
      {showLabel && label && <span className="text-sm font-medium text-white/60">{label}</span>}
    </div>
  );
};
