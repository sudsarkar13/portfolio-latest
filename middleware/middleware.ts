import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Get token from request cookies
	const token = request.cookies.get("adminToken")?.value;

	// Check if the request is for admin dashboard
	if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
		if (!token) {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}
	}

	// Prevent accessing login page if already authenticated
	if (request.nextUrl.pathname === "/admin/login") {
		if (token) {
			return NextResponse.redirect(new URL("/admin/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/dashboard/:path*", "/admin/login"],
};
