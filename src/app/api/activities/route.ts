import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    const activities = await prisma.activity.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return new NextResponse(JSON.stringify(activities), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch activities',
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

    const newActivity = await prisma.activity.create({
      data: {
        userId: userId,
        type: data.type || 'default',
        details: data.details || 'Activity details',
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Activity created successfully',
        activity: newActivity,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to create activity',
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
