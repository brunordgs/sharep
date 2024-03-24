import { NextRequest, NextResponse } from 'next/server';
import { parseJwt } from './utils/parse';

export default async function middleware(req: NextRequest) {
	const session = req.cookies.get('token');
	const token = parseJwt(session?.value);

	const { pathname, origin } = req.nextUrl;

	// Check authenticated routes when user is logged in
	if (token && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
		return NextResponse.redirect(new URL('/', origin));
	}

	// Check private routes when user isn't logged in
	if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/account'))) {
		return NextResponse.redirect(new URL('/404', origin));
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
