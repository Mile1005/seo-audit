"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your account and application preferences
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Settings Panel
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Account settings and preferences coming soon
        </p>
        <button className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
}
