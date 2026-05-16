// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Basic validation + honeypot check (implement honeypot field in form)
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  if (body.honeypot) {
    // Bot detected
    return NextResponse.json({ success: false }, { status: 200 })
  }

  // Forward to Django backend or send email
  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, { method: "POST", body: JSON.stringify(body) })

  return NextResponse.json({ success: true })
}