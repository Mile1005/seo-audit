import { Metadata } from 'next'
import { MainLayout } from '../../components/layout/main-layout'

export const metadata: Metadata = {
  title: 'Contact Us - Get SEO Help Today | AI SEO Turbo',
  description: 'Get in touch with AISEOTurbo for expert SEO consultation and support. We are here to help optimize your website and boost your search rankings.',
  keywords: ['contact aiseoturbo', 'seo consultation', 'seo support', 'seo experts contact'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/contact'
  }
}

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Ready to supercharge your SEO? Our team of experts is here to help you achieve better search rankings and drive more traffic.
            </p>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert SEO Support When You Need It
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From technical SEO audits to strategic consultation, our certified experts are ready to help you
              overcome challenges and achieve your organic growth goals.
            </p>
          </div>

          <div className="prose prose-lg mx-auto text-muted-foreground">
            <h3>Why Choose AI SEO Turbo for Your SEO Needs?</h3>
            <p>
              With over 15 years of combined SEO experience and a track record of helping 10,000+ businesses achieve
              measurable growth, our team combines technical expertise with strategic insight to deliver results that matter.
            </p>

            <h4>Technical SEO Consultation</h4>
            <p>
              Stuck on complex technical issues? Our certified SEO specialists provide personalized guidance on Core Web Vitals,
              schema markup implementation, international SEO, and enterprise-level technical challenges. We don't just identify
              problems—we provide step-by-step solutions.
            </p>

            <h4>Strategy & Implementation Support</h4>
            <p>
              Whether you're a business owner planning your SEO roadmap or an agency handling client campaigns, we offer strategic
              consultation to optimize your approach. From keyword research methodologies to competitive analysis frameworks,
              we help you build data-driven SEO strategies.
            </p>

            <h4>Platform Training & Best Practices</h4>
            <p>
              Maximize your investment in AI SEO Turbo with personalized training sessions. Learn advanced features,
              optimization techniques, and reporting strategies that turn our platform into a competitive advantage.
            </p>

            <h4>Partnership & Integration Opportunities</h4>
            <p>
              For agencies, developers, and platform providers interested in partnership opportunities, we offer white-label
              solutions, API integrations, and custom enterprise implementations.
            </p>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg my-8">
              <h4 className="text-primary font-semibold mb-3">Response Time Guarantee</h4>
              <p className="text-foreground mb-4">
                We respond to all inquiries within 24 hours, with urgent technical issues addressed within 4 hours
                during business days. Our support team includes certified SEO specialists and AI engineers ready to help.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4h</div>
                  <div className="text-sm text-muted-foreground">Urgent Issues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>

            <h3>Ready to Accelerate Your SEO Success?</h3>
            <p>
              Whether you need help with a specific technical challenge, want to discuss partnership opportunities,
              or simply have questions about optimizing your SEO strategy, we're here to help. Our commitment to
              transparency, expertise, and results-driven solutions sets us apart in the SEO industry.
            </p>
            <p>
              Contact us today and discover why thousands of businesses trust AI SEO Turbo to power their organic growth.
              Let's discuss how we can help you achieve your SEO objectives and drive measurable business results.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-background border rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              
              <form action="/api/contact" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your SEO goals and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Let's Start a Conversation
                </h2>
                <p className="text-muted-foreground text-lg">
                  Have questions about our SEO services? Want to discuss your specific needs? 
                  We're here to help you succeed online.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">General Inquiries</h3>
                    <a href="mailto:support@aiseoturbo.com" className="text-muted-foreground hover:text-primary transition-colors">support@aiseoturbo.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sales & Partnerships</h3>
                    <a href="mailto:sales@aiseoturbo.com" className="text-muted-foreground hover:text-primary transition-colors">sales@aiseoturbo.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Billing & Payments</h3>
                    <a href="mailto:billing@aiseoturbo.com" className="text-muted-foreground hover:text-primary transition-colors">billing@aiseoturbo.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-muted-foreground">123 SEO Street, Digital City, DC 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                    <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  )
}
