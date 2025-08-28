"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { type Testimonial } from "../../data/testimonials"

interface TestimonialCardProps {
  testimonial: Testimonial
  isActive?: boolean
}

export function TestimonialCard({ testimonial, isActive = false }: TestimonialCardProps) {
  const {
    name,
    title,
    company,
    companyLogo,
    avatar,
    rating,
    quote,
    metric
  } = testimonial

  return (
    <motion.div
      layout
      className={`
        relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 
        backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 lg:p-8
        transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-800/60
        ${isActive ? 'ring-2 ring-purple-500/20 border-purple-500/30' : ''}
      `}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-8 h-8 text-purple-400" />
      </div>

      {/* Star Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">
          {rating}.0
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-200 text-lg leading-relaxed mb-6">
        "{quote}"
      </blockquote>

      {/* Metric Highlight */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {metric.value}
            </div>
            <div className="text-sm text-gray-400">
              {metric.description}
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-xl">📈</span>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-0.5">
            <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
              {/* Placeholder for avatar - using initials */}
              <span className="text-white font-semibold text-sm">
                {name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">
            {name}
          </div>
          <div className="text-gray-400 text-sm">
            {title}
          </div>
        </div>

        {/* Company Logo Placeholder */}
        <div className="text-right">
          <div className="w-8 h-8 bg-slate-700/50 rounded border border-slate-600/50 flex items-center justify-center">
            <span className="text-xs text-gray-400 font-bold">
              {company.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1 max-w-[80px] truncate">
            {company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
