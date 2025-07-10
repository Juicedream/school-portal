import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return Response.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/teacher") && token?.role !== "TEACHER") {
      return Response.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/student") && token?.role !== "STUDENT") {
      return Response.redirect(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
    matcher: ['/dashboard/:path*']
}
