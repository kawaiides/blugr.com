import { notFound } from "next/navigation"
import type { Metadata } from "next"
import clientPromise from "@/api/mongodb"
import { formatDate } from "@/lib/utils"
import type { BlogPost, BlogSection } from "@/types/blog"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { content_id: string } }): Promise<Metadata> {
  const blog = await getBlogPost(params.content_id)

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found",
    }
  }

  return {
    title: blog.summary.parsed_summary.title,
    description: blog.summary.parsed_summary.blog_desc,
    openGraph: {
      title: blog.summary.parsed_summary.title,
      description: blog.summary.parsed_summary.blog_desc,
      type: "article",
      publishedTime: blog.created_at,
      url: blog.url,
    },
  }
}

async function getBlogPost(content_id: string): Promise<BlogPost | null> {
  try {
    const client = await clientPromise
    const collection = client.db("blugr").collection("generated-texts")
    
    const post = await collection.findOne({ content_id })
    return post as BlogPost | null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function BlogPage({ params }: { params: { content_id: string } }) {
  const blog = await getBlogPost(params.content_id)

  if (!blog) {
    notFound()
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <article className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {blog.summary.parsed_summary.title}
          </h1>
          <div className="flex items-center justify-between text-muted-foreground">
            <div>
            Watch the video <a 
              href={blog.url} 
              target="_blank" 
              className="hover:underline"
            >
              here
            </a>
            </div>
            <p>{formatDate(blog.created_at)}</p>
          </div>
        </div>

        <p className="text-xl leading-relaxed">
          {blog.summary.parsed_summary.blog_desc}
        </p>

        <div className="space-y-8">
          {blog.summary.parsed_summary.body.map((section: BlogSection, index: number) => (
            <div key={index} className="space-y-4">
              {section.h2 && (
                <h2 className="text-2xl font-bold tracking-tight">
                  {section.h2}
                </h2>
              )}
              {section.p && (
                <p className="leading-relaxed">
                  {section.p}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}