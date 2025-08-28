import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | AISEOTurbo - Get Expert SEO Help',
  description: 'Get in touch with AISEOTurbo for expert SEO consultation and support.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">Ready to supercharge your SEO? Our team of experts is here to help you achieve better search rankings.</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@aiseoturbo.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
