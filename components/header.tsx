'use client'
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Logo from "@/public/bloogist.png"
import { useEffect, useState } from "react"
import UserInfo from "./UserInfo"

export default function Header() {
  const { data: session, status } = useSession()
  const [isMounted, setIsMounted] = useState(false)

  // Ensure client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Debug session changes
  useEffect(() => {
    console.log("Session updated:", session)
  }, [session])

  if (!isMounted) return null  // Prevent SSR mismatch

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
          
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <div className="flex text-2xl items-center gap-4">
              <UserInfo />
            </div>
          ) : (
            <Button 
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="h-10 text-xl p-4"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}