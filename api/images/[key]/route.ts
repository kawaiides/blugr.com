import { NextResponse, NextRequest } from 'next/server';
import { S3 } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {

const s3Client = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

    const bucketName = process.env.AWS_BUCKET_NAME
    const s3Params = { Bucket: bucketName, Key: params.key };


    try {

      const data = await s3Client.getObject(s3Params);
      if (!data.Body) {
        return new NextResponse("Image not found", { status: 404 });
      } 
      const body = await data.Body.transformToByteArray();
      const headers = new Headers();
      headers.set("Content-Type", data.ContentType || "image/jpeg");
      return new NextResponse(body, { status: 200, headers });
    } catch (error) {
      console.error("Error fetching image from S3:", error);
      return new NextResponse("Error fetching image from S3", { status: 500 });
    }
  }