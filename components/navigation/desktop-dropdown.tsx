"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface DesktopDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function DesktopDropdown({ items, isOpen, onClose }: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      const focusableElements = dropdownRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (!focusableElements || focusableElements.length === 0) return;

      const currentIndex = Array.from(focusableElements).findIndex(
        (el) => el === document.activeElement
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        focusableElements[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        focusableElements[prevIndex]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-xl shadow-2xl z-50 overflow-hidden"
          onMouseEnter={() => {}} // Prevent close on hover
        >
          <div className="p-2">
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-start p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-medium group-hover:text-purple-300 transition-colors duration-200">
                        {item.label}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                    </div>
                    {item.description && (
                      <div className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-200 line-clamp-2">
                        {item.description}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom gradient for visual polish */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
