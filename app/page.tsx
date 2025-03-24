import BlogCard from "@/components/blog-card"
import type { Metadata } from "next"
import { getLatestBlogs } from "@/app/lib/data"

// Set revalidation period for ISR (e.g., 1 hour = 3600 seconds)
export const revalidate = 10

// Add metadata for SEO
export const metadata: Metadata = {
  title: "Bloogist - Home",
  description: "Discover trending, personalized, and latest blog posts on technology, programming, and more.",
  openGraph: {
    title: "Bloogist - Home",
    description: "Discover trending, personalized, and latest blog posts on technology, programming, and more.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bloogist",
      },
    ],
  },
  robots: "follow, index",
}

export default async function Home() {
  const latestBlogs = await getLatestBlogs(50)

  return (
    <div className="container py-8 space-y-12">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Latest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.content_id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  )
}
