import { NextResponse, NextRequest } from 'next/server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export const revalidate = 0

// Configure S3 client with error checking
const getS3Client = () => {
  if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials not configured')
  }
  
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  })
}

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use request.nextUrl instead of creating new URL
    const { searchParams } = request.nextUrl
    const objectKey = searchParams.get('objectKey')

    // Validate input
    if (!objectKey) {
      return NextResponse.json(
        { error: 'Missing objectKey parameter' },
        { status: 400 }
      )
    }

    // Verify bucket name
    if (!process.env.AWS_BUCKET_NAME) {
      return NextResponse.json(
        { error: 'S3 bucket not configured' },
        { status: 500 }
      )
    }

    const s3Client = getS3Client()
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 })
    return NextResponse.json({ url })

  } catch (error) {
    console.error('S3 API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate URL' },
      { status: 500 }
    )
  }
}