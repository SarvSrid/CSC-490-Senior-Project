import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user");

  // Redirect to sign-in page if user is not authenticated
  if (!user && !request.nextUrl.pathname.startsWith("/auth/signin")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all routes under /dashboard
};