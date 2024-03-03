import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/profile-not-found';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getUser(username: string) {
	const user = await prisma.user.findFirst({
		where: {
			username,
		},
		include: {
			creator: {
				select: {
					createdAt: true,
				},
			},
		},
	});

	return user;
}

async function getProjects(userId: string | undefined) {
	const projects = await prisma.project.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			image: true,
			url: true,
			name: true,
			description: true,
			repo: true,
			repoUrl: true,
		},
	});

	return projects;
}

interface Props {
	params: {
		profile: string;
	};
}

export default async function Profile({ params }: Props) {
	const username = decodeURIComponent(params.profile).replace('@', '') as string;
	const user = await getUser(username);
	const projects = await getProjects(user?.id);

	const userNotFound = !user;

	if (username === '404') {
		notFound();
	}

	return (
		<main className="max-w-5xl w-full mx-auto mb-10">
			{!userNotFound ? (
				<ProfileContent projects={projects} {...user} />
			) : (
				<ProfileNotFound username={username} />
			)}
		</main>
	);
}
