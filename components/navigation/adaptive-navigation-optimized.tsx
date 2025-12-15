"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

// Lightweight dropdown component with CSS transitions
interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DesktopDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

function DesktopDropdown({ items, isOpen, onClose }: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 transition-all duration-200 ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
          onClick={onClose}
        >
          <div className="font-medium text-gray-900">{item.label}</div>
          {item.description && <div className="text-sm text-gray-500 mt-1">{item.description}</div>}
        </Link>
      ))}
    </div>
  );
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationSection {
  label: string;
  href?: string;
  items?: NavigationItem[];
}

const navigationData: NavigationSection[] = [
  {
    label: "Features",
    items: [
      {
        label: "SEO Audit",
        href: "/features/seo-audit",
        description: "Comprehensive website analysis and recommendations",
      },
      {
        label: "Competitor Analysis",
        href: "/features/competitor-analysis",
        description: "Compare your performance against competitors",
      },
      {
        label: "Keyword Tracking",
        href: "/features/keyword-tracking",
        description: "Monitor rankings and search performance",
      },
      {
        label: "Site Crawler",
        href: "/features/site-crawler",
        description: "Deep technical SEO analysis and monitoring",
      },
      {
        label: "AI Assistant",
        href: "/features/ai-assistant",
        description: "Intelligent SEO recommendations and insights",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function AdaptiveNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white">
                AI SEO Turbo
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
            >
              AI SEO Turbo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationData.map((section) => (
                <div key={section.label} className="relative">
                  {section.items ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(section.label)}
                        onMouseEnter={() => setOpenDropdown(section.label)}
                        className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        {section.label}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            openDropdown === section.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <DesktopDropdown
                        items={section.items}
                        isOpen={openDropdown === section.label}
                        onClose={() => setOpenDropdown(null)}
                      />
                    </div>
                  ) : (
                    <Link
                      href={section.href!}
                      className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      {section.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/features/seo-audit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Free SEO Audit
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/50 rounded-b-lg">
            {navigationData.map((section) => (
              <div key={section.label}>
                {section.items ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(section.label)}
                      className="text-slate-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
                    >
                      {section.label}
                      <ChevronDown
                        className={`inline ml-1 h-4 w-4 transition-transform duration-200 ${
                          openDropdown === section.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`pl-4 transition-all duration-200 overflow-hidden ${
                        openDropdown === section.label
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-slate-400 hover:text-white block px-3 py-2 text-sm transition-colors duration-200"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={section.href!}
                    className="text-slate-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {section.label}
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="/features/seo-audit"
              className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium mt-4 transition-colors duration-200"
              onClick={closeMenu}
            >
              Free SEO Audit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
