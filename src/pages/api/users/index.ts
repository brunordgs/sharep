import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			image: true,
			username: true,
			isVerified: true,
		},
	});

	return res.json(users);
}
