"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
// import { DesktopDropdown } from "./desktop-dropdown"

// Temporary inline dropdown component to fix TypeScript issues
interface DropdownItem {
  label: string
  href: string
  description?: string
}

interface DesktopDropdownProps {
  items: DropdownItem[]
  isOpen: boolean
  onClose: () => void
}

function DesktopDropdown({ items, isOpen, onClose }: DesktopDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
          onClick={onClose}
        >
          <div className="font-medium text-gray-900">{item.label}</div>
          {item.description && (
            <div className="text-sm text-gray-500 mt-1">{item.description}</div>
          )}
        </Link>
      ))}
    </motion.div>
  )
}

export interface NavigationItem {
  label: string
  href: string
  description?: string
}

export interface NavigationSection {
  label: string
  href?: string
  items?: NavigationItem[]
}

const navigationData: NavigationSection[] = [
  {
    label: "Features",
    items: [
      {
        label: "SEO Audit",
        href: "/features/seo-audit",
        description: "Comprehensive website analysis and recommendations"
      },
      {
        label: "Competitor Analysis",
        href: "/features/competitor-analysis",
        description: "Compare your performance against competitors"
      },
      {
        label: "Keyword Tracking",
        href: "/features/keyword-tracking",
        description: "Monitor rankings and search performance"
      },
      {
        label: "Site Crawler",
        href: "/features/site-crawler",
        description: "Deep technical SEO analysis and monitoring"
      },
      {
        label: "AI Assistant",
        href: "/features/ai-assistant",
        description: "Get personalized SEO recommendations"
      }
    ]
  },
  {
    label: "Pricing",
    href: "/pricing"
  },
  {
    label: "Case Studies",
    items: [
      {
        label: "E-commerce Success",
        href: "/case-studies/ecommerce",
        description: "How we helped increase organic traffic by 300%"
      },
      {
        label: "SaaS Growth",
        href: "/case-studies/saas",
        description: "B2B software company scales with SEO"
      },
      {
        label: "Local Business",
        href: "/case-studies/local",
        description: "Local SEO strategy drives foot traffic"
      }
    ]
  },
  {
    label: "Resources",
    items: [
      {
        label: "Blog",
        href: "/blog",
        description: "Latest SEO insights and strategies"
      },
      {
        label: "Documentation",
        href: "/docs",
        description: "Complete guides and API reference"
      },
      {
        label: "Help Center",
        href: "/help",
        description: "Get support and find answers"
      },
      {
        label: "Webinars",
        href: "/webinars",
        description: "Live SEO training and workshops"
      }
    ]
  }
]

export interface AdaptiveNavigationProps {
  className?: string
}

export function AdaptiveNavigation({ className = "" }: AdaptiveNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu focus trap
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      
      // Focus first focusable element
      const firstFocusable = mobileMenuRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // Small delay to prevent flicker
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg' 
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg px-2 py-1"
            >
              AISEOTurbo
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationData.map((section) => (
              <div 
                key={section.label}
                className="relative"
                onMouseEnter={() => section.items && handleDropdownEnter(section.label)}
                onMouseLeave={() => section.items && handleDropdownLeave()}
              >
                {section.href ? (
                  // Simple link
                  <Link
                    href={section.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg px-3 py-2"
                  >
                    {section.label}
                  </Link>
                ) : (
                  // Dropdown trigger
                  <button
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg px-3 py-2"
                    aria-expanded={activeDropdown === section.label}
                    aria-haspopup="true"
                  >
                    <span>{section.label}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === section.label ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                )}

                {/* Desktop Dropdown */}
                {section.items && (
                  <DesktopDropdown
                    items={section.items}
                    isOpen={activeDropdown === section.label}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg px-3 py-2"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-lg"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMobileMenuToggle}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="p-4 space-y-6">
                {navigationData.map((section) => (
                  <div key={section.label} className="space-y-3">
                    {section.href ? (
                      <Link
                        href={section.href}
                        onClick={closeMobileMenu}
                        className="block text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-3 py-2"
                      >
                        {section.label}
                      </Link>
                    ) : (
                      <>
                        <div className="text-lg font-semibold text-white px-3 py-2">
                          {section.label}
                        </div>
                        {section.items && (
                          <div className="space-y-1 ml-4">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="block group"
                              >
                                <div className="text-gray-300 group-hover:text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-3 py-2">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <div className="text-sm text-gray-500 group-hover:text-gray-400 px-3 pb-2">
                                    {item.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Section */}
                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 px-4 border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:border-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
