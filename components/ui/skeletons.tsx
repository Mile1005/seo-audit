// Critical performance optimization - Lightweight placeholder components
// These load instantly while heavy components are loading

import React from 'react'

// Optimized loading skeletons with minimal CSS
export const FeaturesSkeleton = () => (
  <div className="py-16 bg-gray-50/20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const DemoSkeleton = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-10 bg-blue-200 rounded w-32 mt-4"></div>
            </div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const TestimonialsSkeleton = () => (
  <div className="py-16 bg-gray-50/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const ROISkeleton = () => (
  <div className="py-16 bg-blue-50/30">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-56 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-72 mx-auto"></div>
        </div>
        <div className="bg-white p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded mb-4"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded mb-4"></div>
            </div>
          </div>
          <div className="h-24 bg-blue-50 rounded mt-6 flex items-center justify-center">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const PricingSkeleton = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[1,2,3].map(i => (
          <div key={i} className="border rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-20 mb-6"></div>
            <div className="space-y-3">
              {[1,2,3,4].map(j => (
                <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
            <div className="h-10 bg-blue-200 rounded w-full mt-6"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
