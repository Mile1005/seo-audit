import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AISEOTurbo',
  description: 'Read AISEOTurbo privacy policy to understand how we collect, use, and protect your personal information.',
  robots: 'noindex, follow',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-8">Last updated: August 28, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our SEO audit services, communicate with you, and ensure the security of our platform.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@aiseoturbo.com.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
