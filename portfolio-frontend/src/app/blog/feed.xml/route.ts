import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return new NextResponse('<rss></rss>', {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
