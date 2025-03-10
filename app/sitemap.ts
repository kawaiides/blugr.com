import { connectToDatabase } from "@/lib/mongodb"

export default async function sitemap() {
  const baseUrl = "https://blogplatform.com"
  const client = await connectToDatabase()
  const collection = client.db("blugr").collection("generated-texts")
  const blogs = await collection.find().toArray()
  // Get all blog posts
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.content_id}`,
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

