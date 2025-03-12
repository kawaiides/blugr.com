'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import placeholder from "@/public/placeholder.png"

export default function ScreenshotImage({ objectKey, alt, onError }: { 
  objectKey: string, 
  alt: string,
  onError?: () => void, // Add optional onError prop
}) {
  const [url, setUrl] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        if (!objectKey) {
          throw new Error('Invalid object key provided')
        }

        const response = await fetch(
          `/api/images?objectKey=${encodeURIComponent(objectKey)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch image URL')
        }

        const data = await response.json()
        setUrl(data.url)
      } catch (err) {
        console.error('Image load error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load image')
        if (onError) { // Call onError if it exists
          onError();
        }
      }
    }

    fetchUrl()
  }, [objectKey, onError]) // Added onError to dependency array

  if (error) {
    return (
      <div className="bg-red-50 p-4 text-red-700 rounded-lg aspect-video flex items-center justify-center">
        {error}
      </div>
    )
  }

  if (!url) {
    return (
      <div className="aspect-video flex items-center justify-center bg-muted rounded-lg">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (url != placeholder.src) {
    return (
      <div className="relative w-full aspect-video">
        <Image
          src={url}
          alt={alt}
          placeholder='blur'
          blurDataURL={placeholder.src}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onError={() => {
            setUrl(placeholder.src);
            if (onError) { // Call onError if it exists
              onError();
            }
          }}
        />
      </div>
    )
  }
}