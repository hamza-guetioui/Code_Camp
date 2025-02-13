import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/reset"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Assuming authentication token is stored in cookies
  const isAuth = !!token || false; // Convert to boolean
  const pathname = request.nextUrl.pathname;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return isAuth ? NextResponse.redirect(new URL("/dashboard", request.url)) : NextResponse.next();
  }

  // Redirect authenticated users trying to access auth-related pages
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect "/" to dashboard for authenticated users
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next(); // Allow access to authenticated routes
}

// Middleware applies to all routes except API, static files, and Next.js internals
export const config = {
  matcher: ["/((?!api|_next|static).*)"],
};
