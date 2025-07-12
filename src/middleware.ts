import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("middleware ran", req.nextUrl.pathname);
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    console.log("Token in middleware:", token);

    if (pathname.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (
      pathname.startsWith("/dashboard/teacher") &&
      token?.role !== "TEACHER"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      pathname.startsWith("/dashboard/student") &&
      token?.role !== "STUDENT"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: "/login" },
  }
);
export const config = {
  matcher: ["/dashboard(.*)", "/login"],
  // matcher: ["/:path*"],
};
