import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("admin_token");
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/admin/auth");

  if (!token && pathname.startsWith("/admin") && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/admin/auth/login", request.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
