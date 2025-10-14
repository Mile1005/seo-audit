"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

// Lightweight dropdown component with CSS transitions
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
    <div
      ref={dropdownRef}
      className={`absolute top-full left-0 mt-2 w-80 bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 py-3 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
      } before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-slate-800/20 before:to-slate-900/40 before:backdrop-blur-sm`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative block px-5 py-4 hover:bg-slate-800/30 transition-all duration-200 group rounded-lg mx-2 border border-transparent hover:border-slate-600/30 hover:shadow-lg backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="relative z-10 flex items-start space-x-3">
            {/* Feature Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {item.label === "SEO Audit" && (
                <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {item.label === "Competitor Analysis" && (
                <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
              {item.label === "Keyword Tracking" && (
                <svg className="w-5 h-5 text-green-400 group-hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              )}
              {item.label === "Site Crawler" && (
                <svg className="w-5 h-5 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              )}
              {item.label === "AI Assistant" && (
                <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">{item.label}</div>
              {item.description && (
                <div className="text-sm text-slate-300 group-hover:text-slate-200 mt-1 leading-relaxed">{item.description}</div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
      ))}
    </div>
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
        description: "Intelligent SEO recommendations and insights"
      }
    ]
  },
  {
    label: "Pricing",
    href: "/pricing"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact",
    href: "/contact"
  }
]

export function AdaptiveNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close dropdown on scroll (only on desktop, not when mobile menu is open)
  useEffect(() => {
    const handleScroll = () => {
      // Only close dropdown on scroll if we're on desktop (mobile menu is closed)
      if (openDropdown && !isOpen) {
        setOpenDropdown(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [openDropdown, isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Reset dropdown when closing menu
    if (isOpen) {
      setOpenDropdown(null)
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    setOpenDropdown(null)
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24 md:h-28 lg:h-32">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="AISEOTurbo Logo" 
                  width={500} 
                  height={133}
                  priority
                  className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 md:h-28 lg:h-32">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <Image 
                src="/logo.png" 
                alt="AISEOTurbo Logo" 
                width={500} 
                height={133}
                priority
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationData.map((section) => (
                <div key={section.label} className="relative">
                  {section.items ? (
                    <div 
                      className="relative"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() => toggleDropdown(section.label)}
                        onMouseEnter={() => setOpenDropdown(section.label)}
                        className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        {section.label}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          openDropdown === section.label ? 'rotate-180' : ''
                        }`} />
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="relative group text-white hover:text-blue-400 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-slate-600/50 hover:border-blue-400/70 backdrop-blur-sm hover:bg-slate-800/30 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span className="relative z-10">Log In</span>
            </Link>
            <Link
              href="/signup"
              className="relative group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/features/seo-audit"
              className="relative group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 border border-emerald-500/20"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free SEO Audit
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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

        {/* Mobile Menu - Fixed height to prevent layout shift */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`} style={{ minHeight: isOpen ? '200px' : '0px' }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/50 rounded-b-lg">
            {navigationData.map((section) => (
              <div key={section.label}>
                {section.items ? (
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleDropdown(section.label)
                      }}
                      className="text-slate-300 hover:text-white hover:bg-slate-800/50 block px-3 py-2 text-base font-medium w-full text-left transition-all duration-200 rounded-md flex items-center justify-between"
                    >
                      <span>{section.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        openDropdown === section.label ? 'rotate-180 text-blue-400' : 'text-slate-400'
                      }`} />
                    </button>
                    
                    <div className={`pl-4 transition-all duration-200 overflow-hidden ${
                      openDropdown === section.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`} style={{ minHeight: openDropdown === section.label ? '120px' : '0px' }}>
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
            
            {/* Mobile Auth Links */}
            <div className="pt-4 mt-4 border-t border-slate-700/50">
              <Link
                href="/login"
                className="relative group text-white hover:text-blue-400 block px-4 py-3 text-base font-semibold transition-all duration-300 border border-slate-600/50 hover:border-blue-400/70 rounded-lg mb-3 backdrop-blur-sm hover:bg-slate-800/30"
                onClick={closeMenu}
              >
                <span className="relative z-10">Log In</span>
              </Link>
              <Link
                href="/signup"
                className="relative group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 mb-3 border border-blue-500/20"
                onClick={closeMenu}
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/features/seo-audit"
                className="relative group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-emerald-600/25 border border-emerald-500/20"
                onClick={closeMenu}
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Free SEO Audit
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
