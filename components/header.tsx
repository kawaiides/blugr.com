'use client'
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl">
            Bloogist
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/search" className="text-sm font-medium hover:underline">
              Search
            </Link>
            <Link href="/generate" className="text-sm font-medium hover:underline">
              Generate
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          {session ? (
            <div className="flex items-center gap-4">
              <p className="text-sm">{session.user?.email}</p>
              <Button onClick={() => signOut()} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => signIn('google')} size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}