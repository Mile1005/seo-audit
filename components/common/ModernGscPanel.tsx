"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ModernGscPanelProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  isConnecting: boolean;
  validationData: any;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function ModernGscPanel({
  isAuthenticated,
  isLoading,
  isConnecting,
  validationData,
  onConnect,
  onDisconnect
}: ModernGscPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-50" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-text-primary">Google Search Console</h3>
          </div>
          
          <motion.div
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              isAuthenticated 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isAuthenticated ? "Connected" : "Not Connected"}
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-8 leading-relaxed">
          Connect your Google Search Console to get search analytics data and insights for your audited pages.
        </p>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </motion.div>
        )}

        {/* Authenticated State */}
        {!isLoading && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 text-green-400">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <span className="font-medium">Successfully connected to Google Search Console</span>
            </div>

            {validationData && !validationData.hasProperties && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">No Properties Found</p>
                    <p className="text-yellow-300 text-sm">
                      {validationData.validationMessage || 'Connected, but this Google account has no Search Console properties. Add your site to GSC to see metrics.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <p className="text-text-secondary text-sm">
              Your audit results will now include search analytics data when available.
            </p>

            <motion.button
              onClick={onDisconnect}
              className="btn-secondary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Disconnect Google Search Console
            </motion.button>
          </motion.div>
        )}

        {/* Not Authenticated State */}
        {!isLoading && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 text-text-secondary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Connect to get search analytics insights</span>
            </div>

            <motion.button
              onClick={onConnect}
              disabled={isConnecting}
              className="btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isConnecting ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Connecting...
                </div>
              ) : (
                "Connect Google Search Console"
              )}
            </motion.button>

            <p className="text-text-secondary text-sm text-center">
              This will open Google&apos;s authentication page in a new window.
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-primary/20 rounded-full blur-xl" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-secondary/20 rounded-full blur-xl" />
    </motion.div>
  );
}
