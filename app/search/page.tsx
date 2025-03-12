// app/search/page.tsx

'use client'

import { useState, useEffect } from "react"
import BlogCard from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { BlogPost } from "@/types/blog"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }
      
      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("Search error:", err)
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Optional: Add debounced search
  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch()
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [query])

  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">
          Search Blogs
        </h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Searching...
              </div>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="space-y-4">
        {results.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">
              {results.length} {results.length === 1 ? "result" : "results"} found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </>
        ) : (
          isLoading ? null : (
            <p className="text-center py-12 text-muted-foreground">
              No results found. Try a different search term.
            </p>
          )
        )}
      </div>
    </div>
  )
}