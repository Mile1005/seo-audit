"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "interactive";
  noPadding?: boolean;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = "default",
  noPadding = false,
  hover = false,
}) => {
  const variants = {
    default: "bg-white/5 border-white/10",
    elevated: "bg-white/8 border-white/15",
    interactive:
      "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 transition-all duration-300",
  };

  return (
    <div
      className={cn(
        "rounded-xl border backdrop-blur-xl saturate-[180%]",
        "shadow-[0_8px_24px_0_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        hover &&
          "hover:shadow-[0_12px_32px_0_rgba(0,0,0,0.34),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        !noPadding && "p-6",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
