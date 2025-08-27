import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.AUTH_EMAIL_SERVER,
      from: process.env.AUTH_EMAIL_FROM,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      const p = request.nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      if (p.startsWith("/dashboard") || p.startsWith("/api/private")) return isLoggedIn;
      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
