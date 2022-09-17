import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { Loading } from '@/components/ui/Loading';
import { GithubUser } from '@/shared/interfaces/GithubUser';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
	user: GithubUser;
}

export default function Profile({ user }: Props) {
	const router = useRouter();

	const username = router.query.profile as string;
	const userNotFound = !user;

	useEffect(() => {
		if (!username) return;

		if (username.charAt(0) !== '@') {
			router.push('404');
		}
	}, [username, router]);

	return (
		<>
			<Head>
				<title>
					{!userNotFound ? `${user.name ?? ''} (@${user.login}) | sharep` : 'Profile | sharep'}
				</title>
			</Head>

			<main className="max-w-5xl w-full mx-auto mb-10">
				<Loading loading={router.isFallback} className="my-32">
					{!userNotFound ? <ProfileContent user={user} /> : <ProfileNotFound username={username} />}
				</Loading>
			</main>
		</>
	);
}

export function getStaticPaths() {
	const users = ['brunordgs', 'leovargasdev'];

	const paths = users.map((user) => ({
		params: {
			profile: '@' + user,
		},
	}));

	return {
		paths: paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const username = params!.profile!.toString();
	const users = ['brunordgs', 'leovargasdev']; // Mock users

	// Prevent api request if username doesn't have @ as first character and only request provided users
	if (username.charAt(0) !== '@' || !users.includes(username.replace('@', ''))) {
		return {
			props: {},
		};
	}

	const res = await fetch(`https://api.github.com/users/${username.replace('@', '')}`);
	const data = await res.json();

	if (!data || data?.message?.toLowerCase() === 'not found') {
		return {
			props: {
				user: null,
			},
		};
	}

	return {
		props: {
			user: data,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
}
