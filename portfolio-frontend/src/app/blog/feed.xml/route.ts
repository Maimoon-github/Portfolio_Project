// src/app/blog/feed.xml/route.ts
// [Route Handler] RSS feed
import { NextResponse } from "next/server"

// Placeholder RSS generation (real feed in Phase 1)
export async function GET() {
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Alex Reeves Blog</title>
    <link>https://yourdomain.dev/blog</link>
    <description>AI/ML engineering insights</description>
  </channel>
</rss>`

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  })
}