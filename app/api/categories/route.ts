// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/app/lib/prisma';
import { authOption } from '@/app/lib/auth';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const categories = await prisma.category.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    
    const newCategory = await prisma.category.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}