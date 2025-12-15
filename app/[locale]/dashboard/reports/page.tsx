"use client";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Generate and schedule automated SEO reports
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Custom Reports
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Automated reporting and client dashboards
        </p>
        <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
          Pro Feature
        </div>
      </div>
    </div>
  );
}
