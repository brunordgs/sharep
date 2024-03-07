import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	const { slug } = await req.json();
	const session = await getServerSession(authOptions);

	const productName = slug.replaceAll('-', ' ');
	const product = await prisma.product.findFirst({
		where: {
			name: {
				equals: productName,
				mode: 'insensitive',
			},
		},
	});

	if (!product) {
		return NextResponse.json({ message: 'Product not found' }, { status: 404 });
	}

	const favoriteProduct = await prisma.favorite.findFirst({
		where: {
			productId: product.id,
		},
	});

	if (favoriteProduct) {
		await prisma.favorite.delete({
			where: {
				id: favoriteProduct.id,
			},
		});

		return NextResponse.json({ message: 'Product unfavorited' }, { status: 200 });
	}

	await prisma.favorite.create({
		data: {
			userId: session?.user.id as string,
			productId: product.id,
		},
	});

	return NextResponse.json({ message: 'Product favorited' }, { status: 200 });
}

export async function GET(req: Request) {
	const { productId } = await req.json();

	const favoriteProduct = await prisma.favorite.findFirst({
		where: {
			productId,
		},
	});

	return NextResponse.json({ isFavorite: !!favoriteProduct }, { status: 200 });
}
