// app/api/search/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  // Add early return for empty queries
  if (!query.trim()) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    )
  }

  try {
    const client = await connectToDatabase()
    const db = client.db('blugr')
    
    const results = await db.collection('generated-texts')
      .aggregate([
        {
          $search: {
            index: "searchIndex", // Changed from "default"
            autocomplete: {
              query: query,
              path: "summary.parsed_summary.title", // Test with single path first
              fuzzy: {
                maxEdits: 1,
                prefixLength: 2
              }
            }
          }
        },
        { $limit: 10 },
        { $project: { score: { $meta: "searchScore" }, document: "$$ROOT" } }
      ])
      .toArray()

    // Always return 200 even with empty results
    return NextResponse.json(results)
    
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}