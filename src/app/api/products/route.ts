import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const products = await prisma.product.findMany({
		skip: 3,
		take: 4,
		select: {
			image: true,
			url: true,
			name: true,
			description: true,
		},
	});

	return NextResponse.json(products, { status: 200 });
}
