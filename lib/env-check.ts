// Environment validation for build process
if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  // Only validate on server-side in production
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.warn(`⚠️  Missing required environment variables: ${missingVars.join(', ')}`)
  }

  // Optional but recommended variables
  const optionalVars = ['RESEND_API_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']
  const missingOptional = optionalVars.filter(varName => !process.env[varName])
  
  if (missingOptional.length > 0) {
    console.warn(`ℹ️  Missing optional environment variables: ${missingOptional.join(', ')}`)
  }
}

export {}
