/**
 * Next.js proxy for the Django login endpoint.
 * Receives credentials from the login form, forwards to Django,
 * and passes the httpOnly cookie back to the browser.
 * The browser never directly talks to Django for auth.
 */
import { NextRequest, NextResponse } from "next/server";

const INTERNAL_API = process.env.INTERNAL_API_URL ?? "http://localhost:8000";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const djangoResponse = await fetch(`${INTERNAL_API}/api/v1/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await djangoResponse.json();

  if (!djangoResponse.ok) {
    return NextResponse.json(data, { status: djangoResponse.status });
  }

  // Forward Set-Cookie headers from Django to the browser
  const response = NextResponse.json(data, { status: djangoResponse.status });
  djangoResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append("Set-Cookie", value);
    }
  });

  return response;
}
