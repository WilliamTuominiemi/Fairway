import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth();

    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');

    if (!userIdParam && (!session || !session.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = userIdParam || (session?.user?.id ?? '');

    const golfclubs = await prisma.golfclub.findMany({
      where: {
        userId,
      },
    });

    const typeOrder = ['Driver', 'Wood', 'Hybrid', 'Iron', 'Wedge', 'Putter'];

    const sortedClubs = golfclubs.sort((a, b) => {
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    });

    return new NextResponse(JSON.stringify(sortedClubs), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch golfclubs',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    const data = await req.json();

    const newGolfclub = await prisma.golfclub.create({
      data: {
        userId: userId,
        type: data.type,
        name: data.name,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Golfclub created successfully',
        activity: newGolfclub,
      }),
      { status: 201 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to create golfclub',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
