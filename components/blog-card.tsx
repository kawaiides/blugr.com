'use client'

import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import ScreenshotImage from "./screenshot-image"
import type { BlogPost } from "@/types/blog"

export default function BlogCard({ blog }: { blog: BlogPost }) {
  // Safe access to nested properties
  const firstH2 = blog.summary.parsed_summary.body[0].h2
  let imageName =`${firstH2.split(" ").join("_")}_0.png`
  imageName = `screenshots/${blog.content_id}/` + imageName

  return (
    <Card className="overflow-hidden">
      <Link href={`/blog/${blog.content_id}`}>
        <div className="aspect-video relative">
          <ScreenshotImage 
            objectKey={imageName}
            alt={blog.summary.parsed_summary.title} 
          />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl line-clamp-2">{blog.summary.parsed_summary.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-2">{blog.summary.parsed_summary.blog_desc}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{formatDate(blog.metadata.created_at)}</p>
        </CardFooter>
      </Link>
    </Card>
  )
}
