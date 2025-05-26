import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: friendId } = await context.params;

    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friend) {
      return NextResponse.json({ error: 'Friend not found' }, { status: 404 });
    }

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: friendId },
          { senderId: friendId, receiverId: session.user.id },
        ],
      },
    });

    if (existingRequest && existingRequest.senderId === session.user.id) {
      await prisma.friendRequest.delete({
        where: { id: existingRequest.id },
      });
      return NextResponse.json({ message: 'Friend request cancelled' });
    } else if (
      existingRequest &&
      existingRequest.senderId !== session.user.id
    ) {
      await prisma.friendRequest.delete({
        where: { id: existingRequest.id },
      });

      await prisma.friendship.create({
        data: {
          user1Id: session.user.id,
          user2Id: friendId,
        },
      });

      return NextResponse.json({ message: 'Friend request accepted' });
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: session.user.id,
        receiverId: friendId,
      },
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.error('Error sending friend request:', error);
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 },
    );
  }
}
