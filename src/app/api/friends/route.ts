import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    const friends = friendships.map((f) => {
      if (f.user1Id === userId) {
        return f.user2;
      } else {
        return f.user1;
      }
    });

    return new NextResponse(JSON.stringify({ friends }), { status: 200 });
  } catch (error) {
    console.error('Error fetching friends:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch friends',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
