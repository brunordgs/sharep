import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		const { name, username, bio } = await req.json();

		if (!session) {
			throw new Error('No session was found');
		}

		await prisma.user.update({
			where: {
				email: session.user.email!,
			},
			data: {
				name,
				username,
				bio,
			},
		});
	} catch (e) {
		console.log(e);
	}

	return NextResponse.json({ message: 'User was updated' }, { status: 200 });
}
