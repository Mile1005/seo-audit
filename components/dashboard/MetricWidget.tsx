'use client'

import { ReactNode } from 'react'
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface MetricWidgetProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
    period: string
  }
  icon: ReactNode
  description?: string
  loading?: boolean
  className?: string
  children?: ReactNode
}

export function MetricWidget({
  title,
  value,
  change,
  icon,
  description,
  loading = false,
  className,
  children
}: MetricWidgetProps) {
  if (loading) {
    return (
      <div className={cn(
        "bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6",
        className
      )}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-200",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center">
          {title}
          {description && (
            <div className="group relative ml-2">
              <InformationCircleIcon className="w-4 h-4 text-slate-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {description}
              </div>
            </div>
          )}
        </h3>
        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {value}
        </div>
        
        {/* Change indicator */}
        {change && (
          <div className="flex items-center">
            <div className={cn(
              "flex items-center text-sm font-medium mr-2",
              change.type === 'increase' && "text-emerald-600",
              change.type === 'decrease' && "text-red-600",
              change.type === 'neutral' && "text-slate-500"
            )}>
              {change.type === 'increase' && (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              )}
              {change.type === 'decrease' && (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              {Math.abs(change.value)}%
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              vs {change.period}
            </span>
          </div>
        )}
      </div>

      {/* Additional content */}
      {children && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          {children}
        </div>
      )}
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max: number
  color?: 'blue' | 'green' | 'red' | 'yellow'
  showLabel?: boolean
  label?: string
}

export function ProgressBar({ 
  value, 
  max, 
  color = 'blue', 
  showLabel = false,
  label 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  }
  
  const backgroundClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    green: 'bg-emerald-100 dark:bg-emerald-900/20',
    red: 'bg-red-100 dark:bg-red-900/20',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/20'
  }

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            {label || 'Progress'}
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            {value}/{max}
          </span>
        </div>
      )}
      <div className={cn(
        "w-full h-2 rounded-full overflow-hidden",
        backgroundClasses[color]
      )}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info'
  children: ReactNode
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, children, size = 'md' }: StatusBadgeProps) {
  const statusClasses = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full",
      statusClasses[status],
      sizeClasses[size]
    )}>
      {children}
    </span>
  )
}

interface SparklineProps {
  data: number[]
  color?: 'blue' | 'green' | 'red'
  height?: number
}

export function Sparkline({ data, color = 'blue', height = 40 }: SparklineProps) {
  if (!data || data.length === 0) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  const colorClasses = {
    blue: 'stroke-blue-500',
    green: 'stroke-emerald-500',
    red: 'stroke-red-500'
  }

  return (
    <div className="w-full" style={{ height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <polyline
          points={points}
          fill="none"
          className={cn("stroke-2", colorClasses[color])}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
