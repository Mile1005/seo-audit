export default function CompetitorAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Competitor Analysis</h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Analyze your competitors' SEO strategies and identify opportunities to gain competitive advantage.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">SERP Comparison</h3>
            <p className="text-gray-300">Compare search engine result pages</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Gap Analysis</h3>
            <p className="text-gray-300">Identify content and SEO gaps</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Strategy Insights</h3>
            <p className="text-gray-300">Actionable competitor strategy recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}