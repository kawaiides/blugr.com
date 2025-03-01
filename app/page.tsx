import { getTrendingBlogs, getLatestBlogs, getForYouBlogs } from "@/lib/data"
import BlogCard from "@/components/blog-card"
import type { Metadata } from "next"

// Set revalidation period for ISR (e.g., 1 hour = 3600 seconds)
export const revalidate = 3600

// Add metadata for SEO
export const metadata: Metadata = {
  title: "BlogPlatform - Home",
  description: "Discover trending, personalized, and latest blog posts on technology, programming, and more.",
  openGraph: {
    title: "BlogPlatform - Home",
    description: "Discover trending, personalized, and latest blog posts on technology, programming, and more.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BlogPlatform",
      },
    ],
  },
}

export default function Home() {
  const trendingBlogs = getTrendingBlogs().slice(0, 4)
  const forYouBlogs = getForYouBlogs().slice(0, 4)
  const latestBlogs = getLatestBlogs().slice(0, 4)

  return (
    <div className="container py-8 space-y-12">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forYouBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Latest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  )
}

