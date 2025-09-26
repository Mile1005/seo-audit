import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma"
import { safeDbOperation } from "./lib/db-health"
import bcrypt from "bcryptjs"

// Log environment status once on startup
if (process.env.NODE_ENV === 'production') {
  console.log('🔑 Auth Environment Check:', {
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasAuthSecret: !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
    nextauthUrl: process.env.NEXTAUTH_URL,
  })
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Use JWT strategy to avoid database issues during OAuth callback
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
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
      // For OAuth providers, ensure user exists in database (but don't fail if DB is down)
      if (account?.provider === 'google' && user?.email) {
        await safeDbOperation(async () => {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
          
          if (!existingUser) {
            // Create user in database
            console.log(`Creating new user: ${user.email}`)
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
              }
            })
          } else if (!existingUser.image && user.image) {
            // Update image if user doesn't have one
            console.log(`Updating user image: ${user.email}`)
            await prisma.user.update({
              where: { email: user.email! },
              data: { image: user.image }
            })
          }
        })
      }
      return true
    },
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub
        
        // Fetch fresh user data from database
        if (session.user.email) {
          const dbUser = await safeDbOperation(async () => {
            return await prisma.user.findUnique({
              where: { email: session.user.email! },
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              }
            })
          })
          
          if (dbUser) {
            session.user.id = dbUser.id
            session.user.name = dbUser.name
            session.user.image = dbUser.image
          }
        }
      }
      return session
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.uid = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: true, // Enable debug logging for production
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
})
