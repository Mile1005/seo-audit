"use client";
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card'
import { Badge } from '../ui/badge'
import { AuditResultUnified } from '@/lib/types/audit'
import { Code, ListOrdered, Table, Link as LinkIcon, BarChart3, Clock, FileText, Zap } from 'lucide-react'

interface StructuredDataPanelProps {
  result: AuditResultUnified
}

export function StructuredDataPanel({ result }: StructuredDataPanelProps) {
  const stats = result.comprehensiveResults.stats
  const jsonTypes = result.comprehensiveResults.json_ld_types || []
  const internal = stats.internal_links
  const external = stats.external_links
  const linkTotal = internal + external
  const internalRatio = linkTotal ? ((internal / linkTotal) * 100).toFixed(1) : '0'
  const imagesWithAlt = stats.images_count - (result.pageData.imagesWithoutAlt || 0)
  const altCoverage = stats.images_count ? ((imagesWithAlt / stats.images_count) * 100).toFixed(1) : '0'

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border-2 border-emerald-200 dark:border-emerald-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-3 text-emerald-900 dark:text-emerald-100">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Code className="h-5 w-5 text-white" />
          </div>
          Structured & Content Analysis
        </CardTitle>
        <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
          Schema markup, link distribution, media accessibility & content structure analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <LinkIcon className="h-5 w-5 text-blue-500" />
              </motion.div>
              Link Distribution
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Internal:</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{internal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">External:</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{external}</span>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                <div className="text-sm text-blue-800 dark:text-blue-200 font-medium text-center">
                  {internalRatio}% internal ratio
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Table className="h-5 w-5 text-purple-500" />
              </motion.div>
              Content Structure
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Tables:</span>
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.tables_count ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Lists:</span>
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.lists_count ?? 0}</span>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                <div className="text-sm text-purple-800 dark:text-purple-200 font-medium text-center">
                  {stats.word_count.toLocaleString()} words
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-green-400 dark:hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <ListOrdered className="h-5 w-5 text-green-500" />
              </motion.div>
              Image Accessibility
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">With Alt:</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">{imagesWithAlt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Total:</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">{stats.images_count}</span>
              </div>
              <div className={`p-2 rounded ${
                parseFloat(altCoverage) >= 90 ? 'bg-green-100 dark:bg-green-900/20' : 
                parseFloat(altCoverage) >= 70 ? 'bg-yellow-100 dark:bg-yellow-900/20' : 
                'bg-red-100 dark:bg-red-900/20'
              }`}>
                <div className={`text-sm font-medium text-center ${
                  parseFloat(altCoverage) >= 90 ? 'text-green-800 dark:text-green-200' : 
                  parseFloat(altCoverage) >= 70 ? 'text-yellow-800 dark:text-yellow-200' : 
                  'text-red-800 dark:text-red-200'
                }`}>
                  {altCoverage}% coverage
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <h4 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Code className="h-5 w-5 text-emerald-500" />
            JSON-LD Schema Types ({jsonTypes.length})
          </h4>
          {jsonTypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {jsonTypes.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700 cursor-pointer">
                    {t}
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ No JSON-LD structured data detected - consider adding schema markup for better SEO
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">Reading Time</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.reading_time_min || 0} min</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">Word Count</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">{stats.word_count.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">Text Ratio</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{(stats.text_rate * 100).toFixed(1)}%</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">Scripts</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{stats.scripts_count}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
