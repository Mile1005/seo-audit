"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  showGrade?: boolean
  className?: string
}

export function ScoreRing({ score, size = 200, strokeWidth = 12, showGrade = true, className = '' }: ScoreRingProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981' // green
    if (score >= 50) return '#f59e0b' // amber
    return '#ef4444' // red
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  const scoreColor = getScoreColor(score)
  const grade = getScoreGrade(score)

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Animated score ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: mounted ? offset : circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          style={{
            filter: `drop-shadow(0 0 8px ${scoreColor}40)`
          }}
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
          className="text-center"
        >
          <div className="text-5xl font-bold" style={{ color: scoreColor }}>
            {score}
          </div>
          {showGrade && (
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
              Grade: {grade}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
