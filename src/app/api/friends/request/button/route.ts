import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const GET = async (req: Request): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse(JSON.stringify('unauthorized'), { status: 200 });
    }

    const thisUserId = session.user.id;
    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get('userId');

    if (!otherUserId) {
      return new NextResponse('Bad Request: Missing userId', { status: 400 });
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: thisUserId, user2Id: otherUserId },
          { user1Id: otherUserId, user2Id: thisUserId },
        ],
      },
    });
    if (existingFriendship) {
      return new NextResponse(JSON.stringify('friends'), { status: 200 });
    }

    if (thisUserId === otherUserId) {
      return new NextResponse(JSON.stringify('own profile'), { status: 200 });
    }

    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: thisUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: thisUserId },
        ],
      },
    });
    if (!friendRequest) {
      return new NextResponse(JSON.stringify('add'), { status: 200 });
    }

    if (friendRequest.senderId === thisUserId) {
      return new NextResponse(JSON.stringify('cancel'), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify('accept'), { status: 200 });
    }
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
