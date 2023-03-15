import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const requestMethod = req.method;

	switch (requestMethod) {
		case 'GET': {
			const user = await prisma.user.findUnique({
				where: {
					username: req.query.username as string,
				},
				select: {
					name: true,
					bio: true,
					username: true,
					image: true,
					social: {
						select: {
							website: true,
							github: true,
							twitch: true,
							youtube: true,
						},
					},
				},
			});

			res.json(user);
			break;
		}

		case 'PUT': {
			const user = await prisma.user.update({
				where: {
					username: req.query.username as string,
				},
				data: {
					username: req.body.username,
					name: req.body.name,
					bio: req.body.bio,
				},
			});

			const social = await prisma.social.update({
				where: {
					userId: user.id,
				},
				data: {
					website: req.body.social.website,
				},
			});

			res.json({ user, social });
			break;
		}
	}
}
