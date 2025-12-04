"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { AnimatedAuditVisualization } from './animated-audit-visualization'
import { LiteAuditResults } from './lite-audit-results'
import { normalizeUrl } from '@/lib/url/normalize'

export function HomepageAuditSearch() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const normalized = normalizeUrl(url.trim())
    if (!normalized) {
      setError('Please enter a valid URL (e.g., example.com, www.example.com, or https://example.com)')
      return
    }

    setError(null)
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch('/api/seo-audit/lite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to analyze website' }))
        throw new Error(errorData.error || 'Failed to analyze website')
      }

      const data = await response.json()
      if (!data.score || !data.stats) {
        throw new Error('Invalid response from server')
      }
      setResults(data)
    } catch (err) {
      console.error('Audit error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleViewFull = () => {
    window.location.href = '/dashboard'
  }

  const handleRunAnother = () => {
    setUrl('')
    setResults(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {!results && !loading && (
          <motion.div
            key="search-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    if (error) setError(null)
                  }}
                  className="flex-1 h-14 text-lg px-6 bg-white dark:bg-slate-800 border-2"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !url.trim()}
                  className="h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Analyzing...</>
                  ) : (
                    <><Search className="w-5 h-5 mr-2" />Analyze Now</>
                  )}
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </form>
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatedAuditVisualization />
          </motion.div>
        )}

        {results && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LiteAuditResults
              results={results}
              onViewFull={handleViewFull}
              onRunAnother={handleRunAnother}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
