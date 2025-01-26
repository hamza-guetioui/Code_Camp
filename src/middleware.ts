import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that don't require authentication
const publicRoutes = ["/login", "/register","/reset"];

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("token"); // Assuming you use cookies for auth
  const pathname = request.nextUrl.pathname;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Continue to the route
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static).*)"], // Apply middleware to all routes except API, static files, etc.
};
