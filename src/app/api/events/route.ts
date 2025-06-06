import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { Event } from '@/types/index';

export const GET = async (): Promise<NextResponse> => {
  try {
    // Get the current authenticated user
    const session = await auth();
    const currentUserId = session?.user?.id;
    // Base query to fetch events
    const eventsQuery: Prisma.EventFindManyArgs = {
      orderBy: {
        date: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    };

    // If user is authenticated, handle friendsOnly filtering
    if (currentUserId) {
      // Get all friendsOnly events
      const friendsOnlyEvents = await prisma.event.findMany({
        where: {
          friendsOnly: true,
        },
        select: {
          userId: true,
        },
      });

      // Get IDs of hosts of friendsOnly events
      const friendsOnlyHostIds = friendsOnlyEvents.map((event) => event.userId);

      // Find which hosts the current user is friends with
      const friendships = await prisma.friendship.findMany({
        where: {
          OR: [
            { user1Id: currentUserId, user2Id: { in: friendsOnlyHostIds } },
            { user2Id: currentUserId, user1Id: { in: friendsOnlyHostIds } },
          ],
        },
        select: {
          user1Id: true,
          user2Id: true,
        },
      });

      // Get IDs of friends who are hosting friendsOnly events
      const friendHostIds = friendships.map((friendship) =>
        friendship.user1Id === currentUserId
          ? friendship.user2Id
          : friendship.user1Id,
      );

      // Modify the query to exclude friendsOnly events unless the user is friends with the host
      // or the user is the host
      eventsQuery.where = {
        OR: [
          { friendsOnly: false },
          { userId: currentUserId },
          {
            AND: [{ friendsOnly: true }, { userId: { in: friendHostIds } }],
          },
        ],
      };
    } else {
      // For non-authenticated users, only show public events
      eventsQuery.where = {
        friendsOnly: false,
      };
    }

    const events: Event[] = await prisma.event.findMany(eventsQuery);

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
        friendsOnly: data.friendsOnly || false,
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
