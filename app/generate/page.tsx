"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Note: Metadata must be exported from a Server Component, so we need to create a separate layout file
// This is just a comment to explain why we're not adding metadata directly here

export default function GeneratePage() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = () => {
    setLoading(true)
    setError(null)

    // Validate YouTube URL
    if (!youtubeUrl.includes("youtube.com/watch?v=") && !youtubeUrl.includes("youtu.be/")) {
      setError("Please enter a valid YouTube URL")
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSummary(
        `This is a generated summary for the YouTube video at ${youtubeUrl}.\n\nThe video discusses key concepts related to its topic, including important points, examples, and practical applications. It covers background information, current trends, and future implications. The presenter shares insights based on research and experience, making complex ideas accessible to viewers. There are several actionable takeaways that viewers can apply in their own contexts.`,
      )
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">YouTube Summary Generator</h1>
          <p className="text-muted-foreground">Enter a YouTube video URL to generate a summary of its content</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Enter YouTube video URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Summary"}
          </Button>
        </div>

        {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md">{error}</div>}

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle>Video Summary</CardTitle>
              <CardDescription>Auto-generated summary for the provided YouTube video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{summary}</div>
            </CardContent>
          </Card>
        )}

        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Paste a YouTube video URL in the input field above</li>
            <li>Click the "Generate Summary" button</li>
            <li>Our AI will analyze the video content and generate a concise summary</li>
            <li>The summary will include key points and insights from the video</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

