/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Replace this with your actual database query
    // This is just an example response
    const character = {
      id: params.id,
      name: "Example Character",
      // Add other character properties
    };

    return NextResponse.json(character);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch character' },
      { status: 500 }
    );
  }
} 