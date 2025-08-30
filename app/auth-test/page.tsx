'use client'

import { useAuth } from '../../hooks/use-auth'
import { signIn, signOut } from 'next-auth/react'

export default function AuthTestPage() {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Auth Test Page
        </h1>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="text-green-600 font-medium">
              ✅ Authentication Working!
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Image:</strong> {user?.image ? '✅' : '❌'}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-orange-600 font-medium">
              🔒 Not Authenticated
            </div>
            <button
              onClick={() => signIn('google')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Auth Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  )
}
