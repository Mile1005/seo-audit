"use client";
import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AlertTriangle, Filter } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Issue } from '../../lib/types/audit';
import { Button } from '../ui/button';

interface Props { issues: Issue[] }

const severityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
const effortOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
const impactOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };

export const IssuesList = ({ issues }: Props) => {
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>(['high', 'medium', 'low']);
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<'severity' | 'impact' | 'effort'>('severity');

  const categories = useMemo(() => {
    const set = new Set<string>();
    issues?.forEach(i=> { if (i.category) set.add(i.category) });
    return Array.from(set).sort();
  }, [issues]);

  const toggleSeverity = (sev: string) => {
    setSelectedSeverities(prev => prev.includes(sev) ? prev.filter(s=>s!==sev) : [...prev, sev]);
  };

  const filteredIssues = useMemo(() => {
    return (issues ?? []).filter(i => selectedSeverities.includes((i.severity||'').toLowerCase()))
      .filter(i => category === 'all' || i.category === category);
  }, [issues, selectedSeverities, category]);

  const sortedIssues = useMemo(() => {
    const arr = [...filteredIssues];
    arr.sort((a,b) => {
      if (sort === 'severity') {
        return (severityOrder[a.severity?.toLowerCase()||'low']||9) - (severityOrder[b.severity?.toLowerCase()||'low']||9);
      } else if (sort === 'impact') {
        return (impactOrder[b.impact?.toLowerCase()||'low']||0) - (impactOrder[a.impact?.toLowerCase()||'low']||0);
      } else if (sort === 'effort') {
        return (effortOrder[a.effort?.toLowerCase()||'low']||0) - (effortOrder[b.effort?.toLowerCase()||'low']||0); // lower effort first
      }
      return 0;
    });
    return arr;
  }, [filteredIssues, sort]);

  // After hooks are declared, it's safe to early-return without violating the Rules of Hooks
  if (!issues || issues.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-2 border-red-200 dark:from-red-900/10 dark:via-rose-900/10 dark:to-red-900/10 dark:border-red-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-red-900 dark:text-red-100">
          <div className="p-2 bg-red-500 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          All Issues ({issues.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filter Bar */}
        <div className="mb-6 p-4 border border-red-200 dark:border-red-700 rounded-xl bg-white dark:bg-slate-700 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Filter className="h-4 w-4" /> 
            Filters
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {['high','medium','low'].map(sev => (
              <Button 
                key={sev} 
                type="button" 
                size="sm" 
                variant={selectedSeverities.includes(sev)?'default':'outline'} 
                onClick={()=>toggleSeverity(sev)} 
                className={`text-xs font-medium capitalize ${
                  selectedSeverities.includes(sev) 
                    ? sev === 'high' ? 'bg-red-500 hover:bg-red-600 text-white' :
                      sev === 'medium' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                      'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
              >
                {sev}
              </Button>
            ))}
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-2" />
            <select 
              value={category} 
              onChange={e=>setCategory(e.target.value)} 
              className="text-sm border border-slate-300 dark:border-slate-500 rounded-lg px-3 py-2 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-2" />
            <select 
              value={sort} 
              onChange={e=>setSort(e.target.value as any)} 
              className="text-sm border border-slate-300 dark:border-slate-500 rounded-lg px-3 py-2 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            >
              <option value="severity">Sort: Severity</option>
              <option value="impact">Sort: Impact (desc)</option>
              <option value="effort">Sort: Effort (asc)</option>
            </select>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700" 
              onClick={()=>{setSelectedSeverities(['high','medium','low']); setCategory('all'); setSort('severity')}}
            >
              Reset
            </Button>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-600 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-500">
            Showing <span className="font-semibold">{sortedIssues.length}</span> of <span className="font-semibold">{issues.length}</span> issues
          </div>
        </div>

        <div className="space-y-4">
          {sortedIssues.map((issue,i)=> {
            const getSeverityStyles = (severity: string) => {
              switch(severity) {
                case 'high': return 'bg-red-500 text-white';
                case 'medium': return 'bg-orange-500 text-white';
                case 'low': return 'bg-blue-500 text-white';
                default: return 'bg-slate-500 text-white';
              }
            };
            
            return (
              <div key={i} className="flex items-start gap-4 p-5 border border-slate-200 dark:border-slate-600 rounded-xl hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-700/50">
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ${getSeverityStyles(issue.severity || 'medium')}`}>
                  {(issue.severity || 'medium').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base leading-tight mb-2">{issue.title}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">{issue.description}</p>
                  {issue.recommendation && (
                    <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div>
                          <strong className="text-blue-800 dark:text-blue-200 text-sm">Recommendation:</strong>
                          <p className="text-blue-700 dark:text-blue-300 text-sm mt-1 leading-relaxed">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {issue.current_value && issue.expected_value && (
                    <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="font-medium text-slate-600 dark:text-slate-300">Current:</span>
                        <span className="font-mono text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs break-all">{issue.current_value}</span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">Expected:</span>
                        <span className="font-mono text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs break-all">{issue.expected_value}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {issue.category && <Badge variant="outline" className="text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600">{issue.category}</Badge>}
                    {issue.impact && <Badge variant="outline" className="text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">{issue.impact} impact</Badge>}
                    {issue.effort && <Badge variant="outline" className="text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">{issue.effort} effort</Badge>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
