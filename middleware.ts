import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/api/auth",
  "/api/razorpay/webhook",
  // Programmatic SEO & marketing pages — no auth required
  "/gst-invoice",
  "/guides",
  "/about",
  "/privacy",
  "/sitemap.xml",
  "/robots.txt",
];

const AUTH_ONLY_PATHS = ["/", "/login"];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isPublic = PUBLIC_PATHS.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  // Logged-in users hitting landing page or login → send to dashboard
  if (session && AUTH_ONLY_PATHS.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Logged-out users hitting protected routes → send to login
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
