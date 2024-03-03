import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
	try {
		const { name, username, email, password } = await req.json();

		if (username.length > 15) {
			throw new Error('Username must be at maximum 15 characters long');
		}

		const userAlreadyExists = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userAlreadyExists) {
			throw new Error('Username or email already exists');
		}

		const hashedPassword = await hash(password, 10);

		await prisma.user.create({
			data: {
				name,
				username,
				email,
				password: hashedPassword,
				image: 'https://ik.imagekit.io/sharep/Group_thINgsmo8.svg',
			},
		});
	} catch (e) {
		console.log(e);
	}

	return NextResponse.json({ message: 'User was registered' }, { status: 201 });
}
