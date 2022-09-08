import { Loading } from '@/components/Loading';
import { Tooltip } from '@/components/Tooltip';
import { Profile } from '@/components/User/Profile';
import { ProfileNotFound } from '@/components/User/Profile/ProfileNotFound';
import { axios } from '@/services/axios';
import { GithubUser } from '@/shared/interfaces/GithubUser';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
	user: GithubUser;
}

export default function ProfilePage({ user }: Props) {
	const router = useRouter();

	const username = router.query.profile?.[0] as string;
	const userNotFound = !user;

	return (
		<>
			<Head>
				<title>
					{!userNotFound ? `${user.name ?? ''} (@${user.login}) | sharep` : 'Profile | sharep'}
				</title>
			</Head>

			<main className="max-w-5xl w-full mx-auto">
				<Loading loading={!user} className="my-32">
					{!userNotFound ? <Profile user={user} /> : <ProfileNotFound username={username} />}
				</Loading>
			</main>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = () => {
	const team = ['brunordgs'];

	const paths = team.map((member) => ({
		params: {
			profile: member,
		},
	}));

	return {
		paths: paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const username = params!.profile!.toString();

	const res = await axios.get(`users/${username.replace('@', '')}`, {
		validateStatus: (status) => status !== 404,
	});

	if (!username.includes('@')) {
		return {
			props: {},
			redirect: {
				destination: '/404',
			},
		};
	}

	return {
		props: {
			user: res.data,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
