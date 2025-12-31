import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user has a token (is logged in), this callback runs

    // Check if accessing admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const role = req.nextauth.token?.role;

      // If role is NOT admin or restaurant_owner, redirect to home
      if (role !== "admin" && role !== "restaurant_owner") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Check if accessing delivery routes
    if (req.nextUrl.pathname.startsWith("/delivery")) {
      const role = req.nextauth.token?.role;

      // If role is NOT delivery, redirect to home
      if (role !== "delivery") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      // This ensures the middleware only runs if the user is authenticated
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware ONLY to protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/delivery/:path*",
    "/cartU",
    "/ordersU",
    "/favoritesU",
    "/profileU",
    "/settingsU"
  ],
};

