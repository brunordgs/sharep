import { ProfileContent } from '@/components/profile/profile-content';
import { ProfileNotFound } from '@/components/profile/profile-not-found';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getUser(username: string) {
	const user = await prisma.user.findFirst({
		where: {
			username,
		},
	});

	return user;
}

interface Props {
	params: {
		profile: string;
	};
}

export default async function Profile({ params }: Props) {
	const username = decodeURIComponent(params.profile).replace('@', '') as string;
	const user = await getUser(username);

	const userNotFound = !user;

	if (username === '404') {
		notFound();
	}

	return (
		<main className="max-w-5xl w-full mx-auto mb-10">
			{!userNotFound ? (
				<ProfileContent {...user} />
			) : (
				<ProfileNotFound username={username} />
			)}
		</main>
	);
}
