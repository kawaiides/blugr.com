import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Providers } from "@/components/providers"
import favicon from "@/public/favicon.ico"

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
      <meta name="google-adsense-account" content="ca-pub-3631586940502681"></meta>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3631586940502681"
     crossOrigin="anonymous"></script>
      <meta name='impact-site-verification' content='000846bd-83dc-446f-9529-9a17299eea5d'></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='icon' href={favicon.src}/>
      </head>
      <Providers>
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  )
}

