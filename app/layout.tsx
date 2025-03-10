import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SessionProvider } from "@/app/provider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "bloogist",
  description: "A modern blog platform built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3631586940502681"
      crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <SessionProvider>
              <Header />
            </SessionProvider>
            <main className="flex-1">{children}</main>
            <Analytics />
            <Footer />
          </div>
      </body>
    </html>
  )
}

