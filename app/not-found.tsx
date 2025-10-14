import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/features/seo-audit">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                <Search className="w-4 h-4 mr-2" />
                Free SEO Audit
              </Button>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-sm text-gray-500 mb-4">
              Need help finding something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact Support
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/help" className="text-blue-400 hover:text-blue-300 transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
                Browse Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}