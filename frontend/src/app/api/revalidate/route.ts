/**
 * On-demand ISR revalidation endpoint.
 * Called by Wagtail's publish webhook → revalidates only the affected cache tags.
 *
 * Wagtail hook setup (backend/apps/blog/wagtail_hooks.py):
 *   @hooks.register("after_publish_page")
 *   def notify_nextjs(request, page):
 *       requests.post(NEXT_REVALIDATE_URL, json={"secret": SECRET, "tags": [f"blog-post-{page.slug}"]})
 */
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || body.secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token." }, { status: 401 });
  }

  const tags: string[] = body.tags ?? [];

  if (!tags.length) {
    return NextResponse.json({ message: "No tags provided." }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    timestamp: new Date().toISOString(),
  });
}
