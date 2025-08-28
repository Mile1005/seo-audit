"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube
} from "lucide-react"

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "SEO Audit", href: "/seo-audit" },
      { label: "Competitor Analysis", href: "/features" },
      { label: "Rank Tracker", href: "/rank-tracker" },
      { label: "Site Crawler", href: "/site-crawler" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Webinars", href: "/webinars" }
    ]
  }
]

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/aiseoturbo", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/aiseoturbo", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/aiseoturbo", icon: Github },
  { name: "YouTube", href: "https://youtube.com/aiseoturbo", icon: Youtube }
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                <Link 
                  href="/" 
                  className="text-3xl font-bold text-white hover:text-purple-400 transition-colors duration-200"
                >
                  AISEOTurbo
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
            <p className="text-gray-400 text-sm">
              © 2025 AISEOTurbo. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
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