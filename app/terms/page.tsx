import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AISEOTurbo',
  description: 'Read AISEOTurbo terms of service to understand the rules and guidelines for using our SEO audit platform.',
  robots: 'noindex, follow',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-8">Last updated: August 28, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using AISEOTurbo, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily use AISEOTurbo for personal, non-commercial transitory viewing only.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>The materials on AISEOTurbo are provided on an as is basis. AISEOTurbo makes no warranties, expressed or implied.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at legal@aiseoturbo.com.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
