import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: clubId } = await context.params;

    // Check if the club exists and belongs to the user
    const existingClub = await prisma.golfclub.findUnique({
      where: {
        id: clubId,
        userId: session.user.id,
      },
    });

    if (!existingClub) {
      return NextResponse.json(
        { error: 'Club not found or you do not have permission to update it' },
        { status: 404 },
      );
    }

    // Get the data from the request body
    const data = await req.json();

    // Update the club
    const updatedClub = await prisma.golfclub.update({
      where: {
        id: clubId,
      },
      data,
    });

    return NextResponse.json(updatedClub);
  } catch (error) {
    console.error('Error updating golf club:', error);
    return NextResponse.json(
      { error: 'Failed to update golf club' },
      { status: 500 },
    );
  }
}
