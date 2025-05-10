import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');

    if (!userIdParam && (!session || !session.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = userIdParam || (session?.user?.id ?? '');
    const stats = await prisma.stats.findUnique({
      where: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
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

    const updatedStats = await prisma.stats.upsert({
      where: {
        userId: userId,
      },
      update: {
        handicap: data.handicap,
        averageScore: data.averageScore,
        drivingAccuracy: data.drivingAccuracy,
        greensInRegulation: data.greensInRegulation,
        puttsPerRound: data.puttsPerRound,
      },
      create: {
        userId: userId,
        handicap: data.handicap,
        averageScore: data.averageScore,
        drivingAccuracy: data.drivingAccuracy,
        greensInRegulation: data.greensInRegulation,
        puttsPerRound: data.puttsPerRound,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Stats updated successfully',
        stats: updatedStats,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to update stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
