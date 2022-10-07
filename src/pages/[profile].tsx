import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { Loading } from '@/components/ui/Loading';
import { supabase } from '@/services/supabaseClient';
import { type Creator } from '@/shared/interfaces/Creator';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { selectUsers } from '@/utils/supabase';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
	user: UserProfile;
	creator: Creator;
}

export default function Profile({ user, creator }: Props) {
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
					{!userNotFound ? `${user.name ?? ''} (@${user.username}) | sharep` : 'Profile | sharep'}
				</title>
			</Head>

			<main className="max-w-5xl w-full mx-auto mb-10">
				<Loading loading={router.isFallback} className="my-32">
					{!userNotFound ? (
						<ProfileContent creator={creator} {...user} />
					) : (
						<ProfileNotFound username={username} />
					)}
				</Loading>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const usersResponse = await selectUsers();
	const users = usersResponse.data as UserProfile[];
	const usernames = users.map(({ username }) => username);

	const paths = usernames.map((user) => ({
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

	// Prevent api request if username doesn't have @ as first character
	if (username.charAt(0) !== '@') {
		return {
			props: {},
		};
	}

	const users = supabase.from('users').select().eq('username', username.replace('@', ''));
	const creators = supabase.from('creators').select().eq('username', username.replace('@', ''));

	const [{ data: userData, error: userError }, { data: creatorData }] = await Promise.all([
		users,
		creators,
	]);

	if (userError || !userData?.length) {
		return {
			props: {
				user: null,
			},
		};
	}

	return {
		props: {
			user: userData[0],
			creator: creatorData?.[0] ?? null,
		},
		revalidate: 10,
	};
}
