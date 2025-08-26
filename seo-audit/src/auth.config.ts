import type { NextAuthConfig } from "next-auth"
import Email from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Email({
      server: {
        host: process.env.AUTH_EMAIL_SERVER_HOST,
        port: Number(process.env.AUTH_EMAIL_SERVER_PORT),
        auth: {
          user: process.env.AUTH_EMAIL_SERVER_USER,
          pass: process.env.AUTH_EMAIL_SERVER_PASS,
        },
      },
      from: process.env.AUTH_EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnPrivateApi = nextUrl.pathname.startsWith("/api/private")
      
      if (isOnDashboard || isOnPrivateApi) {
        if (isLoggedIn) return true
        return false // Redirect to login
      }
      
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
