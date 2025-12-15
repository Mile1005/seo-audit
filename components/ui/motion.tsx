// Optimized framer-motion bundle - Only import what we need
// This prevents the entire framer-motion library from being bundled

// Core motion component (most commonly used)
export { motion } from "framer-motion";

// Animation utilities (lazy-loaded)
export const AnimatePresence = import("framer-motion").then((mod) => mod.AnimatePresence);
export const LazyMotion = import("framer-motion").then((mod) => mod.LazyMotion);
export const domAnimation = import("framer-motion").then((mod) => mod.domAnimation);

// Hooks (only if needed)
export const useAnimation = import("framer-motion").then((mod) => mod.useAnimation);
export const useMotionValue = import("framer-motion").then((mod) => mod.useMotionValue);
export const useSpring = import("framer-motion").then((mod) => mod.useSpring);
export const useTransform = import("framer-motion").then((mod) => mod.useTransform);

// Common animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
