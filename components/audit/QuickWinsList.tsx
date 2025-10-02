"use client";
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Star, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { QuickWin } from '../../lib/types/audit';

interface Props { quickWins: QuickWin[] }
export const QuickWinsList = ({ quickWins }: Props) => {
  if (!quickWins || quickWins.length === 0) return null;
  return (
    <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200 dark:from-green-900/10 dark:via-emerald-900/10 dark:to-green-900/10 dark:border-green-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-green-900 dark:text-green-100">
          <div className="p-2 bg-green-500 rounded-lg">
            <Star className="h-5 w-5 text-white" />
          </div>
          Quick Wins ({quickWins.length})
        </CardTitle>
        <CardDescription className="text-green-800 dark:text-green-200">Low-effort, high-impact improvements you can implement quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quickWins.map((win,i)=>(
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)",
                transition: { duration: 0.2 }
              }}
              className="flex items-start gap-4 p-4 bg-white dark:bg-slate-700 rounded-xl border border-green-100 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 shadow-lg shadow-green-500/20">
                  Quick Win
                </Badge>
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{win.title}</h4>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">{win.description}</p>
                {win.current_value && win.recommended_value && (
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-500 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">Current:</span>
                      <span className="font-mono text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs">{win.current_value}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200">Recommended:</span>
                      <span className="font-mono text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs">{win.recommended_value}</span>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  {win.impact && <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">{win.impact} impact</Badge>}
                  {win.effort && <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">{win.effort} effort</Badge>}
                  {win.category && <Badge variant="outline" className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600">{win.category}</Badge>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
