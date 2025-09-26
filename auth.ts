import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      return true
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
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true, // Enable debug logging for production
  trustHost: true,
})
