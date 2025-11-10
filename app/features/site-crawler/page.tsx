export default function SiteCrawlerPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Site Crawler</h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Deep website analysis tool that crawls your entire site to identify technical issues and optimization opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Complete Site Crawl</h3>
            <p className="text-gray-300">Comprehensive crawling of all pages and resources</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Issue Detection</h3>
            <p className="text-gray-300">Automated detection of broken links and errors</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
            <p className="text-gray-300">Page speed and loading performance insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}