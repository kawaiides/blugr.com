"use client"

import { useState } from "react"
import { searchBlogs } from "@/lib/data"
import BlogCard from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Note: Metadata must be exported from a Server Component, so we need to create a separate layout file
// This is just a comment to explain why we're not adding metadata directly here

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ReturnType<typeof searchBlogs>>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    const searchResults = searchBlogs(query)
    setResults(searchResults)
    setSearched(true)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">Search Blogs</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search for blogs by title, description, or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {searched && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No results found. Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  )
}

