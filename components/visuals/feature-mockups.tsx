"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react"
import { useTranslations } from 'next-intl'

export interface FeatureMockup {
  id: string
  titleKey: string
  descriptionKey: string
  imageSrc: string
  imageAltKey: string
  category: 'desktop' | 'mobile' | 'report'
}

export interface FeatureMockupsProps {
  mockups?: FeatureMockup[]
  className?: string
}

const defaultMockups: FeatureMockup[] = [
  {
    id: 'competitor-analysis',
    titleKey: 'home.images.features.competitorAnalysis.title',
    descriptionKey: 'home.images.features.competitorAnalysis.description',
    imageSrc: '/images/features/competitor-analysis-desktop.webp',
    imageAltKey: 'home.images.competitorAnalysis',
    category: 'desktop'
  },
  {
    id: 'pdf-reports',
    titleKey: 'home.images.features.pdfReports.title',
    descriptionKey: 'home.images.features.pdfReports.description',
    imageSrc: '/images/features/pdf-report-generation.webp',
    imageAltKey: 'home.images.pdfReport',
    category: 'report'
  },
  {
    id: 'ai-chat',
    titleKey: 'home.images.features.aiChat.title',
    descriptionKey: 'home.images.features.aiChat.description',
    imageSrc: '/images/features/ai-chat-interface.webp',
    imageAltKey: 'home.images.aiChat',
    category: 'desktop'
  },
  {
    id: 'team-collaboration',
    titleKey: 'home.images.features.teamCollaboration.title',
    descriptionKey: 'home.images.features.teamCollaboration.description',
    imageSrc: '/images/features/team-collaboration-dashboard.webp',
    imageAltKey: 'home.images.teamCollaboration',
    category: 'desktop'
  }
]

export function FeatureMockups({ 
  mockups = defaultMockups, 
  className = "" 
}: FeatureMockupsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  // Handle escape key for lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedIndex !== null) {
        setSelectedIndex(null)
      }
    }

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (selectedIndex !== null) {
      if (isLeftSwipe && selectedIndex < mockups.length - 1) {
        setSelectedIndex(selectedIndex + 1)
      }
      if (isRightSwipe && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
      }
    }
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < mockups.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox()
    }
  }

  const getCategoryIcon = (category: FeatureMockup['category']) => {
    switch (category) {
      case 'desktop': return '🖥️'
      case 'mobile': return '📱'
      case 'report': return '📄'
      default: return '🖼️'
    }
  }

  return (
    <div className={className}>
      {/* Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockups.map((mockup, index) => (
          <motion.div
            key={mockup.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                <span>{getCategoryIcon(mockup.category)}</span>
                <span className="capitalize">{mockup.category}</span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 z-10 bg-white/90 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* TODO: Replace with actual feature mockup images */}
                <Image
                  src={mockup.imageSrc}
                  alt={t(mockup.imageAltKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={() => {
                    console.log(`Feature mockup image failed to load: ${mockup.imageSrc}`)
                  }}
                />
                
                {/* Fallback content */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="text-center text-white p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg">{getCategoryIcon(mockup.category)}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{t(mockup.titleKey)}</h4>
                    <p className="text-xs text-gray-400 mb-2">{t(mockup.descriptionKey)}</p>
                    <div className="text-xs text-purple-400">
                      TODO: {mockup.imageSrc.split('/').pop()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t(mockup.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {t(mockup.descriptionKey)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              ref={lightboxRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(mockups[selectedIndex].category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {t(mockups[selectedIndex].titleKey)}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectedIndex + 1} of {mockups.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* TODO: Add download functionality when final assets are ready */}
                  <button
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                    aria-label="Download image"
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  <button
                    onClick={closeLightbox}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative flex-1 p-4">
                <div className="relative w-full h-[60vh] max-h-[600px]">
                  <Image
                    src={mockups[selectedIndex].imageSrc}
                    alt={t(mockups[selectedIndex].imageAltKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-contain"
                    priority
                    onError={() => {
                      console.log(`Lightbox image failed to load: ${mockups[selectedIndex].imageSrc}`)
                    }}
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedIndex > 0 && (
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {selectedIndex < mockups.length - 1 && (
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="p-4 border-t border-slate-700/50">
                <p className="text-gray-300 leading-relaxed">
                  {t(mockups[selectedIndex].descriptionKey)}
                </p>
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="md:hidden flex justify-center space-x-2 p-4">
                {mockups.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === selectedIndex ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
