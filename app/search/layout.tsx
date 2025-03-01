import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Blogs | BlogPlatform",
  description: "Search for blogs on technology, programming, and more on BlogPlatform.",
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

