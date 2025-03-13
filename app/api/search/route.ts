import { metadata } from "@/app/layout"
import { connectToDatabase } from "@/app/lib/mongodb"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  
  try {
    const client = await connectToDatabase()
    const database = client.db('blugr')
    const coll = database.collection('generated-texts')
    
    const result = await coll.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: query,
            path: { wildcard: '*' }
          }
        }
      },
      { $limit: 10 },
      {
        $project: {
          content_id: 1,
          metadata: 1,
          summary: 1,
        }
      }
    ]).toArray()

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}