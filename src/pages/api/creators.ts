import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const requestMethod = req.method;

	switch (requestMethod) {
		case 'GET': {
			const creators = await prisma.user.findMany({
				where: {
					isCreator: true,
				},
			});

			res.json(creators);
			break;
		}
		case 'POST': {
			const creators = await prisma.creator.create({
				data: {
					user: req.body.user,
				},
			});

			res.json(creators);
			break;
		}
	}
}
