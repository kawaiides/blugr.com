"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeneratePage() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)

    // Enhanced URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(youtubeUrl)) {
      setError("Please enter a valid YouTube URL")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("https://2336-49-207-218-126.ngrok-free.app/process-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any required headers by your API
          "ngrok-skip-browser-warning": "true" // If using ngrok's free tier
        },
        body: JSON.stringify({
          url: youtubeUrl
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.summary) throw new Error("Invalid response format")
      setSummary(data.summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate summary")
    } finally {
      setLoading(false)
    }
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
            placeholder="Enter YouTube video URL (e.g., https://youtube.com/watch?v=...)"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Summary"}
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md">
            ⚠️ {error}
          </div>
        )}

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle>Video Summary</CardTitle>
              <CardDescription>Auto-generated summary for the provided YouTube video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line leading-relaxed">{summary}</div>
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