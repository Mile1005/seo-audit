"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Code, AlertTriangle, CheckCircle, Copy, Check } from 'lucide-react';
import { AuditResultUnified } from '../../lib/types/audit';

interface Props { result: AuditResultUnified }
export const MetaTagsPanel = ({ result }: Props) => {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  
  const titleLength = result.pageData.title.length;
  const descLength = result.pageData.metaDescription.length;
  
  const copyToClipboard = (text: string, type: 'title' | 'desc') => {
    navigator.clipboard.writeText(text);
    if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    }
  };
  
  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 border-2 border-cyan-200 dark:border-cyan-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-cyan-900 dark:text-cyan-100">
          <div className="p-2 bg-cyan-500 rounded-lg">
            <Code className="h-5 w-5 text-white" />
          </div>
          SEO Meta Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {titleLength > 0 && titleLength <= 60 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                )}
              </motion.div>
              <Label className="text-base font-bold text-slate-900 dark:text-slate-100">
                Title Tag ({titleLength} characters)
              </Label>
            </div>
            {result.pageData.title && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(result.pageData.title, 'title')}
                className="p-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                title="Copy to clipboard"
              >
                {copiedTitle ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                )}
              </motion.button>
            )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border group-hover:bg-cyan-50/50 dark:group-hover:bg-cyan-900/10 transition-colors">
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
              {result.pageData.title || 'No title found'}
            </p>
          </div>
          {titleLength > 60 && (
            <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-700">
              <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                ⚠️ Title exceeds 60 characters - may be truncated in search results
              </p>
            </div>
          )}
          {titleLength === 0 && (
            <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700">
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                🔴 Missing title tag - critical for SEO
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {descLength > 0 && descLength <= 160 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                )}
              </motion.div>
              <Label className="text-base font-bold text-slate-900 dark:text-slate-100">
                Meta Description ({descLength} characters)
              </Label>
            </div>
            {result.pageData.metaDescription && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(result.pageData.metaDescription, 'desc')}
                className="p-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                title="Copy to clipboard"
              >
                {copiedDesc ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                )}
              </motion.button>
            )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border group-hover:bg-cyan-50/50 dark:group-hover:bg-cyan-900/10 transition-colors">
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
              {result.pageData.metaDescription || 'No meta description found'}
            </p>
          </div>
          {descLength > 160 && (
            <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-700">
              <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                ⚠️ Description exceeds 160 characters - may be truncated in search results
              </p>
            </div>
          )}
          {descLength === 0 && (
            <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700">
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                🔴 Missing meta description - important for click-through rates
              </p>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};
