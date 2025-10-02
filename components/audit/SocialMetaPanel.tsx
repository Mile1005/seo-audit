"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Link as LinkIcon, CheckCircle, XCircle, Copy, Check } from 'lucide-react';
import { ComprehensiveResults } from '../../lib/types/audit';

interface Props { social: ComprehensiveResults['social_meta'] }
export const SocialMetaPanel = ({ social }: Props) => {
  const entries = [
    ['og:title', social.og_title],
    ['og:description', social.og_description], 
    ['og:image', social.og_image],
    ['twitter:card', social.twitter_card],
    ['twitter:title', social.twitter_title],
    ['twitter:description', social.twitter_description]
  ];
  const openGraphComplete = entries.slice(0, 3).every(([_, v]) => v);
  const twitterComplete = entries.slice(3).every(([_, v]) => v);
  
  return (
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-slate-900 dark:text-white">
          <div className="p-2 bg-purple-600 rounded-lg">
            <LinkIcon className="h-5 w-5 text-white" />
          </div>
          Social Media Meta Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Open Graph Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.597 0 0 .596 0 1.326v21.348C0 23.404.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.404 24 22.674V1.326C24 .596 23.403 0 22.675 0"/>
              </svg>
              Open Graph
            </h4>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              openGraphComplete 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            }`}>
              {openGraphComplete ? '✓ Complete' : '⚠ Incomplete'}
            </div>
          </div>
          <div className="space-y-2">
            {entries.slice(0, 3).map(([k,v], index) => (
              <motion.div 
                key={k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                    {v ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </motion.div>
                  <span className="font-medium text-slate-900 dark:text-white">{k}</span>
                </div>
                <span className={`text-sm font-medium truncate max-w-[250px] text-right ${
                  v ? 'text-slate-700 dark:text-slate-300' : 'text-red-600 dark:text-red-400'
                }`}>
                  {v || 'Missing'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Twitter Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </h4>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              twitterComplete 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            }`}>
              {twitterComplete ? '✓ Complete' : '⚠ Incomplete'}
            </div>
          </div>
          <div className="space-y-2">
            {entries.slice(3).map(([k,v], index) => (
              <motion.div 
                key={k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + 3) * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                    {v ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </motion.div>
                  <span className="font-medium text-slate-900 dark:text-white">{k}</span>
                </div>
                <span className={`text-sm font-medium truncate max-w-[250px] text-right ${
                  v ? 'text-slate-700 dark:text-slate-300' : 'text-red-600 dark:text-red-400'
                }`}>
                  {v || 'Missing'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
