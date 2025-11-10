export default function SEOAuditPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">SEO Audit Tool</h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Comprehensive SEO audit tool that analyzes your website for technical issues, on-page optimization, performance, and provides actionable recommendations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Technical SEO Checks</h3>
            <p className="text-gray-300">100+ automated checks for technical SEO issues</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">On-Page Analysis</h3>
            <p className="text-gray-300">Complete on-page SEO optimization analysis</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Performance Monitoring</h3>
            <p className="text-gray-300">Core Web Vitals and page speed analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}