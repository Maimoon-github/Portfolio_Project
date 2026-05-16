// src/app/blog/feed.xml/route.ts  [Route Handler]
export async function GET() {
  // In production, fetch latest posts and generate RSS XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Alex Reeves Blog</title>
    <link>https://yourdomain.dev/blog</link>
    <description>Latest posts</description>
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  })
}