// components/screenshot-image.tsx

import Image from 'next/image'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export default async function ScreenshotImage({ objectKey, alt }: { objectKey: string, alt: string }) {
  try {
    // Validate input parameters
    if (!objectKey || typeof objectKey !== 'string') {
      throw new Error('Invalid object key provided')
    }

    // Verify environment variables
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error('S3_BUCKET_NAME environment variable not configured')
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey.trim(), // Ensure no whitespace in key
    })

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    })

    return (
      <div className="relative w-full aspect-video">
        <Image
          src={url}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII='
          alt={alt}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    )
  } catch (error) {
    console.error('S3 Error:', error)
    return (
      <div className="bg-red-50 p-4 text-red-700 rounded-lg">
        <>{objectKey}</>
        {error instanceof Error ? error.message : 'Failed to load image'}
      </div>
    )
  }
}