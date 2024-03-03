import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	const { pathname } = req.nextUrl;

	// Check authenticated routes when user is logged in
	if (token && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	// Check private routes when user isn't logged in
	if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/account'))) {
		return NextResponse.redirect(new URL('/404', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
