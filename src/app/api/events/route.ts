import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { Event } from '@/types/index';

export const GET = async (): Promise<NextResponse> => {
  try {
    const events: Event[] = await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch events',
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

    const newEvent = await prisma.event.create({
      data: {
        userId: userId,
        type: data.type || 'default',
        address: data.address || 'Event address',
        date: data.date ? new Date(data.date) : new Date(),
        time: data.time || '12:00',
        maxParticipants: parseInt(data.maxParticipants) || 10,
      },
    });

    await prisma.join.create({
      data: {
        userId: userId,
        eventId: newEvent.id,
      },
    });

    return new NextResponse(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to create event',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
