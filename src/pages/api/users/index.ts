import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const requestMethod = req.method;

	switch (requestMethod) {
		case 'POST': {
			const user = await prisma.user.create({
				data: {
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					image: 'https://ik.imagekit.io/sharep/icon_3uHBhmu8u.svg',
				},
			});

			res.json(user);
			break;
		}

		case 'GET': {
			const users = await prisma.user.findMany({
				select: {
					name: true,
					image: true,
					username: true,
					isVerified: true,
				},
			});

			res.json(users);
			break;
		}
	}
}
