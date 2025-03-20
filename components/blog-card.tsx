'use client'

import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import { useState, useEffect } from "react"
import { formatDate } from "@/app/lib/utils"
import Link from "next/link"
import ScreenshotImage from "./screenshot-image"
import type { BlogPost } from "@/types/blog"

export default function BlogCard({ blog }: { blog: BlogPost }) {
  const [currentObjectKey, setCurrentObjectKey] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)

  // Generate initial image key from H2
  useEffect(() => {
    const firstH2 = blog.summary.parsed_summary?.body?.[0]?.h2 || 'default';
    const initialImage = `${firstH2.split(" ").join("_")}_0.png`
    const initialKey = `screenshots/${blog.content_id}/${initialImage}`
    setCurrentObjectKey(initialKey)
    setHasError(false) // Reset error on blog change
  }, [blog])

  const handleImageError = async () => {
    if (hasError) return // Prevent multiple requests
    setHasError(true)

    try {
      const res = await fetch(`/api/images/first-available?contentId=${blog.content_id}`)
      if (!res.ok)  {
        setHasError(true)
        throw new Error('Failed to fetch fallback')
      }
      const { objectKey } = await res.json()
      setCurrentObjectKey(objectKey)
      setHasError(false)
    } catch (err) {
      setHasError(true)
      console.error('Fallback image fetch failed:', err)
    }
  }

  if (!currentObjectKey) return null // Or a loading skeleton

  if (!hasError) return (
    <>
      {blog && 
      <Card className="overflow-hidden">
      <Link href={`/blog/${blog.content_id}`}>
        <div className="aspect-video relative">
          <ScreenshotImage
            objectKey={currentObjectKey}
            alt={blog.summary.parsed_summary.title}
            onError={handleImageError}
          />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl line-clamp-2">
              {blog.summary.parsed_summary.title}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-2">
            {blog.summary.parsed_summary.blog_desc}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {formatDate(blog.metadata.created_at)}
          </p>
        </CardFooter>
      </Link>
    </Card>}
    </>
  )
}