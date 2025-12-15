"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  LinkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface EmptyStateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: "primary" | "secondary";
}

function EmptyStateCard({
  icon,
  title,
  description,
  action,
  variant = "secondary",
}: EmptyStateCardProps) {
  const bgGradient =
    variant === "primary"
      ? "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
      : "from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20";

  const borderColor =
    variant === "primary"
      ? "border-blue-200 dark:border-blue-800"
      : "border-slate-200 dark:border-slate-800";

  const ActionComponent = action.href ? Link : "button";

  return (
    <Card
      className={`bg-gradient-to-br ${bgGradient} border-2 ${borderColor} p-6 hover:shadow-lg transition-shadow`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            variant === "primary" ? "bg-blue-600 text-white" : "bg-slate-600 text-white"
          }`}
        >
          {icon}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>

        {action.href ? (
          <Link href={action.href} passHref legacyBehavior>
            <Button
              className={`w-full ${variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
            >
              {action.label}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={action.onClick}
            className={`w-full ${variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
          >
            {action.label}
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
}

interface DashboardEmptyStateProps {
  hasAudits: boolean;
  hasProjects: boolean;
  gscConnected: boolean;
  onGscConnect: () => void;
}

export default function DashboardEmptyState({
  hasAudits,
  hasProjects,
  gscConnected,
  onGscConnect,
}: DashboardEmptyStateProps) {
  return (
    <div className="space-y-8">
      {/* Hero Message */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome to Your SEO Dashboard
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Get started by setting up your first project and running a comprehensive SEO audit
        </p>
      </div>

      {/* Setup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Run First Audit */}
        <EmptyStateCard
          icon={<DocumentMagnifyingGlassIcon className="w-8 h-8" />}
          title="Run First Audit"
          description="Analyze your website's SEO performance with our comprehensive audit tool"
          action={{
            label: "Start Audit",
            href: "/dashboard/audit",
          }}
          variant="primary"
        />

        {/* Track Keywords */}
        <EmptyStateCard
          icon={<ChartBarIcon className="w-8 h-8" />}
          title="Track Keywords"
          description="Monitor your keyword rankings and discover new opportunities"
          action={{
            label: "Add Keywords",
            href: "/dashboard/keywords",
          }}
        />

        {/* Monitor Backlinks */}
        <EmptyStateCard
          icon={<LinkIcon className="w-8 h-8" />}
          title="Monitor Backlinks"
          description="Track your backlink profile and identify link building opportunities"
          action={{
            label: "View Backlinks",
            href: "/dashboard/backlinks",
          }}
        />
      </div>

      {/* Google Search Console CTA */}
      {!gscConnected && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg"></div>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Connect Google Search Console
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Get real-time search analytics, impressions, and click data directly in your
                    dashboard
                  </p>
                </div>
              </div>
              <Button
                onClick={onGscConnect}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 whitespace-nowrap"
              >
                Connect Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            💡 Quick Tips to Get Started
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">1.</span>
              <span>
                Run your first SEO audit to identify technical issues and optimization opportunities
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">2.</span>
              <span>Connect Google Search Console to track real search performance data</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">3.</span>
              <span>Add target keywords to monitor your rankings over time</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">4.</span>
              <span>Review your backlink profile to understand your site's authority</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
