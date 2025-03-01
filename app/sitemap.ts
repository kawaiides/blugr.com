import { blogs } from "@/lib/data"

export default async function sitemap() {
  const baseUrl = "https://blogplatform.com"

  // Get all blog posts
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: blog.date,
  }))

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacypolicy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/generate`,
      lastModified: new Date(),
    },
  ]

  return [...staticPages, ...blogUrls]
}

