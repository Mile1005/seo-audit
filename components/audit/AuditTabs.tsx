"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface AuditTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AuditTabs: React.FC<AuditTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="sticky top-0 z-40 mb-8">
      <div className="bg-gray-900/80 backdrop-blur-xl saturate-[180%] border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex gap-1 overflow-x-auto scrollbar-hide py-2"
            aria-label="Audit sections"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300",
                    "flex items-center gap-2",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {tab.icon && <span className="text-lg">{tab.icon}</span>}
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
