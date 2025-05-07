import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try {
    const users = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch users',
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
