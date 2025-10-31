"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube
} from "lucide-react"
import { PrivacyPreferencesLink } from "@/components/privacy/privacy-preferences"

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "SEO Audit", href: "/features/seo-audit" },
      { label: "Competitor Analysis", href: "/features/competitor-analysis" },
      { label: "Site Crawler", href: "/features/site-crawler" },
      { label: "AI Assistant", href: "/features/ai-assistant" },
      { label: "Keyword Tracking", href: "/features/keyword-tracking" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Case Studies", href: "/case-studies" },
    
    ]
  },
  {
    title: "Contact",
    links: [
      { label: "Support", href: "mailto:support@aiseoturbo.com" },
      { label: "Sales", href: "mailto:sales@aiseoturbo.com" },
      { label: "Billing", href: "mailto:billing@aiseoturbo.com" }
    ]
  }
]

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/aiseoturbo", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/aiseoturbo", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/aiseoturbo", icon: Github }
  // YouTube channel will be added when available
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                <Link 
                  href="/" 
                  className="flex items-center hover:opacity-80 transition-opacity duration-200"
                >
                  <Image 
                    src="/logo.png" 
                    alt="AISEOTurbo Logo" 
                    width={200} 
                    height={53}
                    className="h-16 sm:h-20 md:h-24 w-auto"
                    style={{ width: 'auto' }}
                  />
                </Link>
              </motion.div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Supercharge your SEO with AI-powered insights, comprehensive audits, and data-driven recommendations that drive real results.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-400 text-sm mb-2">
                Supercharge your SEO with AI-powered insights, comprehensive audits, and data-driven recommendations from <span className="font-semibold">AI SEO Turbo</span> that drive real results.
              </p>
              <p className="text-gray-400 text-sm">
                © 2025 AI SEO Turbo. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm py-2 px-1 min-h-[44px] min-w-[44px] flex items-center">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm py-2 px-1 min-h-[44px] min-w-[44px] flex items-center">
                Terms of Service
              </Link>
              <PrivacyPreferencesLink />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Spacer to prevent sticky audit bar from overlapping footer on long pages
export function BottomSpacer() {
  return <div className="h-24" />
}