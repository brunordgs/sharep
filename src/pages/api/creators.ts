import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const requestMethod = req.method;

	switch (requestMethod) {
		case 'GET': {
			const creators = await prisma.user.findMany({
				where: {
					isCreator: true,
					NOT: {
						username: 'brunordgs',
					},
				},
				select: {
					id: true,
					name: true,
					username: true,
					image: true,
					isVerified: true,
				},
			});

			res.json(creators);
			break;
		}

		case 'POST': {
			const [creators] = await Promise.all([
				prisma.creator.create({
					data: {
						user: {
							connect: {
								id: req.body.id,
							},
						},
					},
				}),
				prisma.user.update({
					where: {
						id: req.body.id,
					},
					data: {
						isCreator: true,
					},
				}),
			]);

			res.json(creators);
			break;
		}

		case 'DELETE': {
			await Promise.all([
				prisma.creator.delete({
					where: {
						userId: req.body.id,
					},
				}),
				prisma.user.update({
					where: {
						id: req.body.id,
					},
					data: {
						isCreator: false,
					},
				}),
			]);

			res.status(200);
			break;
		}
	}
}
