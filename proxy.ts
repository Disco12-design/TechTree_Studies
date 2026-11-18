import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes accessible without authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/signin",
  "/auth/signup",
  "/auth/sso-callback",
  "/pricing-billing",
  "/.well-known(.*)",
]);

// Protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/study-notes(.*)",
  "/practice-exam(.*)",
  "/attempts(.*)",
  "/pbq(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    const authState = await auth();
    const { userId } = authState;
    const { pathname } = req.nextUrl;

    // If trying to access protected route without being signed in
    if (isProtectedRoute(req) && !userId) {
      return authState.redirectToSignIn();
    }

    // If signed in and trying to access sign-in/sign-up pages
    if (userId && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // For all other requests, proceed normally
    return NextResponse.next();
  },
  { 
    signInUrl: "/auth/signin", 
    signUpUrl: "/auth/signup",
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
