import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session"); // Periksa session dari cookie

  if (!session || session.value !== "active") {
    // Jika tidak ada session atau session tidak valid, arahkan ke halaman login
    if (!request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (session && session.value === "active" && request.nextUrl.pathname.startsWith("/login")) {
    // Jika session valid dan pengguna mencoba mengakses halaman login, arahkan ke homepage
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next(); // Izinkan akses jika session valid
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Terapkan middleware ke semua halaman kecuali API, _next, static, dan favicon
};
