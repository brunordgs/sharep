import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { Loading } from '@/components/ui/Loading';
import { POPULAR_USERS } from '@/shared/constants';
import { type Creator } from '@/shared/interfaces/Creator';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { getCreatorInformation, getUserInformation } from '@/utils/supabase';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
	user: UserProfile;
	creator: Creator;
}

export default function Profile({ user, creator }: Props) {
	const router = useRouter();

	const username = router.query.profile as string;
	const userNotFound = !user;

	return (
		<>
			<Head>
				<title>
					{!userNotFound ? `${user.name ?? ''} (@${user.username}) | Sharep` : 'Profile | Sharep'}
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
	const paths = POPULAR_USERS.map((user) => ({
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

	// Prevent api request if username doesn't have @ as first character and redirect to 404 page
	if (username.charAt(0) !== '@') {
		return {
			props: {},
			redirect: {
				destination: '404',
				permanent: false,
			},
		};
	}

	const user = getUserInformation(username.replace('@', ''));
	const creator = getCreatorInformation(username.replace('@', ''));

	const [{ data: userData, error: userError }, { data: creatorData }] = await Promise.all([
		user,
		creator,
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
	};
}
