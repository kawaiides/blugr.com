'use client'
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Logo from "@/public/bloogist.png"
import { useEffect, useState } from "react"
import UserInfo from "./UserInfo"

export default function Header() {
  const { data: session, status } = useSession()
  const [isMounted, setIsMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex p-5 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="md:flex-1">
            <Image
              src={Logo.src}
              alt="Bloogist"
              width={160}
              height={32}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 flex-1 justify-center items-center flex-wrap-reverse">
            <Link href="/search" className="flex justify-center items-center py-2 px-4 hover:bg-orange-100 rounded-lg">
              <div
                className="text-2xl font-medium gap-6"
              >
                Search
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-orange-100">
                <Search className="h-5 w-5 hover:bg-orange-100" />
                <span className="sr-only hover:bg-orange-100">Search</span>
              </Button>
            </Link>
            <Link 
              href="/generate" 
              className="flex items-center hover:scale-105 text-2xl font-medium rounded-full border-solid shadow-lg bg-gradient-to-r from-yellow-300 to-orange-500 rounded-lg py-2 px-4 hover:bg-yellow-400"
            >
                <div className="text-white pr-1">bloog</div>
                <div className="text-3xl">✨</div>
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {status === "loading" ? (
              <div>Loading...</div>
            ) : session ? (
              <UserInfo />
            ) : (
              <Button 
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="text-2xl font-medium py-2 px-4 text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={40} /> : 
              <div className="flex items-center gap-2">
              <Menu size={40} />
              {
                session && <>
                  <Link 
                    className={`p-2 rounded-md flex justify-center gap-3 items-center`}
                    href="/profile"
                  >
                  <Image
                    className="rounded-full"
                    src={session?.user?.image || "/default-profile.png"}
                    alt="User profile picture"
                    width={50}
                    height={50}
                  />
                  </Link>
                </>
              }
            </div>}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b md:hidden">
            <div className="container p-5 space-y-4">
              <nav className="flex flex-col gap-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl p-2">
                  Home
                </Link>
                <Link href="/search" onClick={() => setIsMenuOpen(false)} className="text-2xl p-2">
                  Search
                </Link>
                <Link href="/generate" onClick={() => setIsMenuOpen(false)} className="text-2xl p-2">
                  Generate a bloog ✨
                </Link>
              </nav>
              
              <div className="pt-4 border-t">
                {session ? (
                  <div className="flex flex-col gap-4">
                    <UserInfo mobileLayout />
                    <Button
                      onClick={() => signOut()}
                      className="text-xl p-6 bg-orange-500 text-white hover:bg-orange-600"
                      variant="ghost"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full text-xl p-4 bg-orange-500 hover:bg-orange-600"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Floating Generate Button */}
      <div className="fixed md:hidden bottom-6 right-6 z-40">
        <Link
          href="/generate"
          className="flex p-6 items-center justify-center h-14 rounded-full border-solid shadow-lg bg-gradient-to-r from-yellow-300 to-orange-500 hover:bg-yellow-100"
        >
          <span className="whitespace-nowrap pr-1 text-white text-2xl font-medium">
            bloog 
          </span>
          <span className="text-4xl">
            ✨
          </span>
        </Link>
      </div>
    </>
  )
}