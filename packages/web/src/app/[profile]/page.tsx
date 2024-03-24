import { ProfileContent } from '@/components/profile/profile-content';
import { ProfileNotFound } from '@/components/profile/profile-not-found';
import { fetchAPI } from '@/utils/fetch';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		profile: string;
	};
}

export default async function Profile({ params }: Props) {
	const username = decodeURIComponent(params.profile).replace('@', '') as string;
	const user = await fetchAPI<{
		name: string;
		username: string;
		bio: string | null;
		image: string;
		isVerified: boolean;
		createdAt: string;
	}>(`users/${username}`);

	const userNotFound = !user;

	if (username === '404') {
		notFound();
	}

	return (
		<main className="max-w-5xl w-full mx-auto mb-10">
			{!userNotFound ? <ProfileContent {...user} /> : <ProfileNotFound username={username} />}
		</main>
	);
}
