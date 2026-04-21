import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tag, secret } = body;

    if (secret !== process.env.REVALIDATE_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!tag || typeof tag !== "string") {
      return new Response("Missing or invalid tag", { status: 400 });
    }

    // This is the cleanest way to satisfy Next.js 16 TypeScript definition
    revalidateTag(tag);

    return Response.json({ revalidated: true, tag });
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response("Invalid request body", { status: 400 });
  }
}