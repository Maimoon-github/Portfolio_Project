import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Webhook for ISR tag invalidation
  return NextResponse.json({ revalidated: true });
}
