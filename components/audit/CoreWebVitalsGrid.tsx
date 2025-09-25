"use client";
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard title="First Contentful Paint" icon={<Zap className="h-4 w-4" />} value={`${metrics.first_contentful_paint.toFixed(1)}s`} ratingKey="fcp" raw={metrics.first_contentful_paint} />
      <MetricCard title="Largest Contentful Paint" icon={<Monitor className="h-4 w-4" />} value={`${metrics.largest_contentful_paint.toFixed(1)}s`} ratingKey="lcp" raw={metrics.largest_contentful_paint} />
      <MetricCard title="Cumulative Layout Shift" icon={<Layers className="h-4 w-4" />} value={metrics.cumulative_layout_shift.toFixed(3)} ratingKey="cls" raw={metrics.cumulative_layout_shift} />
      <MetricCard title="Total Blocking Time" icon={<Clock className="h-4 w-4" />} value={`${metrics.total_blocking_time.toFixed(0)}ms`} ratingKey="tbt" raw={metrics.total_blocking_time} />
      <MetricCard title="Time To Interactive" icon={<Users className="h-4 w-4" />} value={`${metrics.time_to_interactive.toFixed(1)}s`} info />
      <MetricCard title="Speed Index" icon={<BarChart3 className="h-4 w-4" />} value={`${metrics.speed_index.toFixed(1)}s`} ratingKey="si" raw={metrics.speed_index} />
    </div>
  );
};

interface MetricCardProps { title: string; icon: React.ReactNode; value: string; ratingKey?: string; raw?: number; info?: boolean }
const MetricCard = ({ title, icon, value, ratingKey, raw, info }: MetricCardProps) => {
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

  return (
    <Card className={getCardStyle(r)}>
      <CardHeader className="pb-4">
        <CardTitle className={`text-lg font-bold flex items-center gap-3 ${getTitleColor(r)}`}>
          <div className={`p-2 ${getIconColor(r)} rounded-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`text-3xl font-bold ${r ? color(r) : 'text-blue-600 dark:text-blue-400'}`}>
          {value}
        </div>
        <div className="flex justify-center">
          {r ? (
            <Badge 
              variant={badgeVariant(r)} 
              className="text-sm font-medium px-3 py-1"
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
        </div>
      </CardContent>
    </Card>
  );
};
