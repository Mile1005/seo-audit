"use client";
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { FileText, CheckCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ComprehensiveResults } from '../../lib/types/audit';

interface Props { h: ComprehensiveResults['h_tags']; stats: ComprehensiveResults['stats'] }

export const HeadingStructure = ({ h, stats }: Props) => {
  // Analyze heading structure
  const analyzeHeadings = () => {
    const issues = [];
    const recommendations = [];
    let overallStatus: 'excellent' | 'good' | 'needs-improvement' | 'poor' = 'excellent';

    // H1 analysis
    if (h.h1.length === 0) {
      issues.push('No H1 tag found');
      recommendations.push('Add a descriptive H1 tag to your page');
      overallStatus = 'poor';
    } else if (h.h1.length > 1) {
      issues.push(`Multiple H1 tags found (${h.h1.length})`);
      recommendations.push('Use only one H1 tag per page');
      if (overallStatus === 'excellent') overallStatus = 'needs-improvement';
    } else {
      const h1Text = h.h1[0];
      if (h1Text.length < 20) {
        issues.push('H1 tag is too short');
        recommendations.push('Make your H1 more descriptive (20-60 characters)');
        if (overallStatus === 'excellent') overallStatus = 'good';
      } else if (h1Text.length > 60) {
        issues.push('H1 tag is too long');
        recommendations.push('Keep your H1 concise (under 60 characters)');
        if (overallStatus === 'excellent') overallStatus = 'good';
      }
    }

    // H2 analysis
    if (h.h2.length === 0) {
      issues.push('No H2 tags found');
      recommendations.push('Add H2 tags to structure your content');
      if (overallStatus === 'excellent') overallStatus = 'needs-improvement';
    } else if (h.h2.length > 6) {
      recommendations.push('Consider if all H2 tags are necessary for content structure');
    }

    // Heading hierarchy check
    if (h.h1.length > 0 && h.h2.length === 0 && h.h3.length > 0) {
      issues.push('Heading hierarchy skip detected (H1 → H3)');
      recommendations.push('Use H2 tags before jumping to H3');
      if (overallStatus === 'excellent') overallStatus = 'needs-improvement';
    }

    // Content analysis
    if (stats.word_count < 300) {
      issues.push('Low content word count');
      recommendations.push('Add more valuable content (aim for 300+ words)');
      if (overallStatus === 'excellent') overallStatus = 'needs-improvement';
    }

    if (stats.reading_time_min < 1) {
      recommendations.push('Consider adding more detailed information for better SEO');
    }

    return { issues, recommendations, overallStatus };
  };

  const analysis = analyzeHeadings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'needs-improvement': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'poor':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-3">
          <div className="p-2 bg-purple-500 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          Heading Structure Analysis
          <Badge className={`ml-auto ${getStatusColor(analysis.overallStatus)}`}>
            {analysis.overallStatus.replace('-', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border">
          {getStatusIcon(analysis.overallStatus)}
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              {analysis.overallStatus === 'excellent' && 'Excellent heading structure! '}
              {analysis.overallStatus === 'good' && 'Good heading structure with minor improvements possible'}
              {analysis.overallStatus === 'needs-improvement' && 'Heading structure needs some improvements'}
              {analysis.overallStatus === 'poor' && 'Heading structure requires significant improvements'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {analysis.overallStatus === 'excellent' && 'Your heading structure follows SEO best practices.'}
              {analysis.overallStatus === 'good' && 'Small adjustments could make your structure even better.'}
              {analysis.overallStatus === 'needs-improvement' && 'Some changes are needed for better SEO.'}
              {analysis.overallStatus === 'poor' && 'Critical issues need to be addressed immediately.'}
            </p>
          </div>
        </div>

        {/* Heading Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{h.h1.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">H1 Tags</div>
            {h.h1.length === 1 && <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-1" />}
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{h.h2.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">H2 Tags</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{h.h3.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">H3 Tags</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.word_count.toLocaleString()}</div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">Words</div>
          </div>
        </div>

        {/* Content Metrics */}
        <div className="p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 space-y-3">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Content Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200 font-medium">Reading Time:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{stats.reading_time_min} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200 font-medium">Content Depth:</span>
              <Badge variant="outline" className={
                stats.word_count >= 1000 ? 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-400' :
                stats.word_count >= 500 ? 'border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400' :
                'border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-400'
              }>
                {stats.word_count >= 1000 ? 'Comprehensive' : 
                 stats.word_count >= 500 ? 'Moderate' : 'Brief'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Issues Found */}
        {analysis.issues.length > 0 && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues Found ({analysis.issues.length})
            </h4>
            <ul className="space-y-2">
              {analysis.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-300">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Recommendations ({analysis.recommendations.length})
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700 dark:text-blue-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enhanced Heading Preview with Full Hierarchy */}
        <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl border">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-500 rounded text-white text-xs flex items-center justify-center">📋</div>
            Current Page Structure ({h.h1.length + h.h2.length + h.h3.length} headings)
          </h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {/* H1 Headings */}
            {h.h1.map((heading, index) => (
              <div key={`h1-${index}`} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-purple-500">
                <Badge className="bg-purple-500 text-white font-bold">H1</Badge>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{heading}</span>
                  <div className="text-xs text-purple-600 dark:text-purple-300 mt-1 font-medium">
                    Primary page title • {heading.length} characters
                  </div>
                </div>
              </div>
            ))}

            {/* H2 Headings */}
            {h.h2.map((heading, index) => (
              <div key={`h2-${index}`} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-blue-500 ml-4">
                <Badge className="bg-blue-500 text-white font-bold">H2</Badge>
                <div className="flex-1">
                  <span className="text-sm text-slate-900 dark:text-slate-100">{heading}</span>
                  <div className="text-xs text-blue-600 dark:text-blue-300 mt-1 font-medium">
                    Section heading • {heading.length} characters
                  </div>
                </div>
              </div>
            ))}

            {/* H3 Headings (show first 5) */}
            {h.h3.slice(0, 5).map((heading, index) => (
              <div key={`h3-${index}`} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-cyan-500 ml-8">
                <Badge className="bg-cyan-500 text-white font-bold">H3</Badge>
                <div className="flex-1">
                  <span className="text-sm text-slate-800 dark:text-slate-100">{heading}</span>
                  <div className="text-xs text-cyan-600 dark:text-cyan-300 mt-1 font-medium">
                    Subsection • {heading.length} characters
                  </div>
                </div>
              </div>
            ))}
            
            {h.h3.length > 5 && (
              <div className="text-xs text-slate-700 dark:text-slate-200 ml-12 p-2 bg-slate-100 dark:bg-slate-600 rounded font-medium">
                📄 ... and {h.h3.length - 5} more H3 headings
              </div>
            )}

            {h.h1.length === 0 && h.h2.length === 0 && h.h3.length === 0 && (
              <div className="text-center p-6 text-slate-500 dark:text-slate-400">
                <div className="text-2xl mb-2">📄</div>
                <p className="text-sm font-medium">No headings found</p>
                <p className="text-xs">Add H1, H2, and H3 tags to structure your content</p>
              </div>
            )}
          </div>
          
          {/* SEO Impact Analysis */}
          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg">
            <h5 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
              🎯 SEO Impact Analysis
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-medium text-indigo-800 dark:text-indigo-200">Search Engine Understanding:</span>
                <p className="text-indigo-700 dark:text-indigo-300">
                  {analysis.overallStatus === 'excellent' ? 'Search engines can easily understand your content structure' :
                   analysis.overallStatus === 'good' ? 'Generally clear structure with minor improvements possible' :
                   analysis.overallStatus === 'needs-improvement' ? 'Some structural issues may confuse search engines' :
                   'Poor structure significantly impacts SEO performance'}
                </p>
              </div>
              <div>
                <span className="font-medium text-indigo-800 dark:text-indigo-200">User Experience:</span>
                <p className="text-indigo-700 dark:text-indigo-300">
                  {analysis.overallStatus === 'excellent' ? 'Excellent readability and content organization' :
                   analysis.overallStatus === 'good' ? 'Good structure supports easy content scanning' :
                   analysis.overallStatus === 'needs-improvement' ? 'Structure improvements would enhance readability' :
                   'Poor structure hurts user experience and engagement'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
