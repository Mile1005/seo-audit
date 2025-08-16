"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ModernResultsCardProps {
  title: string;
  value: string | number;
  description?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  className?: string;
}

export default function ModernResultsCard({
  title,
  value,
  description,
  status = 'info',
  icon,
  className = ''
}: ModernResultsCardProps) {
  const statusColors = {
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-blue-500 to-cyan-500'
  };

  const statusTextColors = {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`glass-card p-6 relative overflow-hidden group ${className}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          {icon && (
            <motion.div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${statusColors[status]} flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div
          className={`text-3xl font-bold ${statusTextColors[status]} mb-2`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {value}
        </motion.div>

        {/* Description */}
        {description && (
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Floating Elements */}
      <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${statusColors[status]} rounded-full blur-xl opacity-20`} />
    </motion.div>
  );
}
