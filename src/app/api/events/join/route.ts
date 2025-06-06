import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const data = await req.json();
    const eventId = data.eventId;

    if (!eventId) {
      return new NextResponse(
        JSON.stringify({ error: 'Event ID is required' }),
        { status: 400 },
      );
    }

    // Check if the user has already joined the event
    const existingJoin = await prisma.join.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (existingJoin) {
      return new NextResponse(
        JSON.stringify({ message: 'User already joined this event' }),
        { status: 200 },
      );
    }

    // Add the user to the event
    const join = await prisma.join.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });

    return new NextResponse(JSON.stringify(join), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to join event',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
