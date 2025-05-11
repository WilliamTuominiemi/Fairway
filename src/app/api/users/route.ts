import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try {
    const users = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
