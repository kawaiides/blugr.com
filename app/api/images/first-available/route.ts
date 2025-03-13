// app/api/images/first-available/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getS3Client } from '../route'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const contentId = searchParams.get('contentId')

    if (!contentId) {
      return NextResponse.json(
        { error: 'Missing contentId parameter' },
        { status: 400 }
      )
    }

    if (!process.env.AWS_BUCKET_NAME) {
      return NextResponse.json(
        { error: 'S3 bucket not configured' },
        { status: 500 }
      )
    }

    const s3Client = getS3Client()
    const prefix = `screenshots/${contentId}/`

    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: prefix,
    })

    const listResponse = await s3Client.send(listCommand)
    const contents = listResponse.Contents || []

    // Find the first PNG image
    const imageObject = contents.find((obj) => obj.Key?.endsWith('.png'))

    if (!imageObject?.Key) {
      return NextResponse.json(
        { error: 'No images found in directory' },
        { status: 404 }
      )
    }

    // Generate presigned URL for the found image
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageObject.Key,
    })

    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 60 })
    return NextResponse.json({ url, objectKey: imageObject.Key })
  } catch (error) {
    console.error('Error fetching first available image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    )
  }
}