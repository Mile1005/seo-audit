"use client";

import { motion } from "framer-motion";

const floatingShapeVariants = {
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export function HeroFloatingElements() {
  return (
    <>
      <motion.div
        variants={floatingShapeVariants}
        animate="floating"
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingShapeVariants}
        animate="floating"
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
      />
    </>
  );
}
