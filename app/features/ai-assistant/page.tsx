import { MainLayout } from "@/components/layout/main-layout";

export default function AIAssistantPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">AI SEO Assistant</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Smart AI-powered recommendations to optimize your website and improve search rankings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Smart Recommendations</h3>
              <p className="text-muted-foreground">AI-powered suggestions for SEO improvements</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Content Optimization</h3>
              <p className="text-muted-foreground">Optimize content for better search visibility</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Technical Fixes</h3>
              <p className="text-muted-foreground">Automated technical SEO issue resolution</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
