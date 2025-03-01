import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Blog } from "@/lib/data"

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/blog/${blog.id}`}>
        <div className="aspect-video relative">
          <Image src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{blog.category}</p>
            <h3 className="font-semibold text-xl line-clamp-2">{blog.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-sm">{blog.author}</p>
          <p className="text-sm text-muted-foreground">{formatDate(blog.date)}</p>
        </CardFooter>
      </Link>
    </Card>
  )
}

