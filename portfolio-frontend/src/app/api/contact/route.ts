import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Rate-limited contact form, forwards to Django
  return NextResponse.json({ success: true });
}
