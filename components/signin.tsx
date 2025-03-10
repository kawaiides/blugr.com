'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut } from "lucide-react"

export default function SignInButton() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return <Button disabled>Loading...</Button>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {session.user?.name}
        </span>
        <Button
          variant="outline"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn("google", { callbackUrl: '/' })}>
    <LogIn className="mr-2 h-4 w-4" />
    Sign In
    </Button>
  )
}