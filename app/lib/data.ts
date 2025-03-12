import { connectToDatabase } from './mongodb'
import type { BlogPost } from '@/types/blog'

export async function getLatestBlogs(num_blogs: number): Promise<BlogPost[]> {
  try {
    const client = await connectToDatabase()
    const collection = client.db("blugr").collection<BlogPost>("generated-texts")
    const blogs = await collection
      .find({})
      .sort({ 'metadata.created_at': -1 }) // Sort by creation date descending
      .limit(num_blogs)
      .toArray()

    return blogs.map((blog: BlogPost & { _id: { toString: () => string }, metadata: { created_at: string } }) => ({
      ...blog,
      _id: blog._id.toString(), // Convert ObjectId to string
      metadata: {
      ...blog.metadata,
      created_at: new Date(blog.metadata.created_at).toISOString() // Convert string to Date and then to string
      }
    }))
  } catch (error) {
    console.error('Failed to fetch latest blogs:', error)
    return []
  }
}

export async function searchBlogs(query: string) {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error('Search failed')
    return await res.json()
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}