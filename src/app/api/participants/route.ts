import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const eventIdParam = searchParams.get('eventId');

    if (!eventIdParam) {
      return new NextResponse(
        JSON.stringify({ error: 'Event ID is required' }),
        { status: 400 },
      );
    }

    const participants = await prisma.user.findMany({
      where: {
        joins: {
          some: {
            eventId: eventIdParam,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(participants), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch participants',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
