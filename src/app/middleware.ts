// middleware.ts (at root level)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("your-session-token");
  const url = req.nextUrl;

  // Implement real logic for session extraction and role checking
  const userRole: string = "STUDENT"; // demo only

  if (url.pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (url.pathname.startsWith("/teacher") && userRole !== "TEACHER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/teacher/:path*",
    "/dashboard/student/:path*",
    // Add other paths that need protection
  ],
};