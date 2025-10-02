"use client";
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Zap, Monitor, Layers, Clock, Users, BarChart3 } from 'lucide-react';
import { PerformanceMetrics } from '../../lib/types/audit';

interface Props { metrics: PerformanceMetrics }

const thresholdMap: Record<string, [number, number]> = {
  fcp: [1.8,3.0],
  lcp:[2.5,4.0],
  cls:[0.1,0.25],
  tbt:[200,600],
  si:[3.4,5.8]
};

function rating(metric: string, value: number){
  const t = thresholdMap[metric];
  if(!t) return 'good';
  if (value <= t[0]) return 'good';
  if (value <= t[1]) return 'needs-improvement';
  return 'poor';
}
function color(r: string){
  if (r==='good') return 'text-green-500';
  if (r==='needs-improvement') return 'text-yellow-500';
  return 'text-red-500';
}
function badgeVariant(r:string){
  if(r==='good') return 'default';
  if(r==='needs-improvement') return 'secondary';
  return 'destructive';
}

export const CoreWebVitalsGrid = ({ metrics }: Props) => {
  const metricCards = [
    { title: "First Contentful Paint", icon: <Zap className="h-4 w-4" />, value: `${metrics.first_contentful_paint.toFixed(1)}s`, ratingKey: "fcp", raw: metrics.first_contentful_paint },
    { title: "Largest Contentful Paint", icon: <Monitor className="h-4 w-4" />, value: `${metrics.largest_contentful_paint.toFixed(1)}s`, ratingKey: "lcp", raw: metrics.largest_contentful_paint },
    { title: "Cumulative Layout Shift", icon: <Layers className="h-4 w-4" />, value: metrics.cumulative_layout_shift.toFixed(3), ratingKey: "cls", raw: metrics.cumulative_layout_shift },
    { title: "Total Blocking Time", icon: <Clock className="h-4 w-4" />, value: `${metrics.total_blocking_time.toFixed(0)}ms`, ratingKey: "tbt", raw: metrics.total_blocking_time },
    { title: "Time To Interactive", icon: <Users className="h-4 w-4" />, value: `${metrics.time_to_interactive.toFixed(1)}s`, info: true },
    { title: "Speed Index", icon: <BarChart3 className="h-4 w-4" />, value: `${metrics.speed_index.toFixed(1)}s`, ratingKey: "si", raw: metrics.speed_index }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricCards.map((card, index) => (
        <MetricCard 
          key={card.title}
          index={index}
          {...card}
        />
      ))}
    </div>
  );
};

interface MetricCardProps { title: string; icon: React.ReactNode; value: string; ratingKey?: string; raw?: number; info?: boolean; index: number }
const MetricCard = ({ title, icon, value, ratingKey, raw, info, index }: MetricCardProps) => {
  const r = ratingKey && raw!==undefined ? rating(ratingKey, raw) : undefined;
  
  // Get gradient colors based on rating
  const getCardStyle = (rating?: string) => {
    if (rating === 'good') return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-700';
    if (rating === 'needs-improvement') return 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-2 border-yellow-200 dark:border-yellow-700';
    if (rating === 'poor') return 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 border-2 border-red-200 dark:border-red-700';
    return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-2 border-blue-200 dark:border-blue-700';
  };

  const getIconColor = (rating?: string) => {
    if (rating === 'good') return 'bg-green-500';
    if (rating === 'needs-improvement') return 'bg-yellow-500';
    if (rating === 'poor') return 'bg-red-500';
    return 'bg-blue-500';
  };

  const getTitleColor = (rating?: string) => {
    if (rating === 'good') return 'text-green-900 dark:text-green-100';
    if (rating === 'needs-improvement') return 'text-yellow-900 dark:text-yellow-100';
    if (rating === 'poor') return 'text-red-900 dark:text-red-100';
    return 'text-blue-900 dark:text-blue-100';
  };

  const getHoverGlow = (rating?: string) => {
    if (rating === 'good') return 'hover:shadow-green-500/30';
    if (rating === 'needs-improvement') return 'hover:shadow-yellow-500/30';
    if (rating === 'poor') return 'hover:shadow-red-500/30';
    return 'hover:shadow-blue-500/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className="cursor-pointer"
    >
      <Card className={`${getCardStyle(r)} ${getHoverGlow(r)} transition-all duration-300 hover:shadow-2xl group`}>
        <CardHeader className="pb-4">
          <CardTitle className={`text-lg font-bold flex items-center gap-3 ${getTitleColor(r)}`}>
            <motion.div 
              className={`p-2 ${getIconColor(r)} rounded-lg`}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-white">{icon}</div>
            </motion.div>
            <span className="group-hover:text-opacity-80 transition-all duration-200">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div 
            className={`text-3xl font-bold ${r ? color(r) : 'text-blue-600 dark:text-blue-400'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            {value}
          </motion.div>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
            >
              {r ? (
                <Badge 
                  variant={badgeVariant(r)} 
                  className="text-sm font-medium px-3 py-1 capitalize"
                >
                  {r === 'needs-improvement' ? 'Needs Improvement' : r}
                </Badge>
              ) : (
                <Badge 
                  variant="outline" 
                  className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700"
                >
                  Informational
                </Badge>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
