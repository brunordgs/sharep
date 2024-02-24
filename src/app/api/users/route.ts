import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			image: true,
			username: true,
			isVerified: true,
		},
	});

	return NextResponse.json(users);
}

// export async function POST(req: NextRequest) {
// 	const body = await req.json();

// 	const user = await prisma.user.create({
// 		data: {
// 			name: body.name,
// 			username: body.username,
// 			email: body.email,
// 			password: body.password,
// 			image: 'https://ik.imagekit.io/sharep/icon_3uHBhmu8u.svg',
// 		},
// 	});

// 	return new Response(JSON.stringify(user));
// }
