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
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed')
      }
  
      // Handle empty results
      const searchResults = data.length > 0 
        ? data.map((result: any) => result.document)
        : []
      
      setResults(searchResults)
      setSearched(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    }
  }
  
  useEffect(() => {
    if (query.trim()) {
      const handler = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(handler);
    }
  }, [query]);

  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">
          Search Blogs
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
            {isSearching ? (
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
        </div>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>

      {searched && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">
              No results found. Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  )
}