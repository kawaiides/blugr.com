import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const API_URL = process.env.BACKEND_URL
  
  if (!API_URL) {
    return NextResponse.json(
      { error: 'Processor API not configured' },
      { status: 500 }
    )
  }

  try {
    const { url } = await request.json()
    
    // Validate input
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Forward request to processing service
    const response = await fetch(API_URL+"/process-video", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers for your external API
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`External API error: ${error}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Video processing error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    )
  }
}