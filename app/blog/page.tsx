import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Blog | AISEOTurbo - Expert SEO Tips and Insights',
  description: 'Stay ahead with the latest SEO strategies and AI-powered insights from AISEOTurbo.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            SEO <span className="text-blue-600">Insights</span> and Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with expert SEO strategies, AI-powered insights, and actionable tips to boost your search rankings.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Complete SEO Audit Checklist</h2>
              <p className="text-gray-600 mb-4">A comprehensive guide to auditing your website for SEO issues and opportunities.</p>
              <div className="text-sm text-blue-600">Read more </div>
            </div>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered SEO Strategies</h2>
              <p className="text-gray-600 mb-4">Learn how artificial intelligence is revolutionizing search engine optimization.</p>
              <div className="text-sm text-blue-600">Read more </div>
            </div>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Technical SEO Best Practices</h2>
              <p className="text-gray-600 mb-4">Master the technical aspects of SEO with our expert recommendations.</p>
              <div className="text-sm text-blue-600">Read more </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}
