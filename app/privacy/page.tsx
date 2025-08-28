import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AISEOTurbo',
  description: 'Read AISEOTurbo privacy policy to understand how we collect, use, and protect your personal information.',
  robots: 'noindex, follow',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                    Information We Collect
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>We collect information you provide directly to us, such as when you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create an account or use our services</li>
                      <li>Contact us for support or inquiries</li>
                      <li>Subscribe to our newsletter or marketing communications</li>
                      <li>Participate in surveys or provide feedback</li>
                    </ul>
                    <p>This may include your name, email address, phone number, company information, and any other information you choose to provide.</p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">2</span>
                    </div>
                    How We Use Your Information
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide, maintain, and improve our SEO audit services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send you technical notices, updates, and support messages</li>
                      <li>Respond to your comments, questions, and customer service requests</li>
                      <li>Communicate with you about products, services, and events</li>
                      <li>Monitor and analyze trends and usage patterns</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                    </div>
                    Information Sharing and Disclosure
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>With service providers who assist us in operating our platform</li>
                      <li>To comply with applicable laws and regulations</li>
                      <li>To protect our rights, property, or safety</li>
                      <li>In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">4</span>
                    </div>
                    Data Security
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication requirements</li>
                      <li>Employee training on data protection practices</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 font-bold text-sm">5</span>
                    </div>
                    Your Rights and Choices
                  </h2>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>You have certain rights regarding your personal information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and update your account information</li>
                      <li>Request deletion of your personal data</li>
                      <li>Opt out of marketing communications</li>
                      <li>Request a copy of your data</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-muted/30 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> privacy@aiseoturbo.com</p>
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
