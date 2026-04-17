import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicHome = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect signed-in users away from the homepage to /dashboard
  if (userId && isPublicHome(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard — redirect unauthenticated users to sign-in
  if (!userId && isProtectedRoute(req)) {
    return auth.protect() as unknown as NextResponse;
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
