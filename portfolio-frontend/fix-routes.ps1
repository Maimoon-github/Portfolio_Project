$appDir = "c:\Users\Aurum\vscode\Portfolio_Project\portfolio-frontend\src\app"

# API Route: Contact
Set-Content -LiteralPath "$appDir\api\contact\route.ts" -Value @"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Rate-limited contact form, forwards to Django
  return NextResponse.json({ success: true });
}
"@

# API Route: OG Image
Rename-Item -LiteralPath "$appDir\api\og\route.ts" -NewName "route.tsx" -ErrorAction SilentlyContinue
Set-Content -LiteralPath "$appDir\api\og\route.tsx" -Value @"
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
"@

# API Route: Revalidate
Set-Content -LiteralPath "$appDir\api\revalidate\route.ts" -Value @"
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Webhook for ISR tag invalidation
  return NextResponse.json({ revalidated: true });
}
"@

# Blog Index
Set-Content -LiteralPath "$appDir\blog\page.tsx" -Value @"
export const revalidate = 300; // ISR: 300

export default function BlogIndexPage() {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
}
"@

# Blog Post Detail
Set-Content -LiteralPath "$appDir\blog\[slug]\page.tsx" -Value @"
export const revalidate = 600; // ISR: 600

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  );
}
"@

# Blog Category
Set-Content -LiteralPath "$appDir\blog\category\[category]\page.tsx" -Value @"
export const revalidate = 300; // ISR: 300

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
    </div>
  );
}
"@

# Blog Tag
Set-Content -LiteralPath "$appDir\blog\tag\[tag]\page.tsx" -Value @"
export const revalidate = 300; // ISR: 300

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  return (
    <div>
      <h1>Tag: {params.tag}</h1>
    </div>
  );
}
"@

# Blog Feed
Set-Content -LiteralPath "$appDir\blog\feed.xml\route.ts" -Value @"
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
"@

# Tools Hub
Set-Content -LiteralPath "$appDir\tools\page.tsx" -Value @"
// SSG
export default function ToolsHubPage() {
  return (
    <div>
      <h1>Tools Hub</h1>
    </div>
  );
}
"@

# Tools Slug
Set-Content -LiteralPath "$appDir\tools\[slug]\page.tsx" -Value @"
// SSG shell + CSR logic
export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Tool: {params.slug}</h1>
    </div>
  );
}
"@

# Privacy
Set-Content -LiteralPath "$appDir\(legal)\privacy\page.tsx" -Value @"
// SSG
export default function PrivacyPage() {
  return <h1>Privacy Policy</h1>;
}
"@

# Terms
Set-Content -LiteralPath "$appDir\(legal)\terms\page.tsx" -Value @"
// SSG
export default function TermsPage() {
  return <h1>Terms of Service</h1>;
}
"@

# About
Set-Content -LiteralPath "$appDir\(marketing)\about\page.tsx" -Value @"
// SSG
export default function AboutPage() {
  return <h1>About</h1>;
}
"@
