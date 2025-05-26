import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const GET = async (req: Request): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'incoming';

    let where;
    if (type === 'outgoing') {
      where = { senderId: userId };
    } else {
      where = { receiverId: userId };
    }

    const friendRequests = await prisma.friendRequest.findMany({ where });

    return new NextResponse(JSON.stringify(friendRequests), { status: 200 });
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch friend requests',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
