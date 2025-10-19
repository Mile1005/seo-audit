'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function OAuthTestPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleTest = async () => {
    setIsLoading(true)
    setError('')
    console.log('Starting Google OAuth test...')
    
    try {
      console.log('Environment check:', {
        hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        currentUrl: window.location.href,
        timestamp: new Date().toISOString()
      })
      
      const result = await signIn('google', {
        callbackUrl: '/oauth-test?success=true',
        redirect: false // Using false for debugging
      })
      
      console.log('SignIn result:', result)
      
      if (result?.error) {
        setError(`OAuth Error: ${result.error}`)
        console.error('OAuth Error:', result.error)
      } else if (result?.ok) {
        console.log('OAuth success, should redirect now')
        window.location.href = result.url || '/oauth-test?success=true'
      } else if (result?.url) {
        console.log('Redirecting to:', result.url)
        window.location.href = result.url
      } else {
        console.log('Unexpected result:', result)
        setError('Unexpected response from OAuth')
      }
    } catch (error) {
      console.error('OAuth exception:', error)
      setError(`Exception: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleDirect = async () => {
    console.log('Direct Google OAuth (with redirect)...')
    await signIn('google', {
      callbackUrl: '/oauth-test?success=true'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">OAuth Debug Test</h1>
        
        <h2 className="text-lg font-semibold mb-4">Debug Information</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Session Status:</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>User:</strong> {session?.user?.email || 'Not logged in'}</p>
            <p><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
              <h4 className="font-semibold">Error:</h4>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!session ? (
            <div className="space-y-2">
              <button
                onClick={handleGoogleTest}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Testing...' : 'Test Google OAuth (Debug)'}
              </button>
              
              <button
                onClick={handleGoogleDirect}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Google OAuth (Direct Redirect)
              </button>
            </div>
          ) : (
            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>Check browser console for detailed logs</p>
          <p>URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}</p>
        </div>
      </div>
    </div>
  )
}
