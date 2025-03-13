import NextAuth from "next-auth"
import { authOption } from "@/app/lib/auth"

export const dynamic = 'force-dynamic'
export const revalidate = 0

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }