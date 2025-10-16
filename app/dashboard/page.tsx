"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DashboardOverview from '../../components/dashboard/DashboardOverview';
import DashboardPageLayout from './page-layout';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <DashboardPageLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardPageLayout>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardPageLayout>
      <DashboardOverview />
    </DashboardPageLayout>
  );
}
