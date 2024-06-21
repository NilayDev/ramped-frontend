import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect if user is logged in and tries to access login or register page
  if (token && (pathname === "/login" || pathname === "/register")) {
    return Response.redirect(new URL("/", request.url));
  }

  // Redirect to login if trying to access protected routes without token
  const protectedRoutes = ["/", "/dashboard"]; // Add more routes as needed
  if (!token && protectedRoutes.includes(pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}
