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

    // Fetch join records with associated user data, sorted by join time
    const joinRecords = await prisma.join.findMany({
      where: {
        eventId: eventIdParam,
      },
      include: {
        user: true, // Include user data in the results
      },
      orderBy: {
        createdAt: 'asc', // Sort by earliest join first
      },
    });

    // Extract users from join records
    const participants = joinRecords.map((record) => record.user);

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
