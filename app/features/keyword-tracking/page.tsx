import { MainLayout } from "@/components/layout/main-layout";

export default function KeywordTrackingPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Keyword Tracking</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Monitor keyword rankings and track your SEO performance over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Rank Monitoring</h3>
              <p className="text-muted-foreground">Track keyword positions across search engines</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Performance Analytics</h3>
              <p className="text-muted-foreground">Detailed analytics and trend analysis</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Alert System</h3>
              <p className="text-muted-foreground">
                Get notified of ranking changes and opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
