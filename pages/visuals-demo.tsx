import React from "react"
import { HeroMockup } from "@/components/visuals/hero-mockup"
import { FeatureMockups } from "@/components/visuals/feature-mockups"

export default function VisualsDemo() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Visual Assets Demo
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Interactive preview of our marketing homepage visual components with placeholder assets.
          </p>
        </div>

        {/* Hero Mockup Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hero Section Mockup
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Responsive desktop and mobile device frames with animated elements and interactive controls.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <HeroMockup 
              className="w-full"
              priority={true}
            />
          </div>
        </section>

        {/* Feature Mockups Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Feature Mockups Gallery
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Interactive gallery with lightbox, touch/swipe support, and responsive grid layout.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <FeatureMockups className="w-full" />
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Implementation Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-300">
                🖼️ Image Optimization
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Next/Image with responsive sizing</li>
                <li>• WebP format with blur placeholders</li>
                <li>• CLS-safe aspect ratios</li>
                <li>• Priority loading for hero images</li>
                <li>• Lazy loading for feature mockups</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">
                ⚡ Interactive Features
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Lightbox with keyboard navigation</li>
                <li>• Touch/swipe support for mobile</li>
                <li>• Framer Motion animations</li>
                <li>• Accessibility support (ARIA, focus)</li>
                <li>• Responsive grid layouts</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-300">
                📱 Responsive Design
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 1-4 columns based on screen size</li>
                <li>• Touch-optimized for mobile</li>
                <li>• Proper sizes attributes</li>
                <li>• Breakpoint-specific layouts</li>
                <li>• Consistent spacing system</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-300">
                🎯 Next Steps
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Replace placeholder images</li>
                <li>• Add final dashboard screenshots</li>
                <li>• Optimize for production</li>
                <li>• Test across devices</li>
                <li>• Integrate with homepage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* File Structure Reference */}
        <section className="bg-gradient-to-br from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            📁 File Structure
          </h3>
          
          <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div>📂 <span className="text-blue-300">components/visuals/</span></div>
              <div className="ml-4">📄 <span className="text-green-300">hero-mockup.tsx</span> - Hero section visuals</div>
              <div className="ml-4">📄 <span className="text-green-300">feature-mockups.tsx</span> - Feature gallery</div>
              <div className="ml-4">📄 <span className="text-yellow-300">index.ts</span> - Export barrel</div>
              <div className="ml-4">📄 <span className="text-gray-400">README.md</span> - Documentation</div>
              <br />
              <div>📂 <span className="text-blue-300">public/images/</span></div>
              <div className="ml-4">📂 <span className="text-purple-300">hero/</span> - Hero mockups</div>
              <div className="ml-4">📂 <span className="text-purple-300">features/</span> - Feature screenshots</div>
              <div className="ml-4">📂 <span className="text-purple-300">mockups/</span> - General mockups</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
