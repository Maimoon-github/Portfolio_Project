// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.headers.get("X-Revalidate-Secret")
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const body = await request.json()
  const tag = body.tag

  if (!tag) {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 })
  }

  revalidateTag(tag, {})
  return NextResponse.json({ revalidated: true, tag })
}