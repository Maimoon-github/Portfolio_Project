import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  // Dynamic OG image generation
  return new ImageResponse(
    (
      <div style={{ display: 'flex', background: 'white', width: '100%', height: '100%' }}>
        OG Image
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
