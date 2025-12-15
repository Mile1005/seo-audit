import { MainLayout } from "@/components/layout/main-layout";

export default function CompetitorAnalysisPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Competitor Analysis</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Analyze your competitors' SEO strategies and identify opportunities to gain competitive
            advantage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">SERP Comparison</h3>
              <p className="text-muted-foreground">Compare search engine result pages</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Gap Analysis</h3>
              <p className="text-muted-foreground">Identify content and SEO gaps</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Strategy Insights</h3>
              <p className="text-muted-foreground">
                Actionable competitor strategy recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
