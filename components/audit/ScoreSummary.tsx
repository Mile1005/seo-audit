"use client";
import { AuditResultUnified } from '../../lib/types/audit';

interface Props { result: AuditResultUnified }

function scoreColor(score: number) {
  if (score >= 90) return { stroke: '#0CCE6B', text: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'Excellent' };
  if (score >= 50) return { stroke: '#FFA400', text: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', label: 'Good' };
  return { stroke: '#FF4E42', text: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Poor' };
}

export const ScoreRing = ({ score, label, size = 120 }: { score: number; label: string; size?: number }) => {
  const { stroke, text, bg, label: status } = scoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            stroke={stroke}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${text}`}>{score}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{label}</div>
        <div className={`text-xs font-medium px-3 py-1 rounded-full ${bg} ${text} mt-1`}>
          {status}
        </div>
      </div>
    </div>
  );
};

export const ScoreSummary = ({ result }: Props) => {
  const s = result.comprehensiveResults.scores;
  const overallStatus = scoreColor(result.score);

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-8 shadow-lg transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="truncate">SEO Audit Results</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm">
              <p className="text-slate-600 dark:text-slate-400 truncate max-w-[200px] sm:max-w-none">{result.url}</p>
              <span className="text-xs text-slate-500 dark:text-slate-500 hidden sm:inline">•</span>
              <p className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Completed: {new Date().toLocaleDateString()}
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-500 hidden sm:inline">•</span>
              <p className="text-slate-600 dark:text-slate-400 whitespace-nowrap">ID: {result.auditId.slice(0, 8)}</p>
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        {/* Overall Score - Large */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center">
            <ScoreRing score={result.score} label="" size={160} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Overall SEO Score</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 text-center max-w-md">
              {result.score >= 90 ? 'Excellent performance with room for optimization.' :
               result.score >= 50 ? 'Good performance with some areas to improve.' :
               'Significant improvements needed for better SEO performance.'}
            </p>
          </div>
        </div>

        {/* Individual Scores - Lighthouse Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreRing score={s.seo || 0} label="SEO" size={110} />
          <ScoreRing score={s.performance || 0} label="Performance" size={110} />
          <ScoreRing score={s.accessibility || 0} label="Accessibility" size={110} />
          <ScoreRing score={s.best_practices || 0} label="Best Practices" size={110} />
        </div>
      </div>

      {/* Quick Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                {result.comprehensiveResults.accessibility?.passed_checks?.length || 0}
              </div>
              <div className="text-sm font-medium text-green-600 dark:text-green-300">Excellent Areas</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                {result.comprehensiveResults.seo_checks?.failed_checks?.length || 0}
              </div>
              <div className="text-sm font-medium text-yellow-600 dark:text-yellow-300">Good Areas</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-700 dark:text-red-400">
                {result.comprehensiveResults.issues?.filter(i => i.severity === 'high').length || 0}
              </div>
              <div className="text-sm font-medium text-red-600 dark:text-red-300">Needs Attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
