import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Generate YouTube Summaries | BlogPlatform",
  description: "Generate concise summaries of YouTube videos with our AI-powered tool.",
}

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

