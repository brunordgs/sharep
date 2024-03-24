import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (res.status === 401) {
		return NextResponse.json({ message: 'Invalid email address or password' }, { status: 401 });
	}

	const data = await res.json();

	cookies().set('token', data.accessToken);

	return NextResponse.json({ res });
}
