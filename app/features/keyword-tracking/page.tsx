export default function KeywordTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Keyword Tracking</h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Monitor keyword rankings and track your SEO performance over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Rank Monitoring</h3>
            <p className="text-gray-300">Track keyword positions across search engines</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Performance Analytics</h3>
            <p className="text-gray-300">Detailed analytics and trend analysis</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Alert System</h3>
            <p className="text-gray-300">Get notified of ranking changes and opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
}