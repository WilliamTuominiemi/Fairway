import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');

    if (!userIdParam && (!session || !session.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = userIdParam || (session?.user?.id ?? '');

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch user',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
