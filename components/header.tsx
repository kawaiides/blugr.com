'use client'
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Logo from "@/public/bloogist.png"

export default function Header() {
  const { data: session } = useSession()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex p-5 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl">
            <Image
              src={Logo.src}
              alt="Bloogist"
              width={160}
              height={32}
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-2xl font-medium hover:underline">
              Home
            </Link>
            <Link href="/search" className="text-2xl font-medium hover:underline">
              Search
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-10 w-10" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          {session ? (
            <div className="flex text-2xl items-center gap-4">
              <p>{session.user?.email}</p>
              <Button onClick={() => signOut()} variant="outline" className="h-10 text-xl p-4">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => signIn('google')}className="h-10 text-xl p-4">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}