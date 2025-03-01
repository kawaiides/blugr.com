import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | BlogPlatform",
  description: "Get in touch with the BlogPlatform team. We'd love to hear from you!",
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

