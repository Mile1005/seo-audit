'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { MainLayout } from '../../components/layout/main-layout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BarChart3, Globe, Search, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  console.log("🏠 Dashboard: Session status:", status)
  console.log("🏠 Dashboard: Session data:", session)

  if (status === 'loading') {
    console.log("⏳ Dashboard: Loading session...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    console.log("❌ Dashboard: No session found, redirecting to login")
    redirect('/login');
  }

  console.log("✅ Dashboard: Session found, rendering dashboard for:", session.user?.email)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your SEO audit dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Sites Audited
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Keywords Tracked
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Avg. Score
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Issues Found
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Audits */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Audits
            </h2>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              New Audit
            </Button>
          </div>
          
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No audits yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start your first SEO audit to see insights here
            </p>
            <Button>
              Start First Audit
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
