import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AISEOTurbo',
  description: 'Read AISEOTurbo terms of service to understand the rules and guidelines for using our SEO audit platform.',
  robots: 'noindex, follow',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: August 28, 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                    </div>
                    Acceptance of Terms
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>By accessing and using AISEOTurbo (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                    <p>If you do not agree to abide by the above, please do not use this service.</p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">2</span>
                    </div>
                    Use License
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>Permission is granted to use AISEOTurbo for personal and commercial purposes subject to the following restrictions:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You may not modify or copy the materials</li>
                      <li>You may not use the materials for any commercial purpose or for any public display</li>
                      <li>You may not attempt to reverse engineer any software contained on the website</li>
                      <li>You may not remove any copyright or proprietary notations from the materials</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                    </div>
                    Service Description
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>AISEOTurbo provides AI-powered SEO audit services including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Comprehensive website SEO analysis</li>
                      <li>Technical SEO recommendations</li>
                      <li>Performance optimization insights</li>
                      <li>Competitor analysis tools</li>
                      <li>Keyword tracking and monitoring</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">4</span>
                    </div>
                    User Responsibilities
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>As a user of our service, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate and up-to-date information</li>
                      <li>Use the service in compliance with all applicable laws</li>
                      <li>Not interfere with or disrupt the service</li>
                      <li>Not attempt to gain unauthorized access to our systems</li>
                      <li>Respect the intellectual property rights of others</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 font-bold text-sm">5</span>
                    </div>
                    Disclaimer
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>The materials on AISEOTurbo are provided on an 'as is' basis. AISEOTurbo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">6</span>
                    </div>
                    Limitations
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>In no event shall AISEOTurbo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AISEOTurbo, even if AISEOTurbo or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 font-bold text-sm">7</span>
                    </div>
                    Modifications
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>AISEOTurbo may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service.</p>
                  </div>
                </section>

                <section className="bg-muted/30 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> legal@aiseoturbo.com</p>
                    <p><strong>Address:</strong> 123 SEO Street, Digital City, DC 12345</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
