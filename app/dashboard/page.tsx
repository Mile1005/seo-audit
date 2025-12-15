import { Metadata } from "next";
import DashboardContent from "../../components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard - AI SEO Turbo Control Center",
  description:
    "Access your comprehensive SEO dashboard to monitor rankings, track keywords, analyze competitors, and optimize your website performance.",
  keywords: [
    "SEO dashboard",
    "ranking monitor",
    "keyword tracking",
    "SEO analytics",
    "website optimization",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Server-rendered H1 for SEO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI SEO Turbo Dashboard
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Monitor your SEO performance and track key metrics
          </p>
        </div>
      </div>

      {/* Server-rendered H2 sections for SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            SEO Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Monitor your website's search engine optimization performance
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Keyword Tracking
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Track keyword rankings and performance metrics
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Backlink Analysis
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Analyze your backlink profile and domain authority
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Competitor Insights
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Compare your performance against competitors
          </p>
        </div>
      </div>

      {/* Client-side content with authentication */}
      <DashboardContent />
    </div>
  );
}
