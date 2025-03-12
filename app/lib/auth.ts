import { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from "@/app/lib/prisma"

declare module 'next-auth' {
  interface User {
    id: string
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            access_type: "offline",
            prompt: "consent",
            scope: 'openid email profile', // Add this line
          },
          url: "https://accounts.google.com/o/oauth2/v2/auth",
        },
        token: {
          url: "https://oauth2.googleapis.com/token",
        },
        userinfo: {
          url: "https://openidconnect.googleapis.com/v1/userinfo",
        },
        httpOptions: {
          timeout: 10000 // 10 seconds timeout
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
        }
        return token
      },
      async session({ session, token }) {
        if (session.user) {
          (session.user as User & { id: string }).id = token.id as string
        }
        return session
      }
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    },
    session: {
      strategy: "jwt", // Explicitly set when using adapter
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: true,
  }