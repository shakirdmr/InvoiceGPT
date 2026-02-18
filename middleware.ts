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
  "/sitemap.xml",
  "/robots.txt",
];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isPublic = PUBLIC_PATHS.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
