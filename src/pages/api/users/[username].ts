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
							twitter: true,
							twitch: true,
							youtube: true,
							tiktok: true,
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
					bio: req.body.bio || null,
				},
			});

			const existingSocial = await prisma.social.findUnique({
				where: {
					userId: user.id,
				},
			});

			let social;

			if (existingSocial) {
				social = await prisma.social.update({
					where: {
						userId: user.id,
					},
					data: {
						website: req.body.social.website,
						github: req.body.social.github,
						twitter: req.body.social.twitter,
						twitch: req.body.social.twitch,
						youtube: req.body.social.youtube,
						tiktok: req.body.social.tiktok,
					},
				});
			} else {
				social = await prisma.social.create({
					data: {
						website: req.body.social.website,
						github: req.body.social.github,
						twitter: req.body.social.twitter,
						twitch: req.body.social.twitch,
						youtube: req.body.social.youtube,
						tiktok: req.body.social.tiktok,
						userId: user.id,
					},
				});
			}

			res.json({ user, social });
			break;
		}
	}
}
