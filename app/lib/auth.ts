import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from "@/app/lib/prisma"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

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
      async session({ session, user }: { session: any, user: any }) {
  {}      session.user.id = user.id
        return session
      }
    },
  }