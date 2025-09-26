import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

// NOTE: Extra defensive logging to surface root cause of `invalid_grant` / Configuration errors in production.
// Common causes we will highlight: redirect URI mismatch, missing env vars, host mismatch (www vs apex), reused code.

function requireEnv(name: string, optional = false) {
  const v = process.env[name]
  if (!v && !optional) {
    console.error(`❌ Missing required env var: ${name}`)
  }
  return v
}

// Gather env vars (we log them in a sanitized way once)
const GOOGLE_CLIENT_ID = requireEnv('GOOGLE_CLIENT_ID')
const GOOGLE_CLIENT_SECRET = requireEnv('GOOGLE_CLIENT_SECRET')
// Support both AUTH_SECRET and NEXTAUTH_SECRET just in case only one is set
const AUTH_SECRET = requireEnv('AUTH_SECRET', true) || requireEnv('NEXTAUTH_SECRET', true)
const NEXTAUTH_URL = requireEnv('NEXTAUTH_URL', true)

if (process.env.NODE_ENV === 'production') {
  // One-time summary log (without secrets)
  console.log('🔎 Auth env summary', {
    hasGoogleId: !!GOOGLE_CLIENT_ID,
    hasGoogleSecret: !!GOOGLE_CLIENT_SECRET,
    hasSecret: !!AUTH_SECRET,
    nextauthUrl: NEXTAUTH_URL,
  })
}

function mask(v?: string | null) {
  if (!v) return v
  return v.slice(0, 4) + '...' + v.slice(-4)
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID || 'missing-google-client-id',
      clientSecret: GOOGLE_CLIENT_SECRET || 'missing-google-client-secret',
      // Remove custom params temporarily to reduce invalid_grant surface (Google sometimes invalidates when misaligned)
      // If offline access refresh tokens needed later, we can re-introduce with care.
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Auth: Missing email or password")
          return null
        }

        try {
          console.log("🔍 Auth: Looking for user with email:", credentials.email)
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          if (!user) {
            console.log("❌ Auth: User not found for email:", credentials.email)
            return null
          }

          if (!user.password) {
            console.log("❌ Auth: User exists but no password set (OAuth user?)")
            return null
          }

          console.log("🔐 Auth: Checking password for user:", user.email)
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.log("❌ Auth: Invalid password for user:", user.email)
            return null
          }

          console.log("✅ Auth: Login successful for user:", user.email)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("❌ Auth: Database error during login:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🔐 SignIn callback:", { 
        user: user?.email, 
        account: account?.provider,
        profile: profile?.email 
      })
      if (!AUTH_SECRET) {
        console.error('❌ AUTH_SECRET (or NEXTAUTH_SECRET) missing. Sessions will fail.')
      }
      if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        console.error('❌ Google OAuth credentials missing. Google sign-in will not work.')
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      try {
        if (NEXTAUTH_URL && !baseUrl.includes(new URL(NEXTAUTH_URL).host)) {
          console.warn('⚠️ Host mismatch (baseUrl vs NEXTAUTH_URL)', { baseUrl, NEXTAUTH_URL })
        }
      } catch {}
      return url.startsWith('/') ? `${baseUrl}${url}` : url
    },
    session: async ({ session, token }) => {
      console.log("📱 Session callback:", { 
        sessionUser: session?.user?.email,
        tokenSub: token.sub 
      })
      if (session?.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: async ({ user, token }) => {
      console.log("🎫 JWT callback:", { 
        user: user?.email,
        tokenSub: token.sub 
      })
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  events: {
    async signIn(message) {
      console.log('🟢 NextAuth event signIn:', {
        user: message.user?.email,
        provider: (message.account as any)?.provider,
      })
    },
    async session(message) {
      console.log('🟢 NextAuth event session:', {
        user: message.session?.user?.email,
      })
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true, // Enable debug logging for production
  secret: AUTH_SECRET || 'development-fallback-secret-do-not-use-in-prod',
})
