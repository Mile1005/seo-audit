"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Award, Download, Share } from 'lucide-react';
import { AuditResultUnified } from '../../lib/types/audit';

interface Props { result: AuditResultUnified }

function scoreColor(score: number){
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  return 'text-red-500';
}

export const ScoreSummary = ({ result }: Props) => {
  const s = result.comprehensiveResults.scores;
  
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (score >= 70) return { label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    return { label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' };
  };

  const overallStatus = getScoreStatus(result.score);

  const handleExportPDF = async () => {
    try {
      // Create a comprehensive PDF report
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      const reportContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SEO Audit Report - ${result.url}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .score-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
            .score-card { border: 1px solid #ddd; padding: 20px; text-align: center; border-radius: 8px; }
            .score-large { font-size: 48px; font-weight: bold; color: #3b82f6; }
            .issues { margin: 30px 0; }
            .issue { margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #dc3545; }
            .recommendation { margin: 15px 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #3b82f6; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SEO Audit Report</h1>
            <h2>${result.url}</h2>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <div class="score-large">${result.score}/100</div>
            <p><strong>Overall Status:</strong> ${overallStatus.label}</p>
          </div>
          
          <div class="score-grid">
            <div class="score-card">
              <h3>SEO</h3>
              <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${s.seo || 0}</div>
            </div>
            <div class="score-card">
              <h3>Performance</h3>
              <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${s.performance || 0}</div>
            </div>
            <div class="score-card">
              <h3>Accessibility</h3>
              <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${s.accessibility || 0}</div>
            </div>
            <div class="score-card">
              <h3>Best Practices</h3>
              <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${s.best_practices || 0}</div>
            </div>
          </div>

          <div class="issues">
            <h2>Issues Found (${result.comprehensiveResults.issues?.length || 0})</h2>
            ${result.comprehensiveResults.issues?.map(issue => `
              <div class="issue">
                <h4>${issue.title}</h4>
                <p>${issue.description}</p>
                ${issue.recommendation ? `<p><strong>Recommendation:</strong> ${issue.recommendation}</p>` : ''}
              </div>
            `).join('') || '<p>No issues found.</p>'}
          </div>

          <div class="issues">
            <h2>Quick Wins (${result.comprehensiveResults.quick_wins?.length || 0})</h2>
            ${result.comprehensiveResults.quick_wins?.map(win => `
              <div class="recommendation">
                <h4>${win.title}</h4>
                <p>${win.description}</p>
              </div>
            `).join('') || '<p>No quick wins identified.</p>'}
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `SEO Audit Report - ${result.url}`,
      text: `SEO Score: ${result.score}/100 - ${overallStatus.label}. Issues found: ${result.comprehensiveResults.issues?.length || 0}, Quick wins: ${result.comprehensiveResults.quick_wins?.length || 0}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Report summary copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback - create shareable URL
      const mailtoLink = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`;
      window.open(mailtoLink);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                SEO Audit Results
              </CardTitle>
              <CardDescription className="text-slate-800 dark:text-slate-200 mt-1 font-medium">
                {result.url}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <span>Completed: {new Date(result.timestamp).toLocaleDateString()}</span>
                <span>•</span>
                <span>ID: {result.auditId.slice(0, 8)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700 font-medium"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score Highlight */}
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border shadow-sm">
          <div className="mb-4">
            <div className={`text-6xl font-bold ${overallStatus.color} mb-2`}>
              {result.score}
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${overallStatus.bg} ${overallStatus.color}`}>
              {overallStatus.label}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Overall SEO Score</h3>
          <Progress value={result.score} className="mt-3 h-3 bg-slate-200 dark:bg-slate-700" />
          <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 font-medium">
            {result.score >= 90 && "Outstanding! Your site follows SEO best practices."}
            {result.score >= 70 && result.score < 90 && "Good performance with room for optimization."}
            {result.score < 70 && "Several opportunities for improvement identified."}
          </p>
        </div>

        {/* Detailed Scores Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'seo', label: 'SEO', icon: '🎯' },
            { key: 'performance', label: 'Performance', icon: '⚡' },
            { key: 'accessibility', label: 'Accessibility', icon: '♿' },
            { key: 'best_practices', label: 'Best Practices', icon: '✅' }
          ].map(({ key, label, icon }) => {
            const score = (s as any)[key] || 0;
            const status = getScoreStatus(score);
            
            return (
              <div key={key} className="p-4 bg-white dark:bg-slate-800 rounded-xl border hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className={`text-3xl font-bold ${status.color} mb-1`}>
                    {score}
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    {label}
                  </div>
                  <Progress value={score} className="h-2 bg-slate-200 dark:bg-slate-700" />
                  <div className={`text-xs mt-2 px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                    {status.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Summary */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Quick Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {Object.values(s).filter(score => score >= 90).length}
              </div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">Excellent Areas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {Object.values(s).filter(score => score >= 70 && score < 90).length}
              </div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">Good Areas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {Object.values(s).filter(score => score < 70).length}
              </div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">Needs Attention</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
